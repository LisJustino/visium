from pathlib import Path
import sys

import fitz


# =========================================================
# VISIUM
# EXTRATOR DE IMAGENS DE PDF
# =========================================================


ROOT_DIR = Path(__file__).resolve().parent

DOCS_DIR = ROOT_DIR / "docs"
IMAGES_DIR = ROOT_DIR / "assets" / "img"


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


# =========================================================
# EXTRAÇÃO
# =========================================================


def extrair_imagens(pdf_path: Path) -> None:

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


    documento = fitz.open(pdf_path)


    total_paginas = len(documento)

    total_imagens = 0


    print()
    print("=" * 60)
    print("VISIUM — EXTRAÇÃO DE IMAGENS")
    print("=" * 60)

    print(f"PDF: {pdf_path.name}")
    print(f"Páginas: {total_paginas}")

    print(
        f"Destino: {pasta_saida}"
    )

    print("-" * 60)


    for numero_pagina in range(total_paginas):

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


            dados = documento.extract_image(
                xref
            )


            extensao = dados["ext"]

            conteudo = dados["image"]


            nome_arquivo = (
                f"pagina-"
                f"{numero_pagina + 1:02d}"
                f"-imagem-"
                f"{indice_imagem:02d}"
                f".{extensao}"
            )


            caminho_saida = (
                pasta_saida / nome_arquivo
            )


            caminho_saida.write_bytes(
                conteudo
            )


            total_imagens += 1


            print(
                f"[OK] {nome_arquivo}"
            )


    documento.close()


    print("-" * 60)

    print(
        f"Finalizado: "
        f"{total_imagens} imagem(ns) "
        "extraída(s)."
    )

    print(
        f"Pasta: {pasta_saida}"
    )

    print("=" * 60)
    print()


# =========================================================
# EXECUÇÃO
# =========================================================


def main():

    if not DOCS_DIR.exists():

        print(
            "[ERRO] A pasta docs não existe."
        )

        sys.exit(1)


    pdfs = sorted(
        DOCS_DIR.glob("*.pdf")
    )


    if not pdfs:

        print(
            "[ERRO] Nenhum PDF encontrado "
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


        extrair_imagens(
            pdf_path
        )

        return


    # -----------------------------------------------------
    # APENAS UM PDF
    # -----------------------------------------------------

    if len(pdfs) == 1:

        extrair_imagens(
            pdfs[0]
        )

        return


    # -----------------------------------------------------
    # ESCOLHA DO PDF
    # -----------------------------------------------------

    print()
    print("PDFs disponíveis:")
    print()


    for indice, pdf in enumerate(
        pdfs,
        start=1
    ):

        print(
            f"{indice}. {pdf.name}"
        )


    print()


    escolha = input(
        "Escolha o PDF: "
    ).strip()


    try:

        indice = int(escolha) - 1

        pdf_path = pdfs[indice]

    except (
        ValueError,
        IndexError
    ):

        print(
            "[ERRO] Opção inválida."
        )

        sys.exit(1)


    extrair_imagens(
        pdf_path
    )


if __name__ == "__main__":
    main()