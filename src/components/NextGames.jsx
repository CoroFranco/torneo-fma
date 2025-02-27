import { Link } from "react-router-dom";
import { Calendar, RightArrow } from "./Icons";
import NextGameCard from "./NextGameCard";

export default function NextGames () {
  return (
    <section className='w-[95%] mx-auto my-6'>
    <div className ='text-emerald-600 flex place-items-center w-full justify-between'>
        <div className='flex place-items-center gap-2 '>
        <Calendar />
      <h2 className="text-black font-bold text-2xl" >Próximos Partidos</h2>
        </div>
        <div className='flex place-items-center gap-2'>
          <Link to='/'> Calendario completo </Link>
          <RightArrow/>
        </div>
      </div>
      <ul className='flex flex-col place-content-center justify-center my-2 py-6 gap-6'>
        <NextGameCard />
        <NextGameCard />
        <NextGameCard />
        <NextGameCard />
      </ul>
    </section>
  )
}
