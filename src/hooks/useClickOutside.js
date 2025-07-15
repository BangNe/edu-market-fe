import { useEffect } from 'react'

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      // Nếu click bên ngoài ref
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref, callback])
}

export default useClickOutside