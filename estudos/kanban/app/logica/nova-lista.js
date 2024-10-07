import criarNovo from "./novo-card";

class NovaLista {
   constructor(listName){
      this.listName = listName;
      this.id = `l${criarNovo.gerarUUID()}`;
      this.cards = [];
   }
}

const cirarNova = {
   lista: function(listName){
      const novaLista = new NovaLista(listName);
   }
}