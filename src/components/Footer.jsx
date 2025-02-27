import { Copa } from "./Icons";

export default function Footer () {
  return (
    <footer className="w-full bg-amber-500 py-4 px-4 flex flex-col place-items-center justify-center gap-5 text-white">
      <div className="w-full border-b-1 border-b-white/50">
      <div className="flex place-items-center justify-center gap-2 font-bold text-xl">
        <Copa />
        <h3>Copa Más Que Amigos</h3>
      </div>
      <p className="text-center font-light">Un torneo donde la pasión por el fútbol se une con la amistad para crear momentos inolvidables.</p>
      </div>
      <div>
      Patrocinadores Oficiales: <span className="font-bold">Empresa 1, Empresa 2, Empresa 3</span>
      </div>
    </footer>
  )
}
