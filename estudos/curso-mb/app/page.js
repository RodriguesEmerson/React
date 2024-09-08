import Image from "next/image";
import './style/home.css'
import Banner from './components/container/banner/banner'
import SubNav from './components/container/subNav/subNav'

export default function Home() {
   return (
      <>
         <main className="container">
            <span className="page-title">INÍCIO</span>
            <Banner />
            <SubNav />
         </main>
         <footer className="footer">

         </footer>
      </>
   );
}
