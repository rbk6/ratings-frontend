import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Authentication from './pages/Authentication/Authentication'
import Layout from './components/Layout'
import Lists from './pages/Lists'
import Movies from './pages/Movies'
import NotFound from './pages/NotFound/NotFound'
import PrivateRoute from './utils/PrivateRoute'
import Profile from './pages/Profile'
import Ratings from './pages/Ratings'
import Shows from './pages/Shows'
import './App.css'

function App() {
  const isAuthenticated = !!localStorage.getItem('rate')
  const [successMsg, setSuccessMsg] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const handleResize = () => setIsMobile(window.innerWidth <= 768)
  window.addEventListener('resize', handleResize)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Authentication
                  setSuccessMsg={setSuccessMsg}
                  successMsg={successMsg}
                  isMobile={isMobile}
                />
              )
            }
            path="/login"
          />
          <Route
            element={<Layout logoutMsg={setSuccessMsg} isMobile={isMobile} />}
          >
            <Route element={<PrivateRoute logoutMsg={setSuccessMsg} />}>
              <Route
                element={
                  <Movies logoutMsg={setSuccessMsg} isMobile={isMobile} />
                }
                path="/"
                exact
              />
              <Route
                element={
                  <Shows logoutMsg={setSuccessMsg} isMobile={isMobile} />
                }
                path="/shows"
                exact
              />
              <Route
                element={
                  <Lists logoutMsg={setSuccessMsg} isMobile={isMobile} />
                }
                path="/lists"
              />
              <Route element={<Lists />} path="/lists/:list_name" />
              <Route
                element={
                  <Ratings logoutMsg={setSuccessMsg} isMobile={isMobile} />
                }
                path="/ratings"
                exact
              />
              <Route
                element={
                  <Profile logoutMsg={setSuccessMsg} isMobile={isMobile} />
                }
                path="/profile"
                exact
              />
            </Route>
          </Route>
          <Route element={<PrivateRoute logoutMsg={setSuccessMsg} />}>
            <Route element={<NotFound />} path="*" />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
