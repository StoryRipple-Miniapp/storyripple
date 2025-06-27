// Utility to check available exports from @zoralabs/coins-sdk
// Run this in the browser console to see what's available

import * as zoraSDK from '@zoralabs/coins-sdk'

export function checkZoraExports() {
  console.log('Available Zora SDK exports:', Object.keys(zoraSDK))
  console.log('Full Zora SDK object:', zoraSDK)
  
  // Check for trade-related functions
  const tradeRelated = Object.keys(zoraSDK).filter(key => 
    key.toLowerCase().includes('trade') || 
    key.toLowerCase().includes('buy') || 
    key.toLowerCase().includes('sell')
  )
  
  console.log('Trade-related exports:', tradeRelated)
  
  return zoraSDK
}

// Export the SDK for debugging
export { zoraSDK } 