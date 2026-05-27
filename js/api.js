/*
  URL base da API fake criada com json-server.

  Para funcionar, o backend precisa estar rodando com:
  npm start

  Isso disponibiliza a rota:
  http://localhost:3000/pensamentos
*/
const URL_BASE = "https://memoteca-api-8w1z.onrender.com";

/*
  Objeto responsável por centralizar todas as requisições da aplicação.

  Separar as chamadas da API em um arquivo próprio deixa o código mais organizado,
  porque o restante do projeto não precisa saber os detalhes das URLs ou métodos HTTP.
*/
const api = {
  /*
    Busca todos os pensamentos cadastrados.

    Método HTTP: GET
    Rota: /pensamentos
  */
  async buscarPensamentos() {
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos`);

      return response.data;
    } catch (error) {
      alert("Erro ao buscar pensamentos");
      throw error;
    }
  },

  /*
    Salva um novo pensamento.

    Método HTTP: POST
    Rota: /pensamentos

    O parâmetro "pensamento" deve ser um objeto parecido com:
    {
      conteudo: "Texto do pensamento",
      autoria: "Nome do autor"
    }
  */
  async salvarPensamento(pensamento) {
    try {
      const response = await axios.post(`${URL_BASE}/pensamentos`, pensamento);

      return response.data;
    } catch (error) {
      alert("Erro ao salvar pensamento");
      throw error;
    }
  },

  /*
    Busca um pensamento específico pelo ID.

    Método HTTP: GET
    Rota: /pensamentos/:id

    Essa função é útil quando o usuário clica em editar,
    pois permite carregar os dados atuais do pensamento no formulário.
  */
  async buscarPensamentoPorId(id) {
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);

      return response.data;
    } catch (error) {
      alert("Erro ao buscar pensamento");
      throw error;
    }
  },

  /*
    Edita um pensamento existente.

    Método HTTP: PUT
    Rota: /pensamentos/:id

    O objeto "pensamento" precisa conter o id, porque ele é usado
    para montar a URL da requisição.
  */
  async editarPensamento(pensamento) {
    try {
      const response = await axios.put(
        `${URL_BASE}/pensamentos/${pensamento.id}`,
        pensamento,
      );

      return response.data;
    } catch (error) {
      alert("Erro ao editar pensamento");
      throw error;
    }
  },

  /*
    Exclui um pensamento pelo ID.

    Método HTTP: DELETE
    Rota: /pensamentos/:id
  */
  async excluirPensamento(id) {
    try {
      await axios.delete(`${URL_BASE}/pensamentos/${id}`);
    } catch (error) {
      alert("Erro ao excluir um pensamento");
      throw error;
    }
  },
};

/*
  Exporta o objeto api para ser usado em outros arquivos,
  como main.js ou ui.js.
*/
export default api;
