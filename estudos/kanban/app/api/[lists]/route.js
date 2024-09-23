import { NextResponse } from "next/server";

export async function GET( request ) {

   const { searchParams } = new URL(request.url);
   const project = searchParams.get('project');
   
   try{
      const res = await fetch(`http://localhost:3000/db/db.json`);
      const data = await res.json();

      if(!res.ok) throw new Error('Falha ao buscar os dados.')
   
      return NextResponse.json({ data });
   }catch(error){
      return NextResponse.json({error: error.mensage}, {status: 500});
   }
}