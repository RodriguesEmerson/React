


export default function ModalLabels(){
   const labelsList = [
      {color: '#FFC636'},
      {color: '#FF6444'},
      {color: '#00ADA9'},
      {color: '#260273'},
      {color: '#04D99D'},
      {color: '#F205CB'},
      {color: '#7C05F2'},
      {color: '#F2E307'},
   ]
   return(
      <div className="modal-labels">
         <ul className="flex flex-col gap-1 bg-white w-80">
            {labelsList.map(label => (
               <li key={label.color}>Olá</li>
            ))}
         </ul>
      </div>
   )
}