'use client';

import SelecaoHeader from './selecao-header/selecao-header';
import SelecaoGalerias from './selecao-galerias/selecao-galerias'
import { useState, useEffect } from 'react';

export default function SelecaoCotent({ data }){ 

   //'Seta' os carecteres do campo de pesquisa em *searchTerms*.
   const [searchTerms, setSearchTerms] = useState('');

   //Ordena os dados de *data* em ordem alfabética em um novo array.
   const filteredDataOrdemAlfCres = [...data].sort((a, b) =>{
      return a.titulo.localeCompare(b.titulo);
   })
   //Ordena os dados de *data* em ordem alfabética decrescente em um novo array.
   const filteredDataOrdemAlfDecr = [...data].sort((a, b) =>{
      return b.titulo.localeCompare(a.titulo);
   })
   //Apenas reverte os dados da db.json(data).
   const filteredDataMaisAntigos = [...data].reverse();

   //Filtra pelo status(situação) da galeria.
   const  [fStatus, setFStatus] = useState(['Finalizada', 'Pendente',  'Expirada']);
   
   //A ordem por padrão será ordem por data de criação, que é a do próprio db.json.
   //Ela assumirá o valor de um dos filtros acima.
   const [ordem, setOrdem] = useState(data);


   //Filtra *ordem* com os carecteres de searchTerms.
   const filteredData = ordem.filter(item => 
      item.titulo.toLowerCase().includes(searchTerms.toLowerCase())
   )

   //Inclui todos os filtros
   const filteredDataComplete = [...filteredData].filter(item =>{
      if(item.situacao.includes(fStatus[0]) || 
         item.situacao.includes(fStatus[1]) || 
         item.situacao.includes(fStatus[2])){
         return item;
      }
   }
      
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
            fStatus={fStatus}
            setFStatus={setFStatus}
         />
         <SelecaoGalerias data={filteredDataComplete}/>
      </section>
   )
}