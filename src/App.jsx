import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './utils/PrivateRoute'
import './App.css'

function App() {
  const [currentForm, setCurrentForm] = useState('login')
  const [isRegistered, setIsRegistered] = useState(false)

  const toggleForm = (formName, newUserStatus = false) => {
    setCurrentForm(formName)
    setIsRegistered(newUserStatus)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" exact />
          </Route>
          <Route
            element={
              sessionStorage.getItem('rate') ? (
                <Navigate to="/" />
              ) : currentForm === 'login' ? (
                <Login onFormSwitch={toggleForm} isRegistered={isRegistered} />
              ) : (
                <Register onFormSwitch={toggleForm} />
              )
            }
            path="/login"
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
