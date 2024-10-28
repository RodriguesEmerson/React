
let currentList, currentListId, draggingCard, draggingCardId,
   draggingCardHeight, currentCard, listaCardsOrigem, setListaCardsOrigem,
   dragableArea, shadowCard, listaOrigemId, listaCardsDestino,
   setListaCardsDestino, lists, setLists, projectId;
let indexCompensation = 0;

import { moverCard } from "./mover-card";

const dragDrop = {

   //Acionado quando o usuário começa a arrastar um elemento válido.
   dragStart: function (e, cardInfos, cards, setCards) {
      draggingCard = e.target.closest('.card');
      draggingCardHeight = e.target.offsetHeight;
      draggingCardId = draggingCard.getAttribute('id');
      listaCardsOrigem = [...cards];
      setListaCardsOrigem = setCards;
      //Seleciona a lista de origem do card.
      currentList = e.target.closest('.list');
      listaOrigemId = currentList.getAttribute('id');
      dragableArea = document.querySelector(`#${currentList.getAttribute('id')} .dragableArea`);
      const htmlScrollLeft = document.querySelector('html').scrollLeft;

      //Seta a imagem que aparecerá no card arrastado.
      e.dataTransfer.setDragImage(
         draggingCard, //Imagem 
         (e.clientX - draggingCard.offsetLeft + htmlScrollLeft), //EixoX
         (e.clientY - draggingCard.offsetTop + dragableArea.scrollTop) //EixoY
      );
   },

   dragEnter: function (e, cards, setCards, arrLists, setArrLists, project) {
      //remove a 'shadowCard' criada anteriomente em outra lista.
      if (currentList !== e.target.closest('.list')) {
         shadowCard = document.querySelector('.shadow-card');
         shadowCard && shadowCard.remove();
      }
      listaCardsDestino = [...cards];
      setListaCardsDestino = setCards;
      lists = arrLists;
      setLists = setArrLists;
      projectId = project;
      //Atualiza a lista sobre qual o draging está.
      currentList = e.target.closest('.list');
      if (!currentList) return;
      currentListId = currentList.getAttribute('id');
      dragableArea = document.querySelector(`#${currentListId} .dragableArea`);
   },

   dragOver: function (e) {
      e.preventDefault(); //obrigatório.

      shadowCard = TemporarieCard(draggingCardHeight);
      //Mesmo se a dragableArea não tiver nenhum card, adicioana um shadowCard.
      !dragableArea.hasChildNodes() && dragableArea.appendChild(shadowCard)
      if (dragableArea.childNodes.length == 1 && dragableArea.firstChild.isEqualNode(draggingCard)) {
         draggingCard.style.display = 'none';
         return dragableArea.appendChild(shadowCard);
      }
      if (dragableArea.childNodes.length == 1 && dragableArea.firstChild.classList.contains('novo-card')) {
         draggingCard.style.display = 'none';
         return dragableArea.prepend(shadowCard);
      }

      const card = e.target.closest('.card');
      if (!card) return;
      currentCard = card;

      const mousePositionY = e.clientY + dragableArea.scrollTop; //Posição do mouseY
      const cardPositionY = card.offsetTop; //Posição do cardY
      const cardHalf = card.offsetHeight / 2; //Tamaho do card / 2 

      if (draggingCard == currentCard) return;
      if (mousePositionY < cardPositionY + cardHalf) {
         draggingCard.style.display = 'none';

         //Verifica se o próximo card é um shadowCard, se for, o remove();
         card.nextSibling?.isEqualNode(shadowCard) && card.nextSibling.remove();

         //Insere um shadowCard acima do card, se não haver um.
         if (!card.previousSibling || !card.previousSibling.isEqualNode(shadowCard)) {
            card.insertAdjacentElement('beforebegin', shadowCard);

            //Compensa o index do shadowCard
            indexCompensation = 0
         }
      } else {
         draggingCard.style.display = 'none';

         //Verifica se o card anterior é o shadowCard, se for, o remove();
         card.previousSibling?.isEqualNode(shadowCard) && card.previousSibling.remove();

         if (!card.nextSibling || !card.nextSibling.isEqualNode(shadowCard)) {
            //Insere a caixa temporaria abaixo do card
            card.insertAdjacentElement('afterend', shadowCard);

            //Compensa o index do shadowCard
            indexCompensation = 1;
         }
      }
   },

   dragEnd: function (e, cardInfos) {
      draggingCard.style.display = 'flex';
      shadowCard = (document.querySelector(`#${currentListId} .shadow-card`));

      /////////////////////////////////////////////////////////////////////////////////////////////////////
      //*****************RENDERIZA OS CARDS MOVIDOS E LISTAS ALTERADAS INSTANTANEAMENTE NA TELA**********//
      //-> Pordeira ser movido lá na opção mover card, e não precisaria dessa função, porém ficaria com  //
      // a famosa 'piscada' quando os cards fossem movidos.                                              //
      //*************************************************************************************************//
      if (shadowCard) {
         //Index da sombra do card.
         const shadowCardIndex = this.getShadowCardIndex(shadowCard);
         shadowCard.remove();
         
         if (currentListId == listaOrigemId) {
            //Filtra os cards, removendo o card arrastado.
            listaCardsOrigem = listaCardsOrigem.filter(card => card.id != draggingCardId);
            // Adiciona o card à lista de destino
            listaCardsOrigem = [
               ...listaCardsOrigem.slice(0, shadowCardIndex),  // itens antes do índice
               cardInfos,                                       // o novo item a ser inserido
               ...listaCardsOrigem.slice(shadowCardIndex)      // itens após o índice
            ];
            setListaCardsDestino(listaCardsOrigem);
            return;
         }
         
         //Filtra os cards, removendo o card clicado.
         listaCardsOrigem = listaCardsOrigem.filter(card => card.id != draggingCardId);
         
         // Adiciona o card à lista de destino
         listaCardsDestino = [
            ...listaCardsDestino.slice(0, shadowCardIndex),  // itens antes do índice
            cardInfos,                                       // o novo item a ser inserido
            ...listaCardsDestino.slice(shadowCardIndex)      // itens após o índice
         ];
         
         setListaCardsOrigem(listaCardsOrigem);
         setListaCardsDestino(listaCardsDestino);
      /////////////////////////////////////////////////////////////////////////////////////////////////////

         //Salva as alterações na DB
         moverCard.adicionarCard_DB(currentListId, shadowCardIndex + 1, cardInfos, projectId);
         moverCard.deletarCard_DB(listaOrigemId,cardInfos.id, projectId)
      }
      dragDrop.reseteVariables();
   },

   getShadowCardIndex: function (shadowCard) {
      const childrenELements = dragableArea.children;
      for (let i = 0; i <= childrenELements.length; i++) {
         if (childrenELements[i] == shadowCard) return i - indexCompensation;
      }

   },

   reseteVariables: function () {
      currentList = draggingCard = draggingCardHeight = currentCard
         = dragableArea, shadowCard = currentListId = null;
   }
}

function TemporarieCard(height) {
   const shadowCard = document.createElement('div');
   shadowCard.setAttribute('class', 'shadow-card w-full  bg-gray-200 rounded-md mb-2')
   shadowCard.setAttribute('style', `height:${height}px`);

   return shadowCard;
}

export default dragDrop;