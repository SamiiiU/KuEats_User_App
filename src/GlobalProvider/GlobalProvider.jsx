import React, { useEffect, useState } from 'react'
import { ContextAPI } from './ContextAPI'

const GlobalProvider = ({children}) => {
        const [scrwidth, setWidth] = useState(window.innerWidth); 
        const [isLoading , setIsLoading] = useState(false)


        useEffect(() => {
          const handleResize = () => setWidth(window.innerWidth);
          // Add event listener
          window.addEventListener('resize', handleResize);
          
          return () => {
            window.removeEventListener('resize', handleResize)
          };
          
          }, []);
  
  return (
    <ContextAPI.Provider value={{
        scrwidth,
        isLoading , setIsLoading, 
    }}>
        {children}
    </ContextAPI.Provider>
  )
}

export default GlobalProvider