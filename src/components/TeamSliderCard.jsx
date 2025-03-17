"use client"

import { Trophy } from "lucide-react"
import comark from "../assets/comark.jpg"

export default function TeamSliderCard({ team }) {
  const { nombre, directorTecnico, titulos } = team

  return (
    <div className="embla__slide">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100   mx-auto">
        {/* Imagen de cabecera más grande */}
        <div className="relative h-[280px] w-full">
          <img className="w-full h-full" src={comark || "/placeholder.svg"} alt={`Equipo ${nombre}`} />
          {/* Overlay con gradiente para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Nombre del equipo */}
          <div className="absolute bottom-0 left-0 w-full p-6">
            <h2 className="text-white font-bold text-4xl drop-shadow-md mb-2">{nombre}</h2>
            {directorTecnico && (
              <p className="text-white/90 text-lg">
                DT: <span className="font-semibold">{directorTecnico}</span>
              </p>
            )}
          </div>
        </div>

        {/* Sección de títulos */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-amber-500" />
            <h3 className="text-xl font-bold">Títulos</h3>
          </div>

          {titulos && titulos.length > 0 ? (
            <div className="grid gap-3">
              {titulos.map((titulo, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-full mr-3">
                    <Trophy className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="font-medium">{titulo}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Este equipo aún no tiene títulos registrados.</p>
          )}
        </div>
      </div>
    </div>
  )
}

