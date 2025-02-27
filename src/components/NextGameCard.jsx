import { Calendar } from "./Icons";

export default function NextGameCard () {
  return (
    <li className='flex md:flex-row flex-col w-full justify-between bg-white py-2 px-4 rounded-2xl shadow-xl'>
          <div className='flex place-items-center justify-evenly w-full border-r-1 border-r-slate-200 py-4'>
            <h3 className='font-bold text-xl'>Equipo 1</h3>
            <span className='text-white bg-amber-500 p-4 rounded-2xl font-bold'> VS </span>
            <h3 className='font-bold text-xl'>Equipo 2</h3>
          </div>
          <div className='flex md:flex-row flex-col gap-3 place-items-start justify-evenly w-full md:place-items-center'>
            <div className='flex place-items-center'>
            <Calendar/>
            <p>26 Dic, 18:00</p>
            </div>
            <p>Estadio Central
            </p>
            <button className="inline-flex w-full md:w-auto  items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-9 rounded-md px-3 mt-2 md:mt-0 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 cursor-pointer">Detalles</button>
          </div>
        </li>
  )
}
