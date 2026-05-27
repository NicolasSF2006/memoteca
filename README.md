![Thumbnail](./thumb.png)

# Memoteca

Link para a página: https://nicolassf2006.github.io/memoteca/

Memoteca é uma aplicação web para cadastrar, listar, editar e excluir pensamentos, frases, citações e ideias. O projeto utiliza uma API fake com JSON Server hospedada no Render, permitindo praticar operações CRUD em uma aplicação publicada online.

## 🔨 Funcionalidades do projeto

- **Cadastro de pensamentos:** permite adicionar novos pensamentos informando conteúdo e autoria.
- **Listagem de pensamentos:** exibe todos os pensamentos cadastrados em formato de mural.
- **Edição de pensamentos:** permite atualizar o conteúdo e a autoria de pensamentos existentes.
- **Exclusão de pensamentos:** permite remover pensamentos cadastrados.
- **Mensagem de lista vazia:** exibe uma mensagem quando não há pensamentos cadastrados.
- **Comunicação com API:** utiliza Axios para se comunicar com uma API fake criada com JSON Server.
- **Frontend publicado:** interface hospedada no GitHub Pages.
- **Backend publicado:** API hospedada no Render.

## ✔️ Técnicas e tecnologias utilizadas

- **HTML:** estrutura da aplicação.
- **CSS:** estilização da interface e organização visual do mural.
- **JavaScript:** lógica principal da aplicação.
- **Módulos JavaScript:** separação do código em arquivos como `api.js`, `main.js` e `ui.js`.
- **Axios:** biblioteca utilizada para realizar requisições HTTP.
- **Node.js:** ambiente necessário para executar o JSON Server.
- **JSON Server:** ferramenta usada para simular uma API REST.
- **GitHub Pages:** hospedagem do frontend.
- **Render:** hospedagem da API fake.

## 📁 Estrutura do projeto

```txt
memoteca/
├── assets/
│   └── imagens/
├── css/
│   └── styles.css
├── js/
│   ├── api.js
│   ├── main.js
│   └── ui.js
├── backend/
│   ├── db.json
│   ├── package.json
│   ├── package-lock.json
│   └── public/
├── index.html
└── README.md
```
