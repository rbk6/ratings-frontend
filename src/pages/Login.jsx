import { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import eyerateType from '../assets/eyerate-logo-type.png'

const Login = ({ onFormSwitch, successMsg }) => {
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
      <img
        src={eyerateType}
        style={{
          filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.50))',
          marginBottom: '2.5rem',
          width: '75%',
          alignSelf: 'center',
        }}
      />
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={form.username}
          onChange={onFieldUpdate}
          type="text"
          id="username"
          name="username"
          placeholder="Username"
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
          placeholder="Password"
          required
        />
        <button className="submit" type="submit">
          Log In
        </button>
      </form>
      {successMsg ? (
        <p
          style={{
            color: '#2ff46a',
            marginTop: '24px',
          }}
        >
          {successMsg}
        </p>
      ) : null}
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
  successMsg: PropTypes.string,
}

export default Login
