from pathlib import Path
import sys

import fitz


# =========================================================
# VISIUM
# INVENTÁRIO E EXTRAÇÃO DE IMAGENS DE PDF
# =========================================================


ROOT_DIR = Path(__file__).resolve().parent.parent

DOCS_DIR = ROOT_DIR / "docs"

IMAGES_DIR = ROOT_DIR / "assets" / "img"

REPORTS_DIR = ROOT_DIR / "docs" / "development" / "reports"


# =========================================================
# UTILITÁRIOS
# =========================================================


def normalizar_nome(nome: str) -> str:
    """
    Converte um nome para um formato seguro para pasta.
    """

    return (
        nome.strip()
        .lower()
        .replace(" ", "-")
        .replace("_", "-")
    )


def encontrar_pdf(nome_pdf: str) -> Path:
    """
    Procura o PDF dentro da pasta docs.
    """

    pdf_path = DOCS_DIR / nome_pdf

    if pdf_path.exists():
        return pdf_path


    if not nome_pdf.lower().endswith(".pdf"):

        pdf_path = DOCS_DIR / f"{nome_pdf}.pdf"

        if pdf_path.exists():
            return pdf_path


    raise FileNotFoundError(
        f"PDF não encontrado em: {DOCS_DIR}"
    )


def formatar_tamanho(valor: int) -> str:
    """
    Formata tamanho em bytes para leitura humana.
    """

    unidades = [
        "B",
        "KB",
        "MB",
        "GB"
    ]

    tamanho = float(valor)

    for unidade in unidades:

        if tamanho < 1024:
            return f"{tamanho:.1f} {unidade}"

        tamanho /= 1024


    return f"{tamanho:.1f} TB"


def garantir_pasta_relatorios() -> None:
    """
    Cria a pasta de relatórios caso ela não exista.
    """

    REPORTS_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


# =========================================================
# INVENTÁRIO
# =========================================================


def inventariar_pdf(
    pdf_path: Path
) -> str:
    """
    Analisa o PDF e gera um relatório textual.

    O relatório contém:

    - quantidade de páginas;
    - existência de texto;
    - quantidade de imagens;
    - formato das imagens;
    - dimensões das imagens;
    - tamanho das imagens;
    - quantidade de desenhos vetoriais;
    """

    documento = fitz.open(pdf_path)

    total_paginas = len(documento)

    linhas = []


    linhas.append(
        "=" * 72
    )

    linhas.append(
        "VISIUM — INVENTÁRIO DE MATERIAL"
    )

    linhas.append(
        "=" * 72
    )

    linhas.append("")

    linhas.append(
        f"Arquivo: {pdf_path.name}"
    )

    linhas.append(
        f"Páginas: {total_paginas}"
    )

    linhas.append("")

    linhas.append(
        "-" * 72
    )


    total_imagens = 0

    total_desenhos = 0

    paginas_com_texto = 0

    paginas_com_imagens = 0


    for numero_pagina in range(
        total_paginas
    ):

        pagina = documento[
            numero_pagina
        ]


        texto = pagina.get_text(
            "text"
        ).strip()


        imagens = pagina.get_images(
            full=True
        )


        desenhos = pagina.get_drawings()


        if texto:

            paginas_com_texto += 1


        if imagens:

            paginas_com_imagens += 1


        total_imagens += len(
            imagens
        )


        total_desenhos += len(
            desenhos
        )


        linhas.append("")

        linhas.append(
            f"PÁGINA {numero_pagina + 1:03d}"
        )

        linhas.append(
            "-" * 40
        )


        linhas.append(
            "Texto: "
            + (
                "sim"
                if texto
                else "não"
            )
        )


        linhas.append(
            f"Imagens incorporadas: "
            f"{len(imagens)}"
        )


        linhas.append(
            f"Elementos vetoriais: "
            f"{len(desenhos)}"
        )


        if texto:

            texto_linhas = [
                linha.strip()
                for linha in texto.splitlines()
                if linha.strip()
            ]


            if texto_linhas:

                linhas.append(
                    "Primeiro conteúdo textual:"
                )

                limite = min(
                    5,
                    len(texto_linhas)
                )


                for linha in texto_linhas[
                    :limite
                ]:

                    linha_normalizada = (
                        linha
                        .replace(
                            "\t",
                            " "
                        )
                        .strip()
                    )


                    if len(
                        linha_normalizada
                    ) > 140:

                        linha_normalizada = (
                            linha_normalizada[:137]
                            + "..."
                        )


                    linhas.append(
                        f"  - {linha_normalizada}"
                    )


        if imagens:

            linhas.append("")

            linhas.append(
                "Detalhes das imagens:"
            )


        for indice_imagem, imagem in enumerate(
            imagens,
            start=1
        ):

            xref = imagem[0]


            try:

                dados = documento.extract_image(
                    xref
                )


                extensao = dados.get(
                    "ext",
                    "desconhecida"
                )


                largura = dados.get(
                    "width",
                    0
                )


                altura = dados.get(
                    "height",
                    0
                )


                tamanho = len(
                    dados.get(
                        "image",
                        b""
                    )
                )


                linhas.append(
                    f"  Imagem "
                    f"{indice_imagem:02d}: "
                    f"{extensao.upper()} | "
                    f"{largura}x{altura}px | "
                    f"{formatar_tamanho(tamanho)} | "
                    f"xref={xref}"
                )


            except Exception as erro:

                linhas.append(
                    f"  Imagem "
                    f"{indice_imagem:02d}: "
                    f"erro ao analisar "
                    f"(xref={xref}) — "
                    f"{erro}"
                )


    documento.close()


    linhas.append("")

    linhas.append(
        "=" * 72
    )

    linhas.append(
        "RESUMO"
    )

    linhas.append(
        "=" * 72
    )

    linhas.append(
        f"Total de páginas: "
        f"{total_paginas}"
    )

    linhas.append(
        f"Páginas com texto: "
        f"{paginas_com_texto}"
    )

    linhas.append(
        f"Páginas com imagens: "
        f"{paginas_com_imagens}"
    )

    linhas.append(
        f"Total de imagens incorporadas: "
        f"{total_imagens}"
    )

    linhas.append(
        f"Total de elementos vetoriais: "
        f"{total_desenhos}"
    )

    linhas.append("")

    return "\n".join(
        linhas
    )


