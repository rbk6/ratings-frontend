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
  const [successMsg, setSuccessMsg] = useState('')

  const toggleForm = (formName, msg) => {
    setCurrentForm(formName)
    setSuccessMsg(msg)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              element={<Home logoutMsg={setSuccessMsg} />}
              path="/"
              exact
            />
          </Route>
          <Route
            element={
              sessionStorage.getItem('rate') ? (
                <Navigate to="/" />
              ) : currentForm === 'login' ? (
                <Login onFormSwitch={toggleForm} successMsg={successMsg} />
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
