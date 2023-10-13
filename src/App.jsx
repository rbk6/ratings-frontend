import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Authentication from './pages/Authentication/Authentication'
import Layout from './components/Layout'
import Movies from './pages/Movies'
import NotFound from './pages/NotFound/NotFound'
import PrivateRoute from './utils/PrivateRoute'
import Profile from './pages/Profile'
import Shows from './pages/Shows'
import './App.css'

function App() {
  const [successMsg, setSuccessMsg] = useState('')

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            element={
              sessionStorage.getItem('rate') ? (
                <Navigate to="/" />
              ) : (
                <Authentication
                  setSuccessMsg={setSuccessMsg}
                  successMsg={successMsg}
                />
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
          <Route element={<PrivateRoute logoutMsg={setSuccessMsg} />}>
            <Route element={<NotFound />} path="/*" />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
