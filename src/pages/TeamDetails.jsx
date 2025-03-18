"use client"

import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { TeamsContext } from "../context/TeamsContext"
import Header from "../components/Header"
import { Trophy, Users, Shield, ChevronLeft, Edit, Trash2, UserPlus, Save } from "lucide-react"
import { motion } from "framer-motion"
import AddPlayerModal from "../components/AddPlayerModal"
import ConfirmationModal from "../components/ConfirmationModal"
import SuccessMessage from "../components/SuccessMessage"

export default function TeamDetails() {
  const { teamId } = useParams()
  const navigate = useNavigate()
  const { teams } = useContext(TeamsContext)

  // Estados básicos para la interfaz
  const [isEditing, setIsEditing] = useState(false)
  const [editedTeam, setEditedTeam] = useState({})
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false)
  const [isDeleteTeamModalOpen, setIsDeleteTeamModalOpen] = useState(false)
  const [playerToDelete, setPlayerToDelete] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect (() => {
    const timeOut = setTimeout(() => {
      setSuccessMessage(null)
    }, 3000);
  
      return () => clearTimeout(timeOut)
    }, [successMessage])

  // Encontrar el equipo actual
  const team = teams.find((t) => t.id.toString() === teamId?.toString())

  const onClose = () => {
    setIsAddPlayerModalOpen(false)
  }

  // Inicializar editedTeam cuando se carga el equipo
  useState(() => {
    if (team) {
      setEditedTeam(team)
    }
  }, [team])

  // Obtener color para la posición del jugador
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

  // Manejar cambios en el formulario de edición
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditedTeam({
      ...editedTeam,
      [name]: name === "titulos" ? Number.parseInt(value) : value,
    })
  }

  // Cancelar edición
  const cancelEdit = () => {
    setEditedTeam(team)
    setIsEditing(false)
  }

  // Confirmar eliminación de jugador
  const confirmDeletePlayer = (player) => {
    setPlayerToDelete(player)
  }

  // Si no hay equipo, mostrar mensaje
  if (!team) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Equipo no encontrado</h2>
          <p className="text-gray-600 mb-6">El equipo que buscas no existe o ha sido eliminado.</p>
          <button
            onClick={() => navigate("/teams")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Volver a la lista de equipos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <Header>Detalles del Equipo</Header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Botón de regreso */}
        <button
          onClick={() => navigate("/teams")}
          className="flex items-center text-emerald-700 hover:text-emerald-900 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span>Volver a equipos</span>
        </button>

        {/* Cabecera del equipo */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative h-64 bg-gradient-to-r from-emerald-700 to-emerald-600">
            {team.imagenUrl && (
              <img
                src={team.imagenUrl || "/placeholder.svg"}
                alt={team.nombre}
                className="w-full h-full object-cover opacity-40"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "/placeholder.svg?height=300&width=500"
                }}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {!isEditing ? (
              <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                <div>
                  <h1 className="text-white text-4xl font-bold mb-2">{team.nombre}</h1>
                  {team.directorTecnico && (
                    <p className="text-emerald-100 text-lg">
                      Director Técnico: <span className="font-medium text-white">{team.directorTecnico}</span>
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditedTeam(team)
                      setIsEditing(true)
                    }}
                    className="bg-white text-emerald-700 p-2 rounded-full hover:bg-emerald-50 transition-colors"
                    title="Editar equipo"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => setIsDeleteTeamModalOpen(true)}
                    className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Eliminar equipo"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Editar información del equipo</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Equipo</label>
                      <input
                        type="text"
                        name="nombre"
                        value={editedTeam.nombre || ""}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Director Técnico</label>
                      <input
                        type="text"
                        name="directorTecnico"
                        value={editedTeam.directorTecnico || ""}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Títulos</label>
                      <input
                        type="number"
                        name="titulos"
                        value={editedTeam.titulos || 0}
                        onChange={handleEditChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen</label>
                      <input
                        type="text"
                        name="imagenUrl"
                        value={editedTeam.imagenUrl || ""}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        // Aquí iría la lógica para guardar los cambios
                        setIsEditing(false)
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center"
                    >
                      <Save size={18} className="mr-1" />
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Estadísticas del equipo */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="rounded-full bg-amber-100 p-3 mr-4">
                  <Trophy className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Títulos</p>
                  <p className="text-2xl font-bold">{team.titulos}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="rounded-full bg-emerald-100 p-3 mr-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Jugadores</p>
                  <p className="text-2xl font-bold">{team.jugadores ? team.jugadores.length : 0}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="rounded-full bg-emerald-100 p-3 mr-4">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">ID del Equipo</p>
                  <p className="text-2xl font-bold">#{team.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {/* Sección de jugadores */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Plantilla de Jugadores</h2>
            <button
              onClick={() => setIsAddPlayerModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <UserPlus size={18} className="mr-2" />
              Agregar Jugador
            </button>
          </div>

          {team.jugadores && team.jugadores.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dorsal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posición
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edad
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {team.jugadores.map((player) => (
                    <motion.tr
                      key={player.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                          {player.dorsal}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{player.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPositionColor(player.posicion)}`}
                        >
                          {player.posicion}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.edad} años</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => confirmDeletePlayer(player)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">No hay jugadores</h3>
              <p className="text-gray-500 mb-4">Este equipo no tiene jugadores registrados.</p>
              <button
                onClick={() => setIsAddPlayerModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center"
              >
                <UserPlus size={18} className="mr-2" />
                Agregar Jugador
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal para agregar jugador */}
      <AddPlayerModal
        isOpen={isAddPlayerModalOpen}
        onClose={onClose}
        onSave={(message) => setSuccessMessage(message)}
      />

      {/* Modal para confirmar eliminación de jugador */}
      <ConfirmationModal
        isOpen={playerToDelete !== null}
        onClose={() => setPlayerToDelete(null)}
        onConfirm={() => {
          // Aquí iría la lógica para eliminar el jugador
          setPlayerToDelete(null)
        }}
        title="Eliminar Jugador"
        message={`¿Estás seguro de que deseas eliminar a ${playerToDelete?.nombre}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        confirmColor="red"
      />

      {/* Modal para confirmar eliminación de equipo */}
      <ConfirmationModal
        isOpen={isDeleteTeamModalOpen}
        onClose={() => setIsDeleteTeamModalOpen(false)}
        onConfirm={() => {
          // Aquí iría la lógica para eliminar el equipo
          setIsDeleteTeamModalOpen(false)
          navigate("/teams")
        }}
        title="Eliminar Equipo"
        message={`¿Estás seguro de que deseas eliminar el equipo ${team.nombre} y todos sus jugadores? Esta acción no se puede deshacer.`}
        confirmText="Eliminar Equipo"
        confirmColor="red"
      />
    </div>
  )
}

