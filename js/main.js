/*
  Importa o módulo responsável pela interface.

  O arquivo ui.js cuida de:
  - renderizar os pensamentos na tela;
  - limpar o formulário;
  - preencher campos ao editar;
  - controlar a mensagem de lista vazia.
*/
import ui from "./ui.js";

/*
  Importa o módulo responsável pela comunicação com a API.

  O arquivo api.js cuida das requisições HTTP:
  - buscar pensamentos;
  - salvar pensamento;
  - editar pensamento;
  - excluir pensamento.
*/
import api from "./api.js";

/*
  Aguarda todo o HTML ser carregado antes de executar o JavaScript.

  Isso garante que os elementos como formulário e botões já existam
  na página quando forem selecionados.
*/
document.addEventListener("DOMContentLoaded", () => {
  /*
    Renderiza os pensamentos assim que a página carrega.

    Essa função busca os dados na API e monta a lista no mural.
  */
  ui.renderizarPensamentos();

  /*
    Seleciona o formulário e o botão cancelar.
  */
  const formularioPensamento = document.getElementById("pensamento-form");
  const botaoCancelar = document.getElementById("botao-cancelar");

  /*
    Ao enviar o formulário, executa a função responsável
    por salvar ou editar um pensamento.
  */
  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);

  /*
    Ao clicar em cancelar, limpa os campos do formulário.
  */
  botaoCancelar.addEventListener("click", manipularCancelamento);
});

/*
  Função chamada quando o formulário é enviado.

  Ela verifica se existe um ID no campo oculto:
  - se existir, significa que o usuário está editando um pensamento;
  - se não existir, significa que o usuário está criando um novo pensamento.
*/
async function manipularSubmissaoFormulario(event) {
  /*
    Impede o comportamento padrão do formulário,
    que seria recarregar a página ao enviar.
  */
  event.preventDefault();

  /*
    Captura os valores dos campos do formulário.

    pensamento-id é um campo hidden.
    Ele fica vazio ao criar um novo pensamento
    e preenchido quando o usuário está editando.
  */
  const id = document.getElementById("pensamento-id").value;
  const conteudo = document.getElementById("pensamento-conteudo").value;
  const autoria = document.getElementById("pensamento-autoria").value;

  try {
    /*
      Se existe ID, edita um pensamento existente.
      Caso contrário, salva um novo pensamento.
    */
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria });
    } else {
      await api.salvarPensamento({ conteudo, autoria });
    }

    /*
      Após salvar ou editar, renderiza a lista novamente
      para atualizar o mural na tela.
    */
    ui.renderizarPensamentos();
  } catch {
    /*
      Caso algo dê errado na requisição, exibe uma mensagem para o usuário.
    */
    alert("Erro ao salvar pensamento");
  }
}

/*
  Função chamada ao clicar no botão cancelar.

  Ela delega para o ui.js a responsabilidade de limpar o formulário.
*/
function manipularCancelamento() {
  ui.limparFormulario();
}
