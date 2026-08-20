\# Visium — Cenários de Regressão



\## CT-001 — Landing Page



\*\*Objetivo:\*\* validar o acesso inicial à plataforma.



Passos:

1\. Abrir a Landing Page.

2\. Verificar carregamento visual.

3\. Verificar botão de cadastro.

4\. Verificar botão de login.

5\. Verificar navegação dos links.



Resultado esperado:

\- Página carregada sem erros.

\- Links funcionando.

\- Layout responsivo.



\---



\## CT-002 — Cadastro



\*\*Objetivo:\*\* validar criação de conta.



Passos:

1\. Acessar Cadastro.

2\. Informar nome válido.

3\. Informar e-mail válido.

4\. Informar senha válida.

5\. Confirmar senha.

6\. Aceitar os Termos.

7\. Criar conta.



Resultado esperado:

\- Conta criada.

\- Usuário armazenado corretamente.

\- Redirecionamento realizado.



\---



\## CT-003 — Login



\*\*Objetivo:\*\* validar autenticação.



Passos:

1\. Acessar Login.

2\. Informar credenciais válidas.

3\. Enviar formulário.



Resultado esperado:

\- Login realizado.

\- Sessão criada.

\- Usuário direcionado ao Dashboard.



\---



\## CT-004 — Proteção de rota



\*\*Objetivo:\*\* impedir acesso não autenticado.



Passos:

1\. Encerrar sessão.

2\. Tentar acessar diretamente uma página protegida.



Resultado esperado:

\- Usuário redirecionado para Login.



\---



\## CT-005 — Biblioteca



\*\*Objetivo:\*\* validar acesso aos conteúdos.



Passos:

1\. Acessar Biblioteca.

2\. Verificar categorias.

3\. Abrir um conteúdo.

4\. Verificar navegação.



Resultado esperado:

\- Conteúdos carregados.

\- Navegação funcionando.



\---



\## CT-006 — Reader



\*\*Objetivo:\*\* validar leitura dos conteúdos.



Passos:

1\. Abrir um conteúdo.

2\. Avançar páginas.

3\. Voltar páginas.

4\. Verificar imagens.

5\. Verificar progresso.



Resultado esperado:

\- Reader funcionando sem erros.

\- Conteúdo carregado corretamente.



\---



\## CT-007 — Progresso



\*\*Objetivo:\*\* validar registro de progresso.



Passos:

1\. Acessar Progresso.

2\. Verificar conteúdos iniciados.

3\. Verificar percentuais.

4\. Abrir um conteúdo.

5\. Avançar no conteúdo.

6\. Retornar ao Progresso.



Resultado esperado:

\- Progresso atualizado corretamente.



\---



\## CT-008 — Quizzes



\*\*Objetivo:\*\* validar sistema de quizzes.



Passos:

1\. Acessar Quizzes.

2\. Abrir um quiz.

3\. Responder questões.

4\. Finalizar quiz.

5\. Verificar resultado.



Resultado esperado:

\- Questões carregadas.

\- Respostas registradas.

\- Resultado apresentado.



\---



\## CT-009 — Perfil



\*\*Objetivo:\*\* validar área de perfil.



Passos:

1\. Acessar Perfil.

2\. Verificar dados do usuário.

3\. Alterar informações permitidas.

4\. Salvar alterações.



Resultado esperado:

\- Dados exibidos corretamente.

\- Alterações persistidas.



\---



\## CT-010 — Recuperação de senha



\*\*Objetivo:\*\* validar recuperação de acesso.



Passos:

1\. Acessar Login.

2\. Selecionar "Esqueci minha senha".

3\. Informar e-mail cadastrado.

4\. Solicitar recuperação.

5\. Definir nova senha.

6\. Confirmar nova senha.

7\. Entrar novamente.



Resultado esperado:

\- Nova senha salva.

\- Token invalidado após uso.

\- Login realizado com a nova senha.



\---



\## CT-011 — Termos de Uso



\*\*Objetivo:\*\* validar acesso aos Termos.



Passos:

1\. Acessar Cadastro.

2\. Abrir Termos de Uso.



Resultado esperado:

\- Página de Termos carregada.

\- Conteúdo disponível.

\- Navegação funcionando.



\---



\## CT-012 — Logout



\*\*Objetivo:\*\* validar encerramento da sessão.



Passos:

1\. Estar autenticado.

2\. Selecionar "Sair".



Resultado esperado:

\- Sessão encerrada.

\- Usuário direcionado para a Landing Page.

\- Área protegida não permanece acessível.

