# Visium

## Sobre o projeto

O **Visium** Ã© um portal de estudos sobre Ã³ptica desenvolvido com HTML, CSS e JavaScript puros.

O projeto tem como objetivo fornecer uma plataforma moderna, organizada e responsiva para aprendizado, reunindo conteÃºdos tÃ©cnicos sobre Ã³ptica em um ambiente intuitivo e agradÃ¡vel.

O desenvolvimento prioriza:

- CÃ³digo limpo;
- Arquitetura organizada;
- Acessibilidade;
- Responsividade;
- ReutilizaÃ§Ã£o de componentes;
- Facilidade de manutenÃ§Ã£o.

---

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Bootstrap Icons
- Python HTTP Server (ambiente local)

---

## Executando o projeto

Na raiz do projeto execute o servidor completo, que fornece os arquivos
estáticos e a API de autenticação:

```bash
python backend/server.py
```

Depois acesse:

```
http://127.0.0.1:8000
```

Em desenvolvimento local, o servidor usa SQLite em `backend/data/`.
Em produÃ§Ã£o, defina `DATABASE_URL` para usar o PostgreSQL persistente
configurado no Render. O backend utiliza hash PBKDF2, sessÃµes HttpOnly,
limite de tentativas de login e recuperaÃ§Ã£o de senha por e-mail.

Para executar os testes automatizados:

```bash
python -m unittest discover -s tests -p "test_*.py" -v
node tests/test_content.js
```

---

## Estrutura do projeto

```
visium/
â”‚
â”œâ”€â”€ assets/
â”œâ”€â”€ components/
â”œâ”€â”€ css/
â”œâ”€â”€ docs/
â”œâ”€â”€ js/
â”œâ”€â”€ pages/
â”œâ”€â”€ pdf/
â”œâ”€â”€ scripts/
â”œâ”€â”€ tests/
â”‚
â”œâ”€â”€ CHANGELOG.md
â”œâ”€â”€ PROJECT_RULES.md
â”œâ”€â”€ README.md
â””â”€â”€ pages/public/landing/index.html
```

---

## Funcionalidades planejadas

### Ãrea pÃºblica

- Landing Page
- Sobre
- Portal de conteÃºdos
- Pesquisa
- Categorias
- Subcategorias

### AutenticaÃ§Ã£o

- Login
- Cadastro
- RecuperaÃ§Ã£o de senha

### Ãrea do usuÃ¡rio

- Dashboard
- Perfil
- Favoritos
- Continuar de onde parou

### AdministraÃ§Ã£o

- Cadastro de conteÃºdos
- Gerenciamento de usuÃ¡rios
- PrÃ©-visualizaÃ§Ã£o de conteÃºdos
- Upload de materiais

---

## OrganizaÃ§Ã£o dos conteÃºdos

Os conteÃºdos serÃ£o organizados em:

```
Categoria
    â””â”€â”€ Subcategoria
            â””â”€â”€ ConteÃºdo
```

---

## Objetivos do projeto

- Centralizar conteÃºdos sobre Ã³ptica.
- Facilitar o aprendizado.
- Criar uma plataforma simples e agradÃ¡vel.
- Possibilitar crescimento contÃ­nuo do sistema.

---

## Estrutura de desenvolvimento

O projeto segue um processo baseado em entregas incrementais.

Cada entrega possui:

- Planejamento
- ImplementaÃ§Ã£o
- ValidaÃ§Ã£o
- RevisÃ£o
- Commit

---

## Qualidade

Durante o desenvolvimento sÃ£o priorizados:

- HTML semÃ¢ntico;
- Acessibilidade (WCAG AA);
- Responsividade;
- ComponentizaÃ§Ã£o;
- CÃ³digo reutilizÃ¡vel;
- ComentÃ¡rios Ãºteis;
- PadronizaÃ§Ã£o.

---

## Roadmap

- FundaÃ§Ã£o do projeto
- Landing Page
- Login
- Cadastro
- RecuperaÃ§Ã£o de senha
- Dashboard
- Perfil
- ConteÃºdos
- Favoritos
- Pesquisa
- AdministraÃ§Ã£o
- Backend

---

## LicenÃ§a

Este projeto utiliza a licenÃ§a MIT.

## Autora

Desenvolvido por **Elisa Justino**.

- LinkedIn: <https://www.linkedin.com/in/elisa-justino/>
- GitHub: <https://github.com/LisJustino>
