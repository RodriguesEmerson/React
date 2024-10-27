import criarNovo from "./novo-card";

class NovaLista {
   constructor(listName){
      this.listName = listName;
      this.id = `l${criarNovo.gerarUUID()}`;
      this.cards = [];
   }
}

const criarNova = {
   lista: function(lists, setLists, setHidden, projectId){
      //Pega os dados do formulário
      const form = document.querySelector(".new-list");
      const formData = new FormData(form);
      const listName = Object.fromEntries(formData)['new-list-name'];
      //Valida o nome.
      if(listName.length == 0) return console.log('Nome Inválido!');

      //Instancia a nova lista.
      const novaLista = new NovaLista(listName);

      //Renderiza a nova lista.
      setLists([...lists, novaLista]);
      setHidden(true);
      this.salvarLista(novaLista, projectId)
   },

   salvarLista: async function (novaLista, projectId) {
      await fetch(`/api/projects/${projectId}`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(novaLista)
         })
         .then(respose => respose.status == 201 && this.notificar('novaLista'))
         .catch(error => console.log(error));
   },
   notificar: function (tipo) {
      tipo == 'novaLista' && console.log('Nova lista criada com sucesso!');
   },
}

export { criarNova }