
let currentList, currentListId, draggingCard,
   draggingCardHeight, tempPosition, currentCard, 
   dragableArea, shadowCard;
const dragDrop = {

   //Acionado quando o usuário começa a arrastar um elemento válido.
   dragStart: function(e){
      draggingCard = e.target.closest('.card');
      draggingCardHeight = e.target.offsetHeight
      
      //Seleciona a lista sobre qual o draging está.
      currentList = e.target.closest('.list');
      currentListId = currentList.getAttribute('id');
      dragableArea = document.querySelector(`#${currentListId} .dragableArea`);  
      dragableArea.style.height = `${dragableArea.offsetHeight}px`;    
      
      // //Seta a imagem que aparecerá no dragging e a posição do mouse em no card arrastado.
      // e.dataTransfer.setDragImage(draggingCard, 0, 0);

      // setTimeout(() => {
      //    draggingCard.style.opacity='0';
      //    // dragableArea.appendChild(TemporarieCard(draggingCardHeight));
      //    // dragableArea.r
      // }, 0);
      // setTimeout(() => {
      //    //Insere um shadowCard na dragableArea se não haver nehum card 
      //    //depois do card ser arrastado.
      //    draggingCard.style.display='none';
      //    if(dragableArea.childNodes.length <= 1){
            
      //    }
      // }, 10);
   },

   dragEnter: function(e){
      //Verifica se a lista atual é a mesma em que a div foi criada.
      if(currentList !== e.target.closest('.list')){
         //remove a 'div temporária' criada anteriomente em outra lista.
         shadowCard = document.querySelector('.shadow-card');
         shadowCard ? shadowCard.remove() : '';
         tempPosition = '';
         dragableArea.style.height='auto';
      }
      //Atualiza a lista sobre qual o draging está.
      currentList = e.target.closest('.list');
      currentListId = currentList.getAttribute('id');
      dragableArea = document.querySelector(`#${currentList.getAttribute('id')} .dragableArea`);
   },
   
   dragOver: function(e){
      e.preventDefault(); //obrigatório.
      shadowCard = TemporarieCard(draggingCardHeight)
      const card = e.target.closest('.card');
      //Se a dragableArea não conter nenhum card, adicioana a divTemp
      //para depois poder ser substituida pelo card dropado.
      if(dragableArea.childNodes.length < 1){
         dragableArea.appendChild(shadowCard);
         return
      }
      if(dragableArea.childNodes.length == 1 && dragableArea.firstChild == draggingCard){
         dragableArea.appendChild(shadowCard);
         return
      }

      if(!card) return;

      currentCard = card;
      const mousePositionY = e.clientY; //Posição do mouseY
      const cardPositionY = card.offsetTop; //Posição do cardY
      const cardHalf = card.offsetHeight / 2; //Tamaho do card / 2 

      //Verifica se o card arrartado é o mesmo que o que está sobreposto.
      if(draggingCard == card) return;
      
      if(mousePositionY < cardPositionY + cardHalf){

         if(!card.previousSibling){
            return card.insertAdjacentElement('beforebegin', shadowCard)
         }
         if(card.previousSibling.isEqualNode(shadowCard)) return;
         
         if(card.nextSibling){
            console.log('aru')
            card.nextSibling.isEqualNode(shadowCard) ? shadowCard.remove() : '';
         }
         
         //Insere a caixa temporaria acima do card
         card.insertAdjacentElement('beforebegin', shadowCard)
      }else{
         if(!card.nextSibling){
            return card.insertAdjacentElement('afterend', shadowCard);
         }
         if(card.nextSibling.isEqualNode(shadowCard)) return;

         if(card.previousSibling){
            card.previousSibling.isEqualNode(shadowCard) ? shadowCard.remove() : '';
            // console.log('tem')
         }

         //Insere a caixa temporaria abaixo do card
         card.insertAdjacentElement('afterend', shadowCard)
      }
   },

   dragEnd: function(){
      draggingCard.style.display='flex';
      draggingCard.style.opacity='1'
      //Tenta selecionar a shadowCard, se não conseguir, é porque não tem como dropar o card, então retorna 
      //e reseta as variáveis.
      shadowCard = (document.querySelector(`#${currentListId} .shadow-card`));
      if(!shadowCard){
         dragDrop.reseteVariables(); 
         return;
      };
      //Adiciona o card no fim da dropArea, depois o troca de lugar com a shadowCard e por fim apara a shadowCard.
      dragableArea.appendChild(draggingCard); 
      dragableArea.replaceChild(draggingCard, shadowCard);
      shadowCard.remove();
      dragDrop.reseteVariables();
   },

   reseteVariables: function(){
      currentList = draggingCard = draggingCardHeight = tempPosition = currentCard 
      = dragableArea, shadowCard = currentListId = null;
   }
}

function TemporarieCard( height ){
   const shadowCard = document.createElement('div');
   shadowCard.setAttribute('class', 'shadow-card w-full  bg-gray-200 rounded mb-2')
   shadowCard.setAttribute('style', `height:${height}px`);

   return shadowCard;
}

export default dragDrop;