# =========================================================
# EXTRAÇÃO DE IMAGENS
# =========================================================


def extrair_imagens(
    pdf_path: Path
) -> Path:
    """
    Extrai as imagens incorporadas do PDF.
    """

    nome_documento = normalizar_nome(
        pdf_path.stem
    )


    pasta_saida = (
        IMAGES_DIR / nome_documento
    )


    pasta_saida.mkdir(
        parents=True,
        exist_ok=True
    )


    documento = fitz.open(
        pdf_path
    )


    total_paginas = len(
        documento
    )

    total_imagens = 0


    print()

    print(
        "=" * 60
    )

    print(
        "VISIUM — EXTRAÇÃO DE IMAGENS"
    )

    print(
        "=" * 60
    )

    print(
        f"PDF: {pdf_path.name}"
    )

    print(
        f"Páginas: {total_paginas}"
    )

    print(
        f"Destino: {pasta_saida}"
    )

    print(
        "-" * 60
    )


    for numero_pagina in range(
        total_paginas
    ):

        pagina = documento[
            numero_pagina
        ]


        imagens = pagina.get_images(
            full=True
        )


        if not imagens:

            print(
                f"[--] Página "
                f"{numero_pagina + 1:02d}: "
                "nenhuma imagem"
            )

            continue


        for indice_imagem, imagem in enumerate(
            imagens,
            start=1
        ):

            xref = imagem[0]


            try:

                dados = documento.extract_image(
                    xref
                )


                extensao = dados[
                    "ext"
                ]


                conteudo = dados[
                    "image"
                ]


                nome_arquivo = (
                    f"pagina-"
                    f"{numero_pagina + 1:02d}"
                    f"-imagem-"
                    f"{indice_imagem:02d}"
                    f".{extensao}"
                )


                caminho_saida = (
                    pasta_saida
                    / nome_arquivo
                )


                # -------------------------------------------------
                # Não sobrescreve arquivos existentes.
                # -------------------------------------------------

                if caminho_saida.exists():

                    print(
                        f"[EXISTE] "
                        f"{nome_arquivo}"
                    )

                    continue


                caminho_saida.write_bytes(
                    conteudo
                )


                total_imagens += 1


                largura = dados.get(
                    "width",
                    0
                )


                altura = dados.get(
                    "height",
                    0
                )


                print(
                    f"[OK] "
                    f"{nome_arquivo} "
                    f"({largura}x{altura}px)"
                )


            except Exception as erro:

                print(
                    f"[ERRO] Página "
                    f"{numero_pagina + 1}, "
                    f"imagem "
                    f"{indice_imagem}: "
                    f"{erro}"
                )


    documento.close()


    print(
        "-" * 60
    )

    print(
        f"Finalizado: "
        f"{total_imagens} nova(s) "
        "imagem(ns) extraída(s)."
    )

    print(
        f"Pasta: {pasta_saida}"
    )

    print(
        "=" * 60
    )

    print()


    return pasta_saida


