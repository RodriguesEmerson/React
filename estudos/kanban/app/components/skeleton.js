export default function Skeleton(){
   return (
      <section className={`flex flex-row items-start ml-2  pt-[68px] p-2 gap-3`}>
         <div className="w-[270px]  bg-gray-100 shadow-4xl p-2 rounded-xl pt-3">
            <div className="w-28 h-7 bg-gray-300 rounded-md mb-2 animate-pulse-skeleton"></div>
            <div className="w-full h-32 bg-gray-300 rounded-md mb-1 animate-pulse-skeleton"></div>
            <div className="w-full h-56 bg-gray-300 rounded-md mb-1 animate-pulse-skeleton"></div>
            <div className="w-36 h-8 bg-gray-300 rounded-md mb-1 animate-pulse-skeleton"></div>
         </div>
         <div className="w-[270px]  bg-gray-100 shadow-4xl p-2 rounded-xl pt-3">
            <div className="w-28 h-7 bg-gray-300 rounded-md mb-2 animate-pulse-skeleton"></div>
            <div className="w-full h-32 bg-gray-300 rounded-md mb-1 animate-pulse-skeleton"></div>
            <div className="w-36 h-8 bg-gray-300 rounded-md mb-1 animate-pulse-skeleton"></div>
         </div>
         <div className="w-[270px]  bg-gray-100 shadow-4xl p-2 rounded-xl pt-3">
            <div className="w-28 h-7 bg-gray-300 rounded-md mb-2 animate-pulse-skeleton"></div>
            <div className="w-full h-56 bg-gray-300 rounded-md mb-1 animate-pulse-skeleton"></div>
            <div className="w-full h-32 bg-gray-300 rounded-md mb-1 animate-pulse-skeleton"></div>
            <div className="w-36 h-8 bg-gray-300 rounded-md mb-1 animate-pulse-skeleton-skeleton"></div>
         </div>
         <div className="w-[270px] h-9 flex items-center justify-center  bg-gray-100 shadow-4xl p-1 rounded-xl ">
            <div className="w-2/3 h-5 bg-gray-300 rounded-md animate-pulse-skeleton"></div>
         </div>
      </section>
   )
}