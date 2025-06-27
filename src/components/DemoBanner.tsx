'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { IS_DEMO_MODE } from '@/lib/wagmi'

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!IS_DEMO_MODE || !isVisible) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2">
      <div className="flex items-center justify-center max-w-sm mx-auto">
        <div className="flex items-center space-x-2 flex-1">
          <FontAwesomeIcon icon={faFlask} className="text-white" />
          <span className="text-sm font-medium">
            Demo Mode - Base Sepolia Testnet
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Close banner"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xs" />
        </button>
      </div>
    </div>
  )
} 