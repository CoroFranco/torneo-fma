import { useState } from "react";
import { Calendar, Copa } from "../components/Icons";
import Nav from "./Nav";
import { AnimatePresence } from "framer-motion";

export default function Header({children}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <header className="from-emerald-800 to-emerald-700 bg-gradient-to-r flex flex-col justify-center place-items-center py-5 text-white gap-2 w-full sticky top-0 shadow-xl z-40">
        <div className="flex place-items-center gap-4">
          <Copa color={'text-amber-400'}/>
          <h2 className="font-bold md:text-2xl text-xl">{children}</h2>
        </div>      
        <p className="font-medium md:text-lg text-md">Pasión y amistad en cada partido</p>
        <div className="flex place-items-center gap-1 bg-emerald-900 px-2 py-0.5 rounded-2xl">
          <Calendar />
          <span className="md:text-md text-sm">Edición 2025 - Inicia el 26 de Diciembre</span>
        </div>
        <button 
          onClick={toggleNav} 
          className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-10 w-10 fixed top-12 left-4 z-20 bg-white hover:bg-white text-emerald-800 border border-emerald-200 shadow-md hover:shadow-lg transition-all"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </header>

      <AnimatePresence>
        {isNavOpen && <Nav onClose={toggleNav} />}
      </AnimatePresence>
    </>
  );
}
