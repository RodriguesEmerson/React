import Card from "./Card";

export default function List() {
   return (
      <div key={1} className="w-72 bg-gray-100 shadow-4xl p-3 rounded-sm text-sm">
         <h2 className="mb-3 text-xl font-bold">To do</h2>
         <div>
            <Card />
         </div>
         <div className="flex items-center w-fit p-1 hover:text-blue-900 transition-all cursor-pointer">
            <span className="material-icons">add</span>
            <p>Criar novo Card</p>
         </div>
      </div>
   );
}