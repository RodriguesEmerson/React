'use-client';
import { useState, useRef, useEffect } from "react";

export function TextArea({ content, id }) {
   const textAreaRef = useRef(null);
   const [texto, setTexto] = useState(content);

   useEffect(()=>{
      textAreaRef.current.focus();
      textAreaRef.current.select();
   },[])

   function handleEditingText(e){
      const textArea = textAreaRef.current;
      setTexto(e.target.value);
      textArea.style.height = `${textArea.scrollHeight}px`
   }
   return (
      <textarea
         id={`textArea${id}`}
         name="texto"
         ref={textAreaRef}
         className="p-1 outline-none resize-none"
         placeholder="Insira um texto"
         value={texto}
         autoFocus
         onChange={(e) => handleEditingText(e)}
         // onKeyDown={(e) => { e.code == "Enter" && handleSaveEditions() }}
      >
      </textarea>
   )
}