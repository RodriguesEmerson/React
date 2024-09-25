
let currentList, currentListId, draggingCard,
   draggingCardHeight, currentCard, 
   dragableArea, shadowCard;

   
const dragDrop = {
   //Acionado quando o usuário começa a arrastar um elemento válido.
   dragStart: function(e){
      draggingCard = e.target.closest('.card');
      draggingCardHeight = e.target.offsetHeight;
      draggingCard.classList.add('dragging')

      //Seleciona a lista sobre qual o draging está.
      currentList = e.target.closest('.list');
      dragableArea = document.querySelector(`#${currentList.getAttribute('id')} .dragableArea`);
      
      //Seta a imagem que aparecerá no card arrastado.
      e.dataTransfer.setDragImage(
         draggingCard, //Imagem
         (e.clientX - draggingCard.offsetLeft), //EixoX
         (e.clientY - draggingCard.offsetTop + dragableArea.scrollTop) //EixoY
      );
   },

   dragEnter: function(e){
      //remove a 'shadowCard' criada anteriomente em outra lista.
      if(currentList !== e.target.closest('.list')){
         shadowCard = document.querySelector('.shadow-card');
         shadowCard && shadowCard.remove();
      }
      //Atualiza a lista sobre qual o draging está.
      currentList = e.target.closest('.list');
      if(!currentList) return;
      currentListId = currentList.getAttribute('id');
      dragableArea = document.querySelector(`#${currentListId} .dragableArea`);
   },
   
   dragOver: function(e){
      e.preventDefault(); //obrigatório.

      shadowCard = TemporarieCard(draggingCardHeight);
      // Se a dragableArea não tiver nenhum card, adicioana um shadowCard
      !dragableArea.hasChildNodes() && dragableArea.appendChild(shadowCard)
      if(dragableArea.childNodes.length == 1 && dragableArea.firstChild.isEqualNode(draggingCard)){
         draggingCard.style.display = 'none';
         return dragableArea.appendChild(shadowCard); 
      }
      if(dragableArea.childNodes.length == 1 && dragableArea.firstChild.classList.contains('novo-card')){
         draggingCard.style.display = 'none';
         return dragableArea.prepend(shadowCard); 
      }
      
      const card = e.target.closest('.card');
      if(!card) return;
      currentCard = card;

      const mousePositionY = e.clientY + dragableArea.scrollTop; //Posição do mouseY
      const cardPositionY = card.offsetTop; //Posição do cardY
      const cardHalf = card.offsetHeight / 2; //Tamaho do card / 2 

      if(draggingCard == currentCard) return;
      if(mousePositionY < cardPositionY + cardHalf){
         draggingCard.style.display = 'none';

         //Verifica se o próximo card é um shadowCard, se for, o remove();
         card.nextSibling?.isEqualNode(shadowCard) && card.nextSibling.remove();

         //Insere um shadowCard acima do card, se não haver um.
         if(!card.previousSibling || !card.previousSibling.isEqualNode(shadowCard)){
            card.insertAdjacentElement('beforebegin', shadowCard)
         }
      }else{
         draggingCard.style.display = 'none';

         //Verifica se o card anterior é o shadowCard, se for, o remove();
         card.previousSibling?.isEqualNode(shadowCard) && card.previousSibling.remove();
   
         if(!card.nextSibling || !card.nextSibling.isEqualNode(shadowCard)){
            //Insere a caixa temporaria abaixo do card
            card.insertAdjacentElement('afterend', shadowCard);
         }
      }
   },

   dragEnd: function(){
      draggingCard.style.display = 'flex';
      shadowCard = (document.querySelector(`#${currentListId} .shadow-card`));
      shadowCard && shadowCard.replaceWith(draggingCard);
      dragDrop.reseteVariables();
   },

   reseteVariables: function(){
      currentList = draggingCard = draggingCardHeight = currentCard 
      = dragableArea, shadowCard = currentListId = null;
   }
}

function TemporarieCard( height ){
   const shadowCard = document.createElement('div');
   shadowCard.setAttribute('class', 'shadow-card w-full  bg-gray-200 rounded-md mb-2')
   shadowCard.setAttribute('style', `height:${height}px`);

   return shadowCard;
}

export default dragDrop;