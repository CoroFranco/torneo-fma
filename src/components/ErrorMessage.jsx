"use client"

import { AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export default function ErrorMessage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg shadow-md p-4 mb-6 mx-auto max-w-7xl"
    >
      <div className="flex items-center">
        <div className="bg-red-500 rounded-full p-1 mr-3">
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-red-800">¡Error!</h3>
          <p className="text-red-700">{children}</p>
        </div>
      </div>
    </motion.div>
  )
}

