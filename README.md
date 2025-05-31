
# 📦 Sistema de Gerenciamento de Produtos

Este é um projeto web desenvolvido como parte do Projeto Integrador do 3º Período do curso de Engenharia de Software. O sistema permite o gerenciamento completo de produtos com funcionalidades de login, cadastro, CRUD de produtos e geração de relatórios. Toda a lógica é implementada com JavaScript puro, utilizando `localStorage` para simular um banco de dados local.

## ✨ Funcionalidades

- ✅ Tela de Login e Cadastro de Usuários
- ✅ Página Inicial com boas-vindas ao usuário logado
- ✅ Cadastro de novos produtos (nome, descrição, preço, quantidade, status)
- ✅ Edição e exclusão de produtos existentes
- ✅ Relatório completo de estoque
- ✅ Armazenamento de dados com `localStorage`
- ✅ Interface moderna com HTML5 e CSS3
- ✅ Código 100% comentado e organizado

## 📁 Estrutura de Diretórios

```
📁 projeto-gerenciador-produtos/
├── index.html                 # Tela inicial após login
├── login.html                 # Tela de login
├── cadastro.html              # Tela de cadastro de usuário
├── create.html                # Tela de cadastro de produto
├── relatorio.html             # Tela de relatório de estoque
├── backend/
│   └── backend.js             # Módulo de lógica para manipulação de dados
├── assets/
│   ├── CSS/
│   │   ├── login.css
│   │   ├── home.css
│   │   ├── cadastro.css
│   │   ├── create.css
│   │   └── relatorio.css
│   ├── img/                   # Imagens utilizadas na interface
│   └── JavaScript/
│       ├── login.js
│       ├── cadastro.js
│       ├── create.js
│       ├── relatorio.js
│       └── index.js
└── README.md                  # Documentação do projeto
```

## 🚀 Como Executar o Projeto

1. Clone o repositório:

```bash
git clone git@github.com:Haelyton/ProjetoDesafioIntegrador.git
```

2. Acesse a pasta do projeto:

```bash
cd ProjetoDesafioIntegrador
```

3. Abra o arquivo `login.html` no seu navegador para iniciar o sistema.

> ⚠️ Não é necessário servidor ou instalação de dependências. O projeto roda diretamente no navegador.

---

## 👨‍💻 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Armazenamento: `localStorage`

---

## 📚 Créditos

Projeto desenvolvido por **(Haelyton Maicon Stempkoski, Guilherme Luiz Quevedo e Enrique Feliczaki)**  
Curso: Engenharia de Software – 3º Período  
Instituição: Campo Real

---

## 📎 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
