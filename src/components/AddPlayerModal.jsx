"use client"

import { useContext, useState } from "react"
import { X } from "lucide-react"
import { TeamsContext } from "../context/TeamsContext"
import { useParams } from "react-router-dom"

export default function AddPlayerModal({ isOpen, onClose, onSave }) {
  const {teamId} = useParams()
  const {savePlayer} = useContext(TeamsContext)

  const [playerData, setPlayerData] = useState({
    nombre: "",
    posicion: "DELANTERO",
    edad: 18,
    dorsal: 1,
    idEquipo: teamId
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setPlayerData({
      ...playerData,
      [name]: name === "edad" || name === "dorsal" ? Number.parseInt(value) : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const savedData = await savePlayer(playerData);
      onSave(savedData.mensaje)
      onClose();
      setPlayerData({
        nombre: "",
        posicion: "DELANTERO",
        edad: 18,
        dorsal: 1,
        idEquipo: teamId,
      });
    } catch (error) {
      console.error("Error al guardar el jugador:", error);
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Agregar Nuevo Jugador</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Jugador *</label>
              <input
                type="text"
                name="nombre"
                value={playerData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
              <select
                name="posicion"
                value={playerData.posicion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="PORTERO">Portero</option>
                <option value="DEFENSA">Defensa</option>
                <option value="MEDIOCAMPISTA">Mediocampista</option>
                <option value="DELANTERO">Delantero</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                <input
                  type="number"
                  name="edad"
                  value={playerData.edad}
                  onChange={handleChange}
                  min="15"
                  max="50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dorsal</label>
                <input
                  type="number"
                  name="dorsal"
                  value={playerData.dorsal}
                  onChange={handleChange}
                  min="1"
                  max="99"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              Guardar Jugador
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

