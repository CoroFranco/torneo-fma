import { useState } from "react"
import { Trophy, Users, ChevronDown, ChevronUp, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export default function TeamCard({ team }) {
  const { id, nombre, directorTecnico, titulos, imagenUrl, jugadores } = team
  const [showPlayers, setShowPlayers] = useState(false)

  // Generar un color de fondo aleatorio pero consistente basado en el nombre del equipo
  const getBackgroundPattern = (name) => {
    const patterns = [
      "bg-gradient-to-br from-emerald-700 to-emerald-900",
      "bg-gradient-to-br from-emerald-600 to-emerald-800",
      "bg-gradient-to-br from-emerald-800 to-emerald-950",
    ]
    const index = name.length % patterns.length
    return patterns[index]
  }

  // Obtener el color para la posición del jugador
  const getPositionColor = (position) => {
    switch (position) {
      case "PORTERO":
        return "bg-blue-100 text-blue-800"
      case "DEFENSA":
        return "bg-green-100 text-green-800"
      case "MEDIOCAMPISTA":
        return "bg-yellow-100 text-yellow-800"
      case "DELANTERO":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {/* Cabecera con imagen */}
      <div className={`${getBackgroundPattern(nombre)} relative h-48 overflow-hidden`}>
        {imagenUrl && (
          <img
            src={imagenUrl || "/placeholder.svg"}
            alt={nombre}
            className="w-full h-full object-cover opacity-40"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "/placeholder.svg?height=300&width=500"
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-white text-3xl font-bold mb-1">{nombre}</h2>
              {directorTecnico && (
                <p className="text-emerald-100 text-sm">
                  Director Técnico: <span className="font-medium text-white">{directorTecnico}</span>
                </p>
              )}
            </div>

            {/* Insignia de títulos */}
            {titulos > 0 && (
              <div className="bg-amber-500 text-white px-3 py-1 rounded-full flex items-center shadow-md">
                <Trophy className="h-4 w-4 mr-1" />
                <span className="text-sm font-bold">
                  {titulos} {titulos === 1 ? "Título" : "Títulos"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Información del equipo */}
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-emerald-600 mr-2" />
            <h3 className="font-bold text-lg">{nombre}</h3>
          </div>

          <div className="flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{jugadores.length} jugadores</span>
          </div>
        </div>

        {/* Botón para mostrar/ocultar jugadores */}
        <button
          onClick={() => setShowPlayers(!showPlayers)}
          className="cursor-pointer w-full py-2 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition-colors flex items-center justify-between mb-4"
        >
          <span className="font-medium">Plantilla de jugadores</span>
          {showPlayers ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>

        {/* Lista de jugadores (expandible) */}
        <AnimatePresence>
          {showPlayers && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">Jugadores</h4>

                {jugadores.length > 0 ? (
                  <ul className="space-y-2">
                    {jugadores.map((jugador) => (
                      <motion.li
                        key={jugador.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center">
                          <div className="bg-emerald-100 text-emerald-800 w-7 h-7 rounded-full flex items-center justify-center mr-3 font-bold text-sm">
                            {jugador.dorsal}
                          </div>
                          <div>
                            <p className="font-medium">{jugador.nombre}</p>
                            <p className="text-gray-500 text-xs">{jugador.edad} años</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPositionColor(jugador.posicion)}`}>
                          {jugador.posicion}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">No hay jugadores registrados</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botón de acción */}
      <div className="px-6 pb-6 mt-auto">
        <Link
        to={`/team/${id}`}
        >
          <button className="cursor-pointer w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center">
          <span className="mr-2">Ver detalles</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
          </button>
          
        </Link>
      </div>
    </div>
  )
}