# =========================================================
# RELATÓRIO
# =========================================================


def salvar_relatorio(
    pdf_path: Path,
    conteudo: str
) -> Path:
    """
    Salva o inventário em um arquivo TXT.
    """

    garantir_pasta_relatorios()


    nome_relatorio = (
        normalizar_nome(
            pdf_path.stem
        )
        + "-inventario.txt"
    )


    caminho_relatorio = (
        REPORTS_DIR
        / nome_relatorio
    )


    caminho_relatorio.write_text(
        conteudo,
        encoding="utf-8"
    )


    return caminho_relatorio


# =========================================================
# PROCESSAMENTO COMPLETO
# =========================================================


def processar_pdf(
    pdf_path: Path
) -> None:

    print()

    print(
        "Analisando material..."
    )

    print(
        pdf_path.name
    )


    # -----------------------------------------------------
    # Inventário
    # -----------------------------------------------------

    relatorio = inventariar_pdf(
        pdf_path
    )


    caminho_relatorio = (
        salvar_relatorio(
            pdf_path,
            relatorio
        )
    )


    print()

    print(
        f"[OK] Inventário salvo em:"
    )

    print(
        caminho_relatorio
    )


    # -----------------------------------------------------
    # Extração
    # -----------------------------------------------------

    extrair_imagens(
        pdf_path
    )


# =========================================================
# EXECUÇÃO
# =========================================================


def main():

    if not DOCS_DIR.exists():

        print(
            "[ERRO] "
            "A pasta docs não existe."
        )

        sys.exit(1)


    pdfs = sorted(
        DOCS_DIR.glob("*.pdf")
    )


    if not pdfs:

        print(
            "[ERRO] "
            "Nenhum PDF encontrado "
            "na pasta docs."
        )

        sys.exit(1)


    # -----------------------------------------------------
    # PDF informado pelo terminal
    # -----------------------------------------------------

    if len(sys.argv) > 1:

        nome_pdf = " ".join(
            sys.argv[1:]
        )


        try:

            pdf_path = encontrar_pdf(
                nome_pdf
            )

        except FileNotFoundError as erro:

            print(
                f"[ERRO] {erro}"
            )

            sys.exit(1)


        processar_pdf(
            pdf_path
        )

        return


    # -----------------------------------------------------
    # APENAS UM PDF
    # -----------------------------------------------------

    if len(pdfs) == 1:

        processar_pdf(
            pdfs[0]
        )

        return


    # -----------------------------------------------------
    # ESCOLHA DO PDF
    # -----------------------------------------------------

    print()

    print(
        "PDFs disponíveis:"
    )

    print()


    for indice, pdf in enumerate(
        pdfs,
        start=1
    ):

        print(
            f"{indice}. "
            f"{pdf.name}"
        )


    print()


    escolha = input(
        "Escolha o PDF: "
    ).strip()


    try:

        indice = int(
            escolha
        ) - 1


        pdf_path = pdfs[
            indice
        ]


    except (
        ValueError,
        IndexError
    ):

        print(
            "[ERRO] "
            "Opção inválida."
        )

        sys.exit(1)


    processar_pdf(
        pdf_path
    )


# =========================================================
# MAIN
# =========================================================


if __name__ == "__main__":

    main()