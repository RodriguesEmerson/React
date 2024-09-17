export default function Card() {
   return (
      <div className=" flex flex-col gap-1 w-full shadow-4xl rounded bg-white p-2 relative mb-2" >
         <div>
            <img></img>
         </div>
         <div className="flex flex-row h-4">
            <Labels />
         </div>
         <div>
            <p>Conteúdo do Card</p>
         </div>
         <div className="flex flex-row gap-2 text-sm text-gray-500">
            <div className="flex flex-row items-center gap-1">
               <span className="material-icons">chat</span>
               <p>3</p>
            </div>
            <div className="flex flex-row items-center gap-1">
               <span className="material-icons">schedule</span>
               <p>17 de Setembro</p>
            </div>
            <div className="flex flex-row absolute right-2 bottom-1">
               <Profile />
            </div>
         </div>
      </div>
   );
}

function Labels({ labelsList }) {
   return(
      <span className="w-14 h-10px bg-green-600 rounded-lg">
      </span>
   )
}7
function Profile({ image }) {
   return(
      <div className="h-7 w-7 rounded-full bg-gray-600"><img src="/images/profile-1.png" className="max-w-full object-cover"></img></div>
   )
}