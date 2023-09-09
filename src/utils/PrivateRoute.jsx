import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
  let token = sessionStorage.getItem('rate') ? true : false
  return token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
