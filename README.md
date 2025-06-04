📦 Sistema de Gerenciamento de Produtos
Este é um projeto web desenvolvido como parte do Projeto Integrador do 3º Período do curso de Engenharia de Software. O sistema permite o gerenciamento completo de produtos com funcionalidades de login, cadastro, CRUD de produtos e geração de relatórios. Toda a lógica é implementada com JavaScript puro, utilizando localStorage para simular um banco de dados local.

✨ Funcionalidades
✅ Tela de Login e Cadastro de Usuários

✅ Página Inicial com boas-vindas ao usuário logado

✅ Cadastro de novos produtos (nome, descrição, preço, quantidade, status)

✅ Edição e exclusão de produtos existentes

✅ Relatório completo de estoque

✅ Armazenamento de dados com localStorage

✅ Interface moderna com HTML5 e CSS3

✅ Código 100% comentado e organizado

🛠️ Organização do Projeto e Fluxo de Trabalho
Para garantir o desenvolvimento organizado e colaborativo, utilizamos as seguintes práticas e ferramentas:

Gerenciamento de tarefas via Jira:
Todas as demandas, bugs e melhorias foram registradas e acompanhadas no Jira, garantindo transparência e controle do progresso.
Acompanhe o projeto no Jira: https://camporeal-team-la3p3se5.atlassian.net/jira/software/projects/MBA/boards/1

Branches dedicadas para cada funcionalidade:
Criamos branches específicas para desenvolver funcionalidades isoladamente, facilitando testes e revisão de código.

Pull Requests (PR):
Todo código novo passou por PRs para revisão, testes e aprovação antes de ser integrado à branch principal, garantindo qualidade e integridade do projeto.

Integração do Git com Jira:
As branches e PRs foram vinculadas às tarefas do Jira para rastreamento automático do progresso e histórico das alterações.

📁 Estrutura de Diretórios
pgsql
Copiar
Editar
📁 projeto-gerenciador-produtos/
├── BackEnd
│      └── CRUD.js             # Módulo de lógica para manipulação de dados
├── FrontEnd
│     ├── assets/
│     │       ├── CSS/
│     │       │    ├── login.css
│     │       │    ├── home.css
│     │       │    ├── cadastro.css
│     │       │    ├── create.css
│     │       │    └── relatorio.css
│     │       ├── img/                   # Imagens utilizadas na interface
│     │       └── JavaScript/
│     │              ├── login.js
│     │              ├── cadastro.js
│     │              ├── create.js
│     │              ├── relatorio.js
│     │              └── index.js
│     ├── index.html                 # Tela inicial após login
│     ├── login.html                 # Tela de login
│     ├── cadastro.html              # Tela de cadastro de usuário
│     ├── create.html                # Tela de cadastro de produto
│     └── relatorio.html             # Tela de relatório de estoque
└── README.md                  # Documentação do projeto
🚀 Como Executar o Projeto
Clone o repositório:

bash
Copiar
Editar
git clone git@github.com:Haelyton/ProjetoDesafioIntegrador.git
Acesse a pasta do projeto:

bash
Copiar
Editar
cd ProjetoDesafioIntegrador
Abra o arquivo index.html no seu navegador para iniciar o sistema.

⚠️ Não é necessário servidor ou instalação de dependências. O projeto roda diretamente no navegador.

👨‍💻 Tecnologias Utilizadas
HTML5

CSS3

JavaScript (ES6+)

Armazenamento local: localStorage

📚 Créditos
Projeto desenvolvido por Haelyton Maicon Stempkoski, Guilherme Luiz Quevedo e Enrique Feliczaki
Curso: Engenharia de Software – 3º Período
Instituição: Campo Real

📎 Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.
