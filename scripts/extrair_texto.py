from pathlib import Path
import sys

import fitz


# =========================================================
# VISIUM
# EXTRAÇÃO DE TEXTO DE PDF
# =========================================================


ROOT_DIR = Path(__file__).resolve().parent.parent

DOCS_DIR = ROOT_DIR / "docs"

REPORTS_DIR = (
    DOCS_DIR
    / "development"
    / "reports"
)


# =========================================================
# UTILITÁRIOS
# =========================================================


def encontrar_pdf(nome_pdf: str) -> Path:
    """
    Procura o PDF dentro da pasta docs.
    """

    pdf_path = DOCS_DIR / nome_pdf


    if pdf_path.exists():

        return pdf_path


    if not nome_pdf.lower().endswith(".pdf"):

        pdf_path = (
            DOCS_DIR
            / f"{nome_pdf}.pdf"
        )


        if pdf_path.exists():

            return pdf_path


    raise FileNotFoundError(
        f"PDF não encontrado em: {DOCS_DIR}"
    )


def normalizar_nome(nome: str) -> str:
    """
    Converte o nome do documento para um nome
    seguro para o relatório.
    """

    return (
        nome
        .strip()
        .lower()
        .replace(" ", "-")
        .replace("_", "-")
    )


def garantir_pasta_relatorios() -> None:
    """
    Garante que a pasta de relatórios exista.
    """

    REPORTS_DIR.mkdir(
        parents=True,
        exist_ok=True
    )


# =========================================================
# EXTRAÇÃO
# =========================================================


def extrair_texto(
    pdf_path: Path
) -> str:
    """
    Extrai o texto completo do PDF,
    mantendo a separação por página.
    """

    documento = fitz.open(
        pdf_path
    )


    total_paginas = len(
        documento
    )


    linhas = []


    linhas.append(
        "=" * 72
    )

    linhas.append(
        "VISIUM — CONTEÚDO EXTRAÍDO"
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


    for numero_pagina in range(
        total_paginas
    ):

        pagina = documento[
            numero_pagina
        ]


        texto = pagina.get_text(
            "text"
        )


        linhas.append(
            "-" * 72
        )

        linhas.append(
            f"PÁGINA "
            f"{numero_pagina + 1:03d}"
        )

        linhas.append(
            "-" * 72
        )

        linhas.append("")


        texto = texto.strip()


        if texto:

            linhas.append(
                texto
            )

        else:

            linhas.append(
                "[Página sem texto extraível]"
            )


        linhas.append("")


    documento.close()


    linhas.append(
        "=" * 72
    )

    linhas.append(
        "FIM DO DOCUMENTO"
    )

    linhas.append(
        "=" * 72
    )


    return "\n".join(
        linhas
    )


# =========================================================
# SALVAR
# =========================================================


def salvar_conteudo(
    pdf_path: Path,
    conteudo: str
) -> Path:
    """
    Salva o texto extraído em UTF-8.
    """

    garantir_pasta_relatorios()


    nome_relatorio = (
        normalizar_nome(
            pdf_path.stem
        )
        + "-conteudo.txt"
    )


    caminho_saida = (
        REPORTS_DIR
        / nome_relatorio
    )


    caminho_saida.write_text(
        conteudo,
        encoding="utf-8"
    )


    return caminho_saida


# =========================================================
# PROCESSAMENTO
# =========================================================


def processar_pdf(
    pdf_path: Path
) -> None:

    print()

    print(
        "=" * 60
    )

    print(
        "VISIUM — EXTRAÇÃO DE TEXTO"
    )

    print(
        "=" * 60
    )

    print(
        f"PDF: {pdf_path.name}"
    )

    print(
        "Processando..."
    )

    print()


    conteudo = extrair_texto(
        pdf_path
    )


    caminho_saida = (
        salvar_conteudo(
            pdf_path,
            conteudo
        )
    )


    print(
        "[OK] Conteúdo extraído."
    )

    print()

    print(
        f"Arquivo:"
    )

    print(
        caminho_saida
    )

    print()

    print(
        "=" * 60
    )

    print()


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


    if len(sys.argv) <= 1:

        print(
            "[ERRO] "
            "Informe o nome do PDF."
        )

        print()

        print(
            "Exemplo:"
        )

        print(
            'python scripts\\extrair_texto.py '
            '"Ametropias.pdf.pdf"'
        )

        sys.exit(1)


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


# =========================================================
# MAIN
# =========================================================


if __name__ == "__main__":

    main()