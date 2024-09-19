
let currentList, currentCard, temInserted;
const dragDrop = {
   dragStart: function(e){
      currentCard = e.target.closest('.card');
   },

   draging: function(){
      console.log('draging')
   },

   dragOver: function(e){

      const card = e.target.closest('.card')
      //Verifica se o card arrartado é o mesmo que o que esta sobreposto.
      if(currentCard.getAttribute('id') == card.getAttribute('id')) return;

      if(temInserted) return;

      //Posição do mouse e do card no eixo Y.
      const mousePositionY = e.clientY;
      const cardPositionY = card.offsetTop;
      const cardHalf = card.offsetHeight / 2;
      console.log(cardHalf)

      //A lista sobre qual o draging está.
      currentList = card.closest('.list');

      if(mousePositionY > cardPositionY + cardHalf){
         card.insertAdjacentElement('afterend', TemporarieCard(currentCard.offsetHeight))
         console.log('menor')
      }else{
         card.prepend(TemporarieCard(currentCard.offsetHeight))
      }

      temInserted = true;

   },

   dragEnd: function(){
      console.log('end')
   }
}

function TemporarieCard( height ){
   const tempDiv = document.createElement('div');
   tempDiv.setAttribute('class', 'temp-div w-full bg-gray-200 rounded')
   tempDiv.setAttribute('style', `height:${height}px`);

   return tempDiv;
}

export default dragDrop;