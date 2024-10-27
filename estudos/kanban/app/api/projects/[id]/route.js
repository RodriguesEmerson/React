import { NextResponse } from "next/server";

export async function GET(request, { params }) {
   const { id } = params;
   try {

      const res = await fetch(`http://localhost:3000/db/db.json`, {
         method: 'GET',
         cache: 'no-store' //impede dados antigos
      });

      if (!res.ok) throw new Error('Falha ao buscar os dados.');

      const data = await res.json();
      const project = data.projects.find(proj => proj.id == id);

      if (!project) {
         return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
      }
      return NextResponse.json(project);

   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}

export async function POST(request, { params }) {
   const projectId = params.id;
   const newList = await request.json();

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

      project.lists.push(newList);
      console.log(project);
      return NextResponse.json({ ok: 'Lista criada' }, { status: 201 });


   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }

}