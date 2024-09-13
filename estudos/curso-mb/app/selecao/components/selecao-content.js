'use client';

import SelecaoHeader from './selecao-header/selecao-header';
import SelecaoGalerias from './selecao-galerias/selecao-galerias'
import { useState } from 'react';

export default function SelecaoCotent({ data }){

   const [searchTerms, setSearchTerms] = useState('');
   //Filtra os dados de acordo o campo de busca;
   const filteredData = data.filter(item => 
      item.titulo.toLowerCase().includes(searchTerms.toLowerCase())
   ) 

   return (
      <section className="selecao-content">
         <SelecaoHeader data={data} setSearchTerms={setSearchTerms}/>
         <SelecaoGalerias data={filteredData}/>
      </section>
)
}