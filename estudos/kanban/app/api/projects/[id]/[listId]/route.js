import { NextResponse } from "next/server";

export async function POST(request, { params }) {
   const projectId = params.id;
   const listId = params.listId;
   const card = await request.json();
   const { searchParams } = new URL(request.url);
   const index = searchParams.get('index');

   try {
      //Busca os dados
      const db = await fetch(`http://localhost:3000/db/db.json`, {
         method: 'GET',
         cache: 'no-store' //impede dados antigos
      });

      //Lanca um erro caso não encontre os dados.
      if (!db.ok) throw new Error('Falha ao buscar os dados.');

      const data = await db.json();

      //Encontra o projeto que está aberto passado pelo parametro.
      const project = data.projects.find(proj => proj.id == projectId);
      if (!project) {
         return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
      }
      
      //Encontra a lista que será adicionda o novo card.
      const list = project.lists.find(list => list.id == listId);
      if (!list) {
         return NextResponse.json({ error: 'Lista não encontrada' }, { status: 404 });
      }
      
      //Adicionda o novo card na lista.
      list.cards = [
               ...list.cards.slice(0, index - 1),  // itens antes do índice
               card,                               // o novo item a ser inserido
               ...list.cards.slice(index - 1)      // itens após o índice
            ];

      //Retorna uma mensagem de confirmação de criação do card.
      return NextResponse.json({ ok: 'Card criado' }, { status: 201 });

   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}