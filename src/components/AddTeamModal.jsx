import { useState, useContext, useEffect } from "react"
import { X, Upload, Plus, Trash2 } from "lucide-react"
import { TeamsContext } from "../context/TeamsContext"
import ErrorMessage from "./ErrorMessage"
// Ajusta la ruta según tu estructura de proyecto

export default function AddTeamModal({ isOpen, onClose, onSave }) {
  const { saveTeam, isLoading: contextLoading } = useContext(TeamsContext)
  
  const [teamData, setTeamData] = useState({
    nombre: "",
    directorTecnico: "",
    titulos: 0,
    imagenUrl: "",
    jugadores: [] // Inicializar el array de jugadores
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saveProgress, setSaveProgress] = useState(0)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setError(null)
    }, 3000);

    return () => clearTimeout(timeOut)
  }, [error])

  const [newPlayer, setNewPlayer] = useState({
    nombre: "",
    posicion: "DELANTERO",
    edad: 18,
    dorsal: 1,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTeamData({
      ...teamData,
      [name]: value,
    })
  }

  const handlePlayerChange = (e) => {
    const { name, value } = e.target
    setNewPlayer({
      ...newPlayer,
      [name]: name === "edad" || name === "dorsal" ? Number.parseInt(value) : value,
    })
  }

  const addPlayer = () => {
    if (!newPlayer.nombre) return

    setTeamData({
      ...teamData,
      jugadores: [
        ...teamData.jugadores,
        {
          ...newPlayer,
          id: Date.now(), // Temporal ID
        },
      ],
    })

    // Reset form
    setNewPlayer({
      nombre: "",
      posicion: "DELANTERO",
      edad: 18,
      dorsal: 1,
    })
  }

  const removePlayer = (playerId) => {
    setTeamData({
      ...teamData,
      jugadores: teamData.jugadores.filter((player) => player.id !== playerId),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar datos antes de enviar
    if (!teamData.nombre.trim()) {
      setError("El nombre del equipo es obligatorio")
      return
    }

    setIsLoading(true)
    setError(null)
    setSaveProgress(10)

    try {
      // Usar la función del contexto para guardar el equipo
      const savedData = await saveTeam(teamData)
      setSaveProgress(100)
      onSave(savedData.mensaje || "Equipo guardado exitosamente")
      onClose()
    } catch (err) {
      setError(err.message || "Ocurrió un error al guardar los datos")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  // El resto del componente se mantiene igual
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Agregar Nuevo Equipo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <ErrorMessage className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </ErrorMessage>
          )}
          
          {isLoading && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${saveProgress}%` }}></div>
              </div>
              <p className="text-sm text-gray-500">Guardando datos {saveProgress}%</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Equipo *</label>
              <input
              style={{lineHeight: '20px'}}
                type="text"
                name="nombre"
                value={teamData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="Nombre del equipo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Director Técnico</label>
              <input
                type="text"
                name="directorTecnico"
                value={teamData.directorTecnico}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="Nombre del DT"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número de Títulos</label>
              <input
                type="number"
                name="titulos"
                value={teamData.titulos}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen</label>
              <div className="flex">
                <input
                  type="text"
                  name="imagenUrl"
                  value={teamData.imagenUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 px-4 rounded-r-lg border border-l-0 border-gray-300"
                >
                  <Upload size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Sección de jugadores */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Jugadores del Equipo</h3>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Jugador</label>
                  <input
                    type="text"
                    name="nombre"
                    value={newPlayer.nombre}
                    onChange={handlePlayerChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Nombre del jugador"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
                  <select
                    name="posicion"
                    value={newPlayer.posicion}
                    onChange={handlePlayerChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  >
                    <option value="PORTERO">Portero</option>
                    <option value="DEFENSA">Defensa</option>
                    <option value="MEDIOCAMPISTA">Mediocampista</option>
                    <option value="DELANTERO">Delantero</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                    <input
                      type="number"
                      name="edad"
                      value={newPlayer.edad}
                      onChange={handlePlayerChange}
                      min="15"
                      max="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dorsal</label>
                    <input
                      type="number"
                      name="dorsal"
                      value={newPlayer.dorsal}
                      onChange={handlePlayerChange}
                      min="1"
                      max="99"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={addPlayer}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center"
                disabled={isLoading}
              >
                <Plus size={18} className="mr-2" />
                Agregar Jugador
              </button>
            </div>

            {/* Lista de jugadores agregados */}
            {teamData.jugadores?.length > 0 ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posición
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edad
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dorsal
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teamData.jugadores.map((player) => (
                      <tr key={player.id}>
                        <td className="px-4 py-3 whitespace-nowrap">{player.nombre}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              player.posicion === "PORTERO"
                                ? "bg-blue-100 text-blue-800"
                                : player.posicion === "DEFENSA"
                                  ? "bg-green-100 text-green-800"
                                  : player.posicion === "MEDIOCAMPISTA"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {player.posicion}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{player.edad} años</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                            {player.dorsal}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <button
                            type="button"
                            onClick={() => removePlayer(player.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={isLoading}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No hay jugadores agregados</p>
                <p className="text-sm text-gray-400">Agrega jugadores usando el formulario de arriba</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                "Guardar Equipo"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
