
let currentList, draggingCard,
   draggingCardHeight, tempPosition, currentCard, 
   dragableArea, shadowCard;
const dragDrop = {

   //Acionado quando o usuário começa a arrastar um elemento válido.
   dragStart: function(e){
      draggingCard = e.target.closest('.card');
      draggingCardHeight = e.target.offsetHeight

      //Seleciona a lista sobre qual o draging está.
      currentList = e.target.closest('.list');
      dragableArea = document.querySelector(`#${currentList.getAttribute('id')} .dragableArea`);
      dragableArea.style.height = `${dragableArea.offsetHeight}px`

     
      
      e.dataTransfer.setDragImage(draggingCard, 0, 0);
      setTimeout(() => {
         draggingCard.style.opacity='0'
      }, 0);
      setTimeout(() => {
         draggingCard.style.display='none'
         if(dragableArea.childNodes.length <= 1){
            dragableArea.appendChild(TemporarieCard(draggingCardHeight));
         }
      }, 10);
   },

   dragEnter: function(e){
      //Verifica se a lista atual é a mesma em que a div foi criada.
      if(currentList !== e.target.closest('.list')){
         //remove a 'div temporária' criada anteriomente em outra lista.
         shadowCard = document.querySelector('.shadow-card');
         shadowCard ? shadowCard.remove() : '';
         tempPosition = '';
         dragableArea.style.height='auto'
      }
      //Atualiza a lista sobre qual o draging está.
      currentList = e.target.closest('.list');
      dragableArea = document.querySelector(`#${currentList.getAttribute('id')} .dragableArea`);
   },
   
   dragOver: function(e){
      e.preventDefault(); //obrigatório.
      
      //Se a dragableArea não conter nenhum card, adicioana a divTemp
      //para depois poder ser substituida pelo card dropado.
      if(dragableArea.childNodes.length < 1){
         dragableArea.appendChild(TemporarieCard(draggingCardHeight));
      }
      if(dragableArea.childNodes.length == 1 && dragableArea.firstChild == draggingCard){
         dragableArea.appendChild(TemporarieCard(draggingCardHeight));
      }

      const card = e.target.closest('.card');
      if(!card) return;

      currentCard = card;
      const mousePositionY = e.clientY; //Posição do mouseY
      const cardPositionY = card.offsetTop; //Posição do cardY
      const cardHalf = card.offsetHeight / 2; //Tamaho do card / 2 

      //Verifica se o card arrartado é o mesmo que o que está sobreposto.
      if(draggingCard == e.target.closest('.card')) return;
      
      if(mousePositionY < cardPositionY + cardHalf){
         if(tempPosition == 'up') return;
         //remove a 'div temporária' criada anteriomente.
         tempPosition == 'down' ? document.querySelector('.shadow-card').remove() : '';
            
         //Insere a caixa temporaria acima do card
         card.insertAdjacentElement('beforebegin', TemporarieCard(draggingCardHeight))
         tempPosition = 'up';
      }else{
         if(tempPosition == 'down') return;
         
         tempPosition == 'up'? document.querySelector('.shadow-card').remove() : '';
         //Insere a caixa temporaria abaixo do card
         card.insertAdjacentElement('afterend', TemporarieCard(draggingCardHeight))
         tempPosition = 'down';
      }
   },

   dragEnd: function(){
      draggingCard.style.display='flex';
      draggingCard.style.opacity='1'
      //Tenta selecionar a shadowCard, se não conseguir, é porque não tem como dropar o card, então retorna 
      //e reseta as variáveis.
      shadowCard = (document.querySelector(`#${currentList.getAttribute('id')} .shadow-card`));
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
      = dragableArea, shadowCard = null;
   }
}

function TemporarieCard( height ){
   const shadowCard = document.createElement('div');
   shadowCard.setAttribute('class', 'shadow-card w-full  bg-gray-200 rounded mb-2')
   shadowCard.setAttribute('style', `height:${height}px`);

   return shadowCard;
}

export default dragDrop;