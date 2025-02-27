import { Link } from "react-router-dom";

export default function GeneralInfo () {
  return (
    <section className="max-w-[95%] mx-auto my-10 rounded-xl flex flex-col overflow-hidden text-white shadow-xl">
        <header className="from-emerald-600 to-emerald-800 bg-gradient-to-l w-full flex flex-col place-items-center py-14 gap-6 px-10">
          <span className="bg-amber-500 px-2 py-0.5 text-sm font-bold rounded-2xl">Edición 2025</span>
          <h2 className="md:text-4xl font-bold">Copa de Fútbol Más Que Amigos</h2>
          <p className="text-center">Un torneo donde la pasión por el fútbol se une con la amistad para crear momentos inolvidables en cada partido.</p>
          <div>
            <ul className="flex md:flex-row flex-col text-black gap-5">
              <li className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-white text-emerald-800 hover:bg-emerald-100 cursor-pointer duration-300">
              <Link to='/'>Ver equipos</Link>
              </li>
              <li className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-white text-emerald-800 hover:bg-emerald-100 cursor-pointer  duration-300">
              <Link to='/'>Calendario</Link>
              </li>
            </ul>      
          </div>
        </header>
        <footer className="grid grid-cols-2 bg-white last-of-type:border-0">
          <div className="text-black flex flex-col place-items-center justify-center gap-2 border-r-1 border-r-gray-300 py-10 ">
            <span className="font-bold text-4xl">0</span>
            <p className="font-light">Equipos</p>
          </div>
          <div className="text-black flex flex-col place-items-center justify-center gap-2">
            <span className="font-bold text-4xl">0</span>
            <p className="font-light">Jugadores</p>
          </div>
        </footer>
      </section>
  )
}
