import { useState, useEffect } from 'react'
import useIsMount from './useIsMount'

const useIsMobile = () => {
  const isMount = useIsMount() 
  const [width, setWidth] = useState(0)
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    if (isMount) {
      handleWindowSizeChange()
    }
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])
  return (width <= 768)
}

export default useIsMobile
