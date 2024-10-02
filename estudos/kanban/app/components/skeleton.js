export default function Skeleton(){
   return (
      <section className={`flex flex-row items-start m-auto p-2 gap-3`}>
         <div className="w-72  bg-gray-100 shadow-4xl p-1 rounded-sm ">
            <div className="w-28 h-7 bg-gray-200 rounded-md mb-2 animate-pulse dark:bg-gray-400"></div>
            <div className="w-full h-32 bg-gray-200 rounded-md mb-1 animate-pulse dark:bg-gray-400"></div>
            <div className="w-full h-56 bg-gray-200 rounded-md mb-1 animate-pulse dark:bg-gray-400"></div>
            <div className="w-36 h-8 bg-gray-200 rounded-md mb-1 animate-pulse dark:bg-gray-400"></div>
         </div>
         <div className="w-72  bg-gray-100 shadow-4xl p-1 rounded-sm ">
            <div className="w-28 h-7 bg-gray-200 rounded-md mb-2 animate-pulse dark:bg-gray-400"></div>
            <div className="w-full h-32 bg-gray-200 rounded-md mb-1 animate-pulse dark:bg-gray-400"></div>
            <div className="w-36 h-8 bg-gray-200 rounded-md mb-1 animate-pulse dark:bg-gray-400"></div>
         </div>
         <div className="w-72  bg-gray-100 shadow-4xl p-1 rounded-sm ">
            <div className="w-28 h-7 bg-gray-200 rounded-md mb-2 animate-pulse dark:bg-gray-400"></div>
            <div className="w-full h-56 bg-gray-200 rounded-md mb-1 animate-pulse dark:bg-gray-400"></div>
            <div className="w-full h-32 bg-gray-200 rounded-md mb-1 animate-pulse dark:bg-gray-400"></div>
            <div className="w-36 h-8 bg-gray-200 rounded-md mb-1 animate-pulse dark:bg-gray-400"></div>
         </div>
      </section>
   )
}