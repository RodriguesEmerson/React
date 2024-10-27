import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
   const projectId = params.id;
   const {listId, cardId} = params;

   try {
      const db = await fetch(`http://localhost:3000/db/db.json`, {
         method: 'GET',
         cache: 'no-store' //impede dados antigos
      });

      if (!db.ok) throw new Error('Falha ao buscar os dados.');

      const data = await db.json();
      const project = data.projects.find(proj => proj.id == projectId);

      if (!project) {
         return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
      }

      //Encontra a lista que será adicionda o novo card.
      const list = project.lists.find(list => list.id == listId);
      if (!list) {
         return NextResponse.json({ error: 'Lista não encontrada' }, { status: 404 });
      }

      list.cards = list.cards.filter(card=> card.id != cardId);

      return NextResponse.json(null,{status: 200});

   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}