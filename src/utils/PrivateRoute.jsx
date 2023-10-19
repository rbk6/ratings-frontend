import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  let token = localStorage.getItem('rate') ? true : false
  return token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
