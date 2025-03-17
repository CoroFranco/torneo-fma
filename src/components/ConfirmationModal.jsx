"use client"

import { AlertTriangle, X } from "lucide-react"

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  confirmColor = "emerald",
}) {
  if (!isOpen) return null

  const getButtonColor = (color) => {
    switch (color) {
      case "red":
        return "bg-red-600 hover:bg-red-700"
      case "amber":
        return "bg-amber-600 hover:bg-amber-700"
      default:
        return "bg-emerald-600 hover:bg-emerald-700"
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-gray-700">{message}</p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className={`px-6 py-2 ${getButtonColor(confirmColor)} text-white rounded-lg transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

