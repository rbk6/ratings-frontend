import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Movies from './pages/Movies'
import PrivateRoute from './utils/PrivateRoute'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Shows from './pages/Shows'
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
          <Route element={<Layout logoutMsg={setSuccessMsg} />}>
            <Route element={<PrivateRoute logoutMsg={setSuccessMsg} />}>
              <Route
                element={<Movies logoutMsg={setSuccessMsg} />}
                path="/"
                exact
              />
              <Route
                element={<Shows logoutMsg={setSuccessMsg} />}
                path="/shows"
                exact
              />
              <Route
                element={<Profile logoutMsg={setSuccessMsg} />}
                path="/profile"
                exact
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
