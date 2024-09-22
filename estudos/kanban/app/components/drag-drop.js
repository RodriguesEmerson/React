
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
      // dragableArea.style.height = `${dragableArea.offsetHeight}px`;    
      
      //Seta a imagem que aparecerá no card arrastado.
      e.dataTransfer.setDragImage(
            draggingCard, //Imagem
            (e.clientX - draggingCard.offsetLeft), //EixoX
            (e.clientY - draggingCard.offsetTop + dragableArea.scrollTop) //EixoY
      );

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
      // Se a dragableArea não tiver nenhum card, adicioana um shadowCard
      if(!dragableArea.hasChildNodes()){
         return dragableArea.appendChild(shadowCard); 
      }
      
      const card = e.target.closest('.card');
      if(!card) return;
      currentCard = card;

      const mousePositionY = e.clientY + dragableArea.scrollTop; //Posição do mouseY
      const cardPositionY = card.offsetTop; //Posição do cardY
      const cardHalf = card.offsetHeight / 2; //Tamaho do card / 2 

      if(draggingCard == currentCard) return;
      if(mousePositionY < cardPositionY + cardHalf){
         //Verifica se o carde anterior é o card que esta sendo arrastado.
         if(card.previousSibling?.isEqualNode(draggingCard)) return;

         //Verifica se o próximo card é um shadowCard, se for, o remove();
         card.nextSibling?.isEqualNode(shadowCard) && card.nextSibling.remove();

         //Insere um shadowCard acima do card, se não haver um.
         if(!card.previousSibling || !card.previousSibling.isEqualNode(shadowCard)){
            card.insertAdjacentElement('beforebegin', shadowCard)
         }
      }else{
         //Verifica se o carde posterior é o card que esta sendo arrastado.
         if(card.nextSibling?.isEqualNode(draggingCard)) return;

         //Verifica se o card anterior é o shadowCard, se for, o remove();
         card.previousSibling?.isEqualNode(shadowCard) && card.previousSibling.remove();
   
         if(!card.nextSibling || !card.nextSibling.isEqualNode(shadowCard)){
            //Insere a caixa temporaria abaixo do card
            card.insertAdjacentElement('afterend', shadowCard);
         }
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