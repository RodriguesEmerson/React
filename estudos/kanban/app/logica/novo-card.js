class NovoCard {
   constructor(content){
      this.content = content;
      this.data = this.dataHoje();
      this.prazo = false;
      this.img = '';
      this.integrants = [];
      this.labels = [];
      this.coments = [];
      this.id = `c${this.gerarUUID()}`;
   }

   gerarUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
         const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
         return v.toString(16);
      })
   }
   dataHoje(){
      return new Date().toLocaleDateString('pt-br', {year: 'numeric', month: '2-digit', day: '2-digit'});
   }
   
}

const criarNovo = {
   card: function(e, cards, setCards){
      e.preventDefault();
      const parentId = e.target.getAttribute('data-parent');
      const form = document.querySelector(`#f${parentId}`);

      //Pega os dados do formilário
      const formData = new FormData(form);
      const texto = Object.fromEntries(formData)['texto'];

      const novoCard = new NovoCard(texto);

      //Adiciona um novo card no fim dos cards, sem re-renderizar todos os outros.
      setCards([...cards, novoCard]);

      this.salvarCard(novoCard, parentId);

   },
   salvarCard: async function(novoCard, parentId){
      await fetch (`/api/projects/${parentId}`, 
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
   notificar: function(tipo){
      tipo == 'novoCard' && console.log('Novo card criado com sucesso!')
   }
}


export default criarNovo;