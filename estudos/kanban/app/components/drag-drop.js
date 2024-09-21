
let currentList, draggingCard, draggingCardClone, draggingCardHeight, tempPosition, currentCard, dragableArea;
const dragDrop = {

   //Acionado quando o usuário começa a arrastar um elemento válido.
   dragStart: function(e){
      draggingCard = e.target.closest('.card');
      draggingCardHeight = e.target.offsetHeight
      draggingCardClone = draggingCard.cloneNode(true);
      //Seleciona a lista sobre qual o draging está.
      currentList = e.target.closest('.list');
      dragableArea = document.querySelector(`#${currentList.getAttribute('id')} .dragableArea`);
      draggingCard.style.opacity = '0';
      
      e.dataTransfer.setDragImage(draggingCardClone, 0, 0);

      // draggingCardClone.style.display="none";
      dragableArea.appendChild(draggingCardClone);
      // Remove o clone após o dragStart
      setTimeout(() => {
         dragableArea.removeChild(draggingCardClone);
      }, 0);
   },

   dragEnter: function(e){
      //Verifica se a lista atual é a mesma em que a div foi criada.
      if(currentList !== e.target.closest('.list')){
         //remove a 'div temporária' criada anteriomente em outra lista.
         const tempDiv = document.querySelector('.temp-div');
         tempDiv ? tempDiv.remove() : '';
         tempPosition = '';
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
         tempPosition == 'down' ? document.querySelector('.temp-div').remove() : '';
            
         //Insere a caixa temporaria acima do card
         card.insertAdjacentElement('beforebegin', TemporarieCard(draggingCardHeight))
         tempPosition = 'up';
      }else{
         if(tempPosition == 'down') return;
         
         tempPosition == 'up' ? document.querySelector('.temp-div').remove() : '';
         //Insere a caixa temporaria abaixo do card
         card.insertAdjacentElement('afterend', TemporarieCard(draggingCardHeight))
         tempPosition = 'down';
      }
   },

   dragEnd: function(){
      draggingCard.style.opacity = '1';
      //Tenta selecionar a tempDiv, se não conseguir, é porque não tem como dropar o card, então retorna 
      //e reseta as variáveis.
      const tempDiv = (document.querySelector(`#${currentList.getAttribute('id')} .temp-div`));
      if(!tempDiv){
         draggingCard = currentList = tempPosition = currentCard = null;
         return;
      };
      //Adiciona o card no fim da dropArea, depois o troca de lugar com a tempDiv e por fim apara a tempDiv.
      dragableArea.appendChild(draggingCard); 
      dragableArea.replaceChild(draggingCard, tempDiv);
      tempDiv.remove();
      draggingCard = currentList = tempPosition = currentCard = null;
   }
}

function TemporarieCard( height ){
   const tempDiv = document.createElement('div');
   tempDiv.setAttribute('class', 'temp-div w-full  bg-gray-200 rounded mb-2')
   tempDiv.setAttribute('style', `height:${height}px`);

   return tempDiv;
}

export default dragDrop;