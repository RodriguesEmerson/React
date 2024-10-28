import { modalInfos } from "./main";

const moverCard = {
   randonId: function () {
      return `c${Date.now()}-${Math.floor(Math.random() * 1000) + 1}`
   },
   getLists: function (lists) {
      const listsNames = [];
      lists.forEach(list => {
         const indexCardsLength = [];
         for (let i = 1; i < list.cards.length + 2; i++) {
            indexCardsLength.push(i);
         }
         listsNames.push({ listName: list.listName, listId: list.id, index: indexCardsLength })
      });
      return listsNames;
   },
   getNomeListaAtual: function (lists) {
      let nomeLitaAtual;
      const listOrigemId = modalInfos.getListOrigemId();
      lists.forEach(list => {
         if (list.id == listOrigemId) nomeLitaAtual = list.listName;
      });
      return nomeLitaAtual;
   },
   mover: function (listaDestino, lists, setLists, index) {
      //Cria uma cópia de das lista sem alterar a origianl
      const editingLists = [...lists];
      const editingCard = { ...modalInfos.getCardInfos() };
      const listOrigemId = modalInfos.getListOrigemId();

      //Percorre todas as listas
      editingLists.forEach(list => {
         if (list.id == listOrigemId) {
            //Filtra os cards, removendo o card clicado.
            list.cards = list.cards.filter(card => card.id != editingCard.id);
            this.deletarCard_DB()
         };

         if (list.id == listaDestino) {
            // Adiciona o card à lista de destino
            if (index) {
               list.cards = [
                  ...list.cards.slice(0, index - 1),  // itens antes do índice
                  editingCard,                   // o novo item a ser inserido
                  ...list.cards.slice(index - 1)      // itens após o índice
               ];
            } else {
               list.cards = [editingCard, ...list.cards];
            }
            this.adicionarCard_DB(list.id, index)
         }
      });
      setLists(editingLists);
      modalInfos.resetEditingStyle();
   },

   copiar: function (listaDestino, lists, setLists, index, texto) {
      //Cria uma cópia de das lista sem alterar a origianl
      const editingLists = [...lists];
      const editingCard = { ...modalInfos.getCardInfos() };
      editingCard.id = this.randonId();
      editingCard.content = texto;

      //Percorre todas as listas
      editingLists.forEach(list => {
         if (list.id == listaDestino && index) {
            // Adiciona o card à lista de destino
            list.cards = [
               ...list.cards.slice(0, index - 1),  // itens antes do índice
               editingCard,               // o novo item a ser inserido
               ...list.cards.slice(index - 1)      // itens após o índice
            ];
            this.adicionarCard_DB(list.id, index)
         }
      });

      setLists(editingLists);
      modalInfos.resetEditingStyle();
   },

   deletarCard_DB: async function (list, editingCardId, project) {
      const projectId = project ? project : modalInfos.getProjectId()
      const listId = list ? list : modalInfos.getListOrigemId();
      const cardId = editingCardId ? editingCardId : modalInfos.getEditingCardId();

      await fetch(`/api/projects/${projectId}/${listId}/${cardId}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         }
      })
      .then(reponse => reponse.status == 200 && (console.log('Card removido...')))
      .catch(error => console.log(error));

   },

   adicionarCard_DB: async function (listId, index = 1, editingCard, project) {
      const projectId = project ? project : modalInfos.getProjectId();
      const card = editingCard ? editingCard : modalInfos.getCardInfos();

      await fetch(`/api/projects/${projectId}/${listId}?index=${index}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(card)
      })
      .then(respose => respose.status == 201 && console.log('Card adicionado...'))
      .catch(error => console.log(error));
   }

}

export { moverCard };
