
let origemList, currentList, draggingCard, tempPosition, currentCard;
const dragDrop = {

   //Acionado quando o usuário começa a arrastar um elemento válido.
   dragStart: function(e){
      if(draggingCard) return;
      draggingCard = e.target.closest('.card');
      !origemList ? origemList = e.target.closest('.list'): '';

      //A lista sobre qual o draging está.
      currentList = e.target.closest('.list');
   },

   dragEnter: function(e){
      //Verifica se a lista atual é a mesma em que a div foi criada.
      if(currentList.getAttribute('id') != e.target.closest('.list').getAttribute('id')){
         //remove a 'div temporária' criada anteriomente em outra lista.
         const TemporarieDiv = document.querySelector('.temp-div');
         TemporarieDiv ? TemporarieDiv.remove() : '';
         tempPosition = ''
      }
      currentList = e.target.closest('.list');
   },

   //Acionado quando um elemento está sendo arrastado 
   //sobre um ponto de soltura válido (a cada aproximadamente 100 milisegundos).
   dragOver: function(e){
      e.preventDefault();
      //Verifica se o card arrartado é o mesmo que o que esta sobreposto.
      if(draggingCard.getAttribute('id') == e.target.closest('.card').getAttribute('id')) return;
      
      const card = e.target.closest('.card')
      const mousePositionY = e.clientY; //Posição do mouseY
      const cardPositionY = card.offsetTop; //Posição do cardY
      const cardHalf = card.offsetHeight / 2; //Tamaho do card / 2     

      if(mousePositionY < cardPositionY + cardHalf){
         if(tempPosition == 'up') return;
         //remove a 'div temporária' criada anteriomente.
         tempPosition == 'down' ? document.querySelector('.temp-div').remove() : '';
            
         //Insere a caixa temporaria acima do card
         card.insertAdjacentElement('beforebegin', TemporarieCard(draggingCard.offsetHeight))
         tempPosition = 'up';
      }else{
         if(tempPosition == 'down') return;
         
         tempPosition == 'up' ? document.querySelector('.temp-div').remove() : '';
         //Insere a caixa temporaria abaixo do card
         card.insertAdjacentElement('afterend', TemporarieCard(draggingCard.offsetHeight))
         tempPosition = 'down';
      }
   },

   //Acionado quando uma operação de arrastar está terminando 
   //(por eexmplo, ao soltar o botão do mouse ou pressionar a tecla esc).
   dragEnd: function(){
      draggingCard = false;
   }
}

function TemporarieCard( height ){
   const tempDiv = document.createElement('div');
   tempDiv.setAttribute('class', 'temp-div w-full  bg-gray-200 rounded mb-2')
   tempDiv.setAttribute('style', `height:${height}px`);

   return tempDiv;
}

export default dragDrop;