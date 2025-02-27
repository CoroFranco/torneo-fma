import { motion } from "framer-motion"
import { useState } from "react"
import { Copa, HomeIcon, TrophyIcon, Calendar, UsersIcon, StatsIcon, CloseIcon } from "./Icons"

export default function Nav({ onClose }) {
  const [activeItem, setActiveItem] = useState("inicio")

  const menuItems = [
    { id: "inicio", icon: <HomeIcon />, text: "Inicio", href: "/" },
    { id: "equipos", icon: <TrophyIcon />, text: "Equipos", href: "/" },
    { id: "calendario", icon: <Calendar />, text: "Calendario", href: "/" },
    { id: "jugadores", icon: <UsersIcon />, text: "Jugadores", href: "/" },
    { id: "estadisticas", icon: <StatsIcon />, text: "Estadísticas", href: "/" },
  ]

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.aside
        className="bg-gradient-to-b from-slate-900 to-slate-800 fixed top-0 left-0 h-screen w-72 shadow-xl z-50 flex flex-col"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 100,
        }}
      >
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-700 p-2 rounded-lg">
              <Copa />
            </div>
            <div>
              <h2 className="text-white font-bold">MÁS QUE AMIGOS</h2>
              <p className="text-xs text-slate-400">Copa de Fútbol 2025</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6">
          <div className="px-4 mb-2">
            <p className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Navegación</p>
          </div>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${
                      activeItem === item.id
                        ? "bg-emerald-700/20 text-emerald-500"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                  onClick={() => {
                    setActiveItem(item.id)
                  }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                  {activeItem === item.id && <div className="ml-auto w-1.5 h-5 bg-emerald-500 rounded-full" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <p className="text-sm text-slate-300 mb-2">¿Necesitas ayuda?</p>
            <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
              Contactar
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

