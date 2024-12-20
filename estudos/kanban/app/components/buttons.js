export function ButtonSaveDefault({type, value, width, handleClick}){
   return(
      <input 
      type={type}  
      value={value}
      className={`text-xs font-semibold text-white h-8 bg-blue-600 cursor-pointer hover:bg-blue-700 
      transition-all rounded-[3px]`}
      style={{width: `${width}`}}
      onClick={(e)=> {handleClick(e)}}
   />
   )
}