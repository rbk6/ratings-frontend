import { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'

const Login = ({ onFormSwitch }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  const onFieldUpdate = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, form)
      sessionStorage.setItem('rate', res.data.accessToken)
      navigate('/')
    } catch (err) {
      setErrorMsg(err.response.data.msg || err.response.data || err)
    }
  }

  return (
    <div className="auth-container">
      <h1 style={{ marginBottom: '1rem' }}>Lights, Camera, Login! 🎬</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={form.username}
          onChange={onFieldUpdate}
          type="text"
          id="username"
          name="username"
          required
          autoComplete="on"
        />
        <label htmlFor="password">Password</label>
        <input
          value={form.password}
          onChange={onFieldUpdate}
          type="password"
          id="password"
          name="password"
          required
        />
        <button className="submit" type="submit">
          Log In
        </button>
      </form>
      {errorMsg ? (
        <p
          style={{
            color: '#f42f2f',
            marginTop: '24px',
          }}
        >
          {errorMsg}
        </p>
      ) : null}
      <button className="link-btn" onClick={() => onFormSwitch('register')}>
        Don&apos;t have an account? Register here.
      </button>
    </div>
  )
}

Login.propTypes = {
  onFormSwitch: PropTypes.func.isRequired,
}

export default Login
