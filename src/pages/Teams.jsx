"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import TeamCard from "../components/TeamCard"
import AddTeamModal from "../components/AddTeamModal"
import { Search, Filter, Trophy, Users } from "lucide-react"
import { motion } from "framer-motion"

// Datos de ejemplo basados en la estructura proporcionada
const teamsData = [
  {
    id: 1,
    nombre: "Cali",
    directorTecnico: "Pecoso",
    imagenUrl: "/placeholder.svg?height=300&width=500",
    titulos: 10,
    idTorneo: 0,
    indicadorRespuesta: "Success",
    mensaje: "",
    jugadores: [
      {
        id: 1,
        nombre: "Alex",
        posicion: "DELANTERO",
        edad: 26,
        dorsal: 11,
        indicadorRespuesta: null,
        mensaje: null,
      },
      {
        id: 2,
        nombre: "Carlos",
        posicion: "MEDIOCAMPISTA",
        edad: 24,
        dorsal: 8,
        indicadorRespuesta: null,
        mensaje: null,
      },
    ],
  },
  {
    id: 2,
    nombre: "América",
    directorTecnico: "Jorge Luis",
    imagenUrl: "/placeholder.svg?height=300&width=500",
    titulos: 15,
    idTorneo: 0,
    indicadorRespuesta: "Success",
    mensaje: "",
    jugadores: [
      {
        id: 3,
        nombre: "Martín",
        posicion: "PORTERO",
        edad: 29,
        dorsal: 1,
        indicadorRespuesta: null,
        mensaje: null,
      },
      {
        id: 4,
        nombre: "Roberto",
        posicion: "DEFENSA",
        edad: 27,
        dorsal: 4,
        indicadorRespuesta: null,
        mensaje: null,
      },
    ],
  },
  {
    id: 3,
    nombre: "Nacional",
    directorTecnico: "Alejandro",
    imagenUrl: "/placeholder.svg?height=300&width=500",
    titulos: 8,
    idTorneo: 0,
    indicadorRespuesta: "Success",
    mensaje: "",
    jugadores: [
      {
        id: 5,
        nombre: "Diego",
        posicion: "DELANTERO",
        edad: 23,
        dorsal: 9,
        indicadorRespuesta: null,
        mensaje: null,
      },
    ],
  },
  {
    id: 4,
    nombre: "Millonarios",
    directorTecnico: "Alberto",
    imagenUrl: "/placeholder.svg?height=300&width=500",
    titulos: 12,
    idTorneo: 0,
    indicadorRespuesta: "Success",
    mensaje: "",
    jugadores: [
      {
        id: 6,
        nombre: "Juan",
        posicion: "MEDIOCAMPISTA",
        edad: 25,
        dorsal: 10,
        indicadorRespuesta: null,
        mensaje: null,
      },
    ],
  },
  {
    id: 5,
    nombre: "Junior",
    directorTecnico: "Hernán",
    imagenUrl: "/placeholder.svg?height=300&width=500",
    titulos: 6,
    idTorneo: 0,
    indicadorRespuesta: "Success",
    mensaje: "",
    jugadores: [
      {
        id: 7,
        nombre: "Luis",
        posicion: "DEFENSA",
        edad: 28,
        dorsal: 2,
        indicadorRespuesta: null,
        mensaje: null,
      },
    ],
  },
  {
    id: 6,
    nombre: "Santa Fe",
    directorTecnico: "Eduardo",
    imagenUrl: "/placeholder.svg?height=300&width=500",
    titulos: 9,
    idTorneo: 0,
    indicadorRespuesta: "Success",
    mensaje: "",
    jugadores: [
      {
        id: 8,
        nombre: "Pedro",
        posicion: "PORTERO",
        edad: 30,
        dorsal: 1,
        indicadorRespuesta: null,
        mensaje: null,
      },
    ],
  },
]

export default function Teams() {
  const [teams, setTeams] = useState(teamsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("todos")
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Filtrar equipos
  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.directorTecnico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.jugadores.some((jugador) => jugador.nombre.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filterBy === "todos") return matchesSearch
    if (filterBy === "conTitulos") return matchesSearch && team.titulos > 0
    if (filterBy === "sinTitulos") return matchesSearch && team.titulos === 0

    return matchesSearch
  })

  // Manejar guardado de nuevo equipo
  const handleSaveTeam = (newTeam) => {
    const teamWithId = {
      ...newTeam,
      id: teams.length + 1,
      idTorneo: 0,
      indicadorRespuesta: "Success",
      mensaje: "",
    }

    setTeams([...teams, teamWithId])
  }

  // Animación para los elementos
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  // Calcular estadísticas
  const totalTitulos = teams.reduce((total, team) => total + team.titulos, 0)
  const totalJugadores = teams.reduce((total, team) => total + team.jugadores.length, 0)

  return (
    <div className="min-h-screen bg-emerald-50">
      <Header>Equipos</Header>

      {/* Hero section */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Nuestros Equipos</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Conoce a los protagonistas de nuestra liga. Equipos llenos de pasión, talento y espíritu deportivo que hacen
            de cada partido una experiencia única.
          </p>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Listado de Equipos</h2>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Agregar Equipo
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre, DT o jugador..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <div className="flex items-center bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg">
              <Filter size={18} className="mr-2" />
              <span className="text-sm font-medium">Filtrar:</span>
            </div>

            <select
              className="bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="todos">Todos los equipos</option>
              <option value="conTitulos">Con títulos</option>
              <option value="sinTitulos">Sin títulos</option>
            </select>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="rounded-full bg-emerald-100 p-3 mr-4">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total de Equipos</p>
              <p className="text-2xl font-bold">{teams.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="rounded-full bg-amber-100 p-3 mr-4">
              <Trophy className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Títulos Totales</p>
              <p className="text-2xl font-bold">{totalTitulos}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="rounded-full bg-emerald-100 p-3 mr-4">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Jugadores</p>
              <p className="text-2xl font-bold">{totalJugadores}</p>
            </div>
          </div>
        </div>

        {/* Lista de equipos */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        ) : filteredTeams.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredTeams.map((team) => (
              <motion.div key={team.id} variants={item}>
                <TeamCard team={team} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                <Search className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">No se encontraron equipos</h3>
              <p className="text-gray-500 mb-4">
                No hay equipos que coincidan con tu búsqueda. Intenta con otros términos.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setFilterBy("todos")
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Ver todos los equipos
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Botón flotante para agregar equipo (visible en móviles) */}
      <div className="fixed bottom-6 right-6 md:hidden z-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105"
          aria-label="Agregar equipo"
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
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Modal para agregar equipo */}
      <AddTeamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveTeam} />
    </div>
  )
}

