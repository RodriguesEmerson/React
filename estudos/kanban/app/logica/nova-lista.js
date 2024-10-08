import criarNovo from "./novo-card";

class NovaLista {
   constructor(listName){
      this.listName = listName;
      this.id = `l${criarNovo.gerarUUID()}`;
      this.cards = [];
   }
}

const criarNova = {
   lista: function(e, lists, setLists){
      e.preventDefault();
      //Pega os dados do formulário
      const form = document.querySelector(".new-list");
      const formData = new FormData(form);
      const listName = Object.fromEntries(formData)['new-list-name'];
      //Valida o nome.
      if(listName.length == 0) return console.log('Nome Inválido!');

      //Instancia a nova lista.
      const novaLista = new NovaLista(listName);

      //Renderiza a nova lista.
      setLists([...lists, novaLista])
   }
}

export { criarNova }