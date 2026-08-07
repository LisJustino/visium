# Regras do Projeto - Visium

## Objetivo

Este documento reúne as regras de desenvolvimento adotadas para o projeto Visium.

Todas as implementações devem seguir estas diretrizes para garantir qualidade, padronização e facilidade de manutenção.

---

# 1. Filosofia do Projeto

O Visium será desenvolvido como um software profissional.

As decisões devem priorizar:

- Qualidade;
- Simplicidade;
- Escalabilidade;
- Manutenibilidade;
- Reutilização;
- Consistência.

Nunca implementar uma solução apenas porque é mais rápida.

---

# 2. Stack

Frontend

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5
- Bootstrap Icons

Desenvolvimento

- Visual Studio Code

Versionamento

- Git
- GitHub

---

# 3. Ambiente

O projeto será executado utilizando:

```bash
python -m http.server 8000
```

Não utilizar Live Server.

---

# 4. Arquitetura

A arquitetura definida para o projeto deve ser preservada.

Novas pastas somente quando realmente necessárias.

Toda alteração estrutural deve ser avaliada antes da implementação.

---

# 5. Organização

Cada pasta possui uma responsabilidade única.

Não criar diretórios temporários como:

- teste
- backup
- novo
- diversos

---

# 6. Código

Todo código deve seguir:

- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple)
- Separação de responsabilidades
- Código limpo
- Legibilidade

---

# 7. HTML

Sempre utilizar:

- HTML semântico;
- Estrutura organizada;
- Hierarquia correta;
- Acessibilidade.

Nunca utilizar:

- CSS inline;
- JavaScript inline.

---

# 8. CSS

Os estilos globais permanecem na pasta `css`.

Cada página possui seu próprio arquivo CSS.

Evitar:

- Repetição de regras;
- Arquivos gigantes;
- Estilos não utilizados.

---

# 9. JavaScript

Cada página possui seu próprio JavaScript.

Os scripts compartilhados ficam em `js`.

Utilizar:

- Funções pequenas;
- Código reutilizável;
- Nomes descritivos.

---

# 10. Componentes

Todo componente reutilizável deverá possuir sua própria pasta.

Exemplo:

```
components/
└── header/
```

Quando implementado, poderá conter:

- HTML
- CSS
- JavaScript

---

# 11. Comentários

Comentários devem explicar decisões importantes.

Nunca comentar o óbvio.

---

# 12. Arquivos

Sempre enviar arquivos completos.

Nunca trabalhar com trechos de código.

Sempre que um arquivo impactar outro, ambos deverão ser atualizados.

---

# 13. Bootstrap

Bootstrap será utilizado via CDN.

CSS próprio somente quando necessário.

---

# 14. Responsividade

Obrigatória desde a primeira implementação.

O projeto deve funcionar corretamente em:

- Smartphones;
- Tablets;
- Notebooks;
- Monitores.

---

# 15. Acessibilidade

Seguir boas práticas de acessibilidade.

Sempre considerar:

- Navegação por teclado;
- Labels;
- Textos alternativos;
- Contraste adequado;
- Estrutura semântica.

---

# 16. Componentização

Sempre reutilizar componentes.

Evitar duplicação de HTML.

---

# 17. Organização dos Conteúdos

Os conteúdos seguirão a estrutura:

```
Categoria
    └── Subcategoria
            └── Conteúdo
```

---

# 18. Versionamento

Cada funcionalidade concluída deverá possuir:

- Commit;
- Revisão;
- Histórico claro.

Evitar commits genéricos.

---

# 19. Documentação

Toda decisão importante deve ser documentada.

A documentação faz parte do projeto.

---

# 20. Testes

A pasta `tests` armazenará:

- Checklists;
- Cenários;
- Evidências futuras.

---

# 21. Estrutura

Todas as alterações em arquivos e pastas devem ser realizadas utilizando comandos do Windows CMD.

---

# 22. Desenvolvimento

Sempre seguir o fluxo:

Planejamento

↓

Implementação

↓

Validação

↓

Revisão

↓

Commit

---

# 23. Qualidade

Antes de concluir uma entrega verificar:

- Organização;
- Responsividade;
- Acessibilidade;
- Reutilização;
- Código limpo.

---

# 24. Evolução

O projeto deverá crescer de forma incremental.

Novas funcionalidades não devem quebrar implementações existentes.

---

# 25. Compromisso

Cada entrega deverá deixar o projeto melhor do que estava anteriormente.