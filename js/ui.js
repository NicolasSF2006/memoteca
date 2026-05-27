/*
  Importa o módulo de API.

  O arquivo api.js é responsável pelas requisições HTTP,
  como buscar, salvar, editar e excluir pensamentos.
*/
import api from "./api.js";

/*
  Objeto responsável por concentrar as funções de interface da aplicação.

  Esse arquivo cuida apenas da parte visual:
  - preencher formulário;
  - limpar formulário;
  - renderizar pensamentos;
  - criar elementos HTML na lista.
*/
const ui = {
  /*
    Preenche o formulário com os dados de um pensamento existente.

    Essa função é usada quando o usuário clica no botão de editar.
    Ela busca o pensamento pelo ID e coloca os dados nos campos do formulário.
  */
  async preencherFormulario(pensamentoId) {
    const pensamento = await api.buscarPensamentoPorId(pensamentoId);

    /*
      Campo hidden que armazena o ID do pensamento.

      Quando esse campo está preenchido, o main.js entende que o formulário
      deve editar um pensamento existente, em vez de criar um novo.
    */
    document.getElementById("pensamento-id").value = pensamento.id;

    // Preenche o conteúdo do pensamento
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo;

    // Preenche a autoria ou fonte do pensamento
    document.getElementById("pensamento-autoria").value = pensamento.autoria;
  },

  /*
    Limpa todos os campos do formulário.

    Usado quando o usuário clica em cancelar
    ou depois que um pensamento é salvo com sucesso.
  */
  limparFormulario() {
    document.getElementById("pensamento-form").reset();
  },

  /*
    Renderiza os pensamentos cadastrados no mural.

    Essa função:
    - limpa a lista atual;
    - busca os pensamentos na API;
    - mostra a mensagem de lista vazia se não houver itens;
    - cria os cards dos pensamentos se houver dados.
  */
  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos");
    const mensagemVazia = document.getElementById("mensagem-vazia");

    /*
      Limpa a lista antes de renderizar novamente.

      Isso evita duplicação dos cards quando a função é chamada
      após salvar, editar ou excluir um pensamento.
    */
    listaPensamentos.innerHTML = "";

    try {
      const pensamentos = await api.buscarPensamentos();

      /*
        Se não houver pensamentos, mostra a mensagem de lista vazia.
        Caso contrário, esconde a mensagem e renderiza os cards.
      */
      if (pensamentos.length === 0) {
        mensagemVazia.style.display = "block";
      } else {
        mensagemVazia.style.display = "none";

        pensamentos.forEach(ui.adicionarPensamentoNaLista);
      }
    } catch {
      alert("Erro ao renderizar pensamentos");
    }
  },

  /*
    Cria e adiciona um pensamento na lista visual.

    Essa função recebe um objeto pensamento e monta todo o HTML do card:
    - ícone de aspas;
    - conteúdo;
    - autoria;
    - botão de editar;
    - botão de excluir.
  */
  adicionarPensamentoNaLista(pensamento) {
    const listaPensamentos = document.getElementById("lista-pensamentos");

    /*
      Cria o item principal da lista.

      O data-id armazena o ID do pensamento no próprio elemento,
      caso seja necessário identificar esse card depois.
    */
    const li = document.createElement("li");
    li.setAttribute("data-id", pensamento.id);
    li.classList.add("li-pensamento");

    /*
      Ícone decorativo de aspas.
    */
    const iconeAspas = document.createElement("img");
    iconeAspas.src = "assets/imagens/aspas-azuis.png";
    iconeAspas.alt = "Aspas azuis";
    iconeAspas.classList.add("icone-aspas");

    /*
      Conteúdo principal do pensamento.
    */
    const pensamentoConteudo = document.createElement("div");
    pensamentoConteudo.textContent = pensamento.conteudo;
    pensamentoConteudo.classList.add("pensamento-conteudo");

    /*
      Autoria ou fonte do pensamento.
    */
    const pensamentoAutoria = document.createElement("div");
    pensamentoAutoria.textContent = pensamento.autoria;
    pensamentoAutoria.classList.add("pensamento-autoria");

    /*
      Botão de editar.

      Ao clicar, chama preencherFormulario() com o ID do pensamento,
      carregando os dados atuais no formulário.
    */
    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-editar");
    botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

    /*
      Ícone visual do botão de editar.
    */
    const iconeEditar = document.createElement("img");
    iconeEditar.src = "assets/imagens/icone-editar.png";
    iconeEditar.alt = "Editar";
    botaoEditar.appendChild(iconeEditar);

    /*
      Botão de excluir.

      Ao clicar, remove o pensamento da API e renderiza novamente
      a lista para atualizar o mural.
    */
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao-excluir");

    botaoExcluir.onclick = async () => {
      try {
        await api.excluirPensamento(pensamento.id);

        /*
          Atualiza a lista após excluir o pensamento.
        */
        ui.renderizarPensamentos();
      } catch (error) {
        alert("Erro ao excluir pensamento");
      }
    };

    /*
      Ícone visual do botão de excluir.
    */
    const iconeExcluir = document.createElement("img");
    iconeExcluir.src = "assets/imagens/icone-excluir.png";
    iconeExcluir.alt = "Excluir";
    botaoExcluir.appendChild(iconeExcluir);

    /*
      Container dos botões de ação do card.
    */
    const icones = document.createElement("div");
    icones.classList.add("icones");
    icones.appendChild(botaoEditar);
    icones.appendChild(botaoExcluir);

    /*
      Monta a estrutura final do card.
    */
    li.appendChild(iconeAspas);
    li.appendChild(pensamentoConteudo);
    li.appendChild(pensamentoAutoria);
    li.appendChild(icones);

    /*
      Adiciona o card pronto dentro da lista de pensamentos.
    */
    listaPensamentos.appendChild(li);
  },
};

/*
  Exporta o objeto ui para ser usado em outros arquivos,
  principalmente no main.js.
*/
export default ui;
