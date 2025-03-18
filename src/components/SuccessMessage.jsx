"use client"

import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function SuccessMessage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 rounded-lg shadow-md p-4 mb-6 mx-auto max-w-7xl mt-8"
    >
      <div className="flex items-center">
        <div className="bg-emerald-500 rounded-full p-1 mr-3">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-emerald-800">¡Operación exitosa!</h3>
          <p className="text-emerald-700">{children}</p>
        </div>
      </div>
    </motion.div>
  )
}

