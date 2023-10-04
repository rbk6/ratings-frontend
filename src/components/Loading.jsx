import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'

const LoadingComponent = () => {
  const [dots, setDots] = useState('Loading Content')

  useEffect(() => {
    const updateDots = () => {
      setDots((prevDots) => {
        if (prevDots === 'Loading Content...') return 'Loading Content'
        else return prevDots + '.'
      })
    }

    const dotsTimer = setInterval(updateDots, 1000)
    return () => clearInterval(dotsTimer)
  }, [])

  return (
    <div
      style={{
        fontSize: '24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {dots}
      <CircularProgress style={{ color: '#6020dd', marginTop: '24px' }} />
    </div>
  )
}

export default LoadingComponent
