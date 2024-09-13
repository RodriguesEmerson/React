'use client';

import SelecaoHeader from './selecao-header/selecao-header';
import SelecaoGalerias from './selecao-galerias/selecao-galerias'
import { useState } from 'react';

export default function SelecaoCotent({ data }){

   //'Seta' os carecteres do campo de pesquisa em *searchTerms*.
   const [searchTerms, setSearchTerms] = useState('');

   //Ordena os dados de *filteredData* em ordem alfabética em um novo array.
   const filteredDataOrdemAlfCres = [...data].sort((a, b) =>{
      return a.titulo.localeCompare(b.titulo);
   })
   //Ordena os dados de *filteredData* em ordem alfabética decrescente em um novo array.
   const filteredDataOrdemAlfDecr = [...data].sort((a, b) =>{
      return b.titulo.localeCompare(a.titulo);
   })
   //Apenas reverte os dados da db.json.
   const filteredDataMaisAntigos = [...data].reverse();
   
   //A ordem por padrão será ordem por data de criação, que é a do próprio db.json.
   const [ordem, setOrdem] = useState(data);

   //Filtra *data* com os carecteres de searchTerms.
   const filteredData = ordem.filter(item => 
      item.titulo.toLowerCase().includes(searchTerms.toLowerCase())
   )

   return (
      <section className="selecao-content">
         {/*Trás os caracteres da pesquisa do campo de busca em SelecaoHeader e atualiza 'searchTerms'
            que por sua vez execulta filtered data com os dados recebidos.*/}
         <SelecaoHeader 
            data={data} 
            setSearchTerms={setSearchTerms} 
            setOrdem={setOrdem}
            filteredDataOrdemAlfCres={filteredDataOrdemAlfCres}
            filteredDataOrdemAlfDecr={filteredDataOrdemAlfDecr}
            filteredDataMaisAntigos={filteredDataMaisAntigos}
         />
         <SelecaoGalerias data={filteredData}/>
      </section>
)
}