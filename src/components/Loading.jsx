import { CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80vh',
      }}
    >
      <CircularProgress
        size={'5rem'}
        style={{ color: '#6020dd', marginTop: '24px' }}
      />
    </div>
  )
}

export default Loading
