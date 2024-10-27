export class NovoCard {
   constructor(content, UUID, dataHoje) {
      this.content = content;
      this.data = dataHoje;
      this.periodo = {
         inicio: "",
         fim: "",
         status: false
      }
      this.img = '';
      this.capa = {
         color: false, full: false,
         img: ""
      },
         this.integrants = [];
      this.labels = [];
      this.coments = [];
      this.id = `c${UUID}`;
   }
}

const criarNovo = {
   card: function (e, cards, setCards, projectId) {
      e.preventDefault();
      const parentId = e.target.getAttribute('data-parent');
      const form = document.querySelector(`#f${parentId}`);

      //Pega os dados do formilário
      const formData = new FormData(form);
      const texto = Object.fromEntries(formData)['texto'];

      //Valdia o texto do card.
      if (texto.length == 0) return console.log('Nome Inválido!');

      //Instancia um novo card.
      const novoCard = new NovoCard(texto, this.gerarUUID(), this.dataHoje());

      //Adiciona um novo card no fim dos cards, sem re-renderizar todos os outros.
      setCards([...cards, novoCard]);

      this.salvarCard(novoCard, parentId, projectId);

   },
   gerarUUID: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
         const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
         return v.toString(16);
      })
   },
   dataHoje: function () {
      return new Date().toLocaleDateString('pt-br', { year: 'numeric', month: '2-digit', day: '2-digit' });
   },

   salvarCard: async function (novoCard, parentId, projectId) {
      await fetch(`/api/projects/${projectId}/${parentId}`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(novoCard)
         })
         .then(respose => respose.status == 201 && this.notificar('novoCard'))
         .catch(error => console.log(error));
   },
   notificar: function (tipo) {
      tipo == 'novoCard' && console.log('Novo card criado com sucesso!');
   },
}


export default criarNovo;