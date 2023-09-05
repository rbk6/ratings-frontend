import { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/auth.css'

const Login = ({ onFormSwitch }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const onFieldUpdate = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    }
    setForm(nextFormState)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('login')
  }

  return (
    <div className="auth-container">
      <h1 style={{ marginBottom: '1rem' }}>Lights, Camera, Login! 🎬</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          defaultValue={form.username}
          onChange={onFieldUpdate}
          type="text"
          id="username"
          required
          autoComplete="on"
        />
        <label htmlFor="password">Password</label>
        <input
          defaultValue={form.password}
          onChange={onFieldUpdate}
          type="password"
          id="password"
          required
        />
        <button className="submit" type="submit">
          Log In
        </button>
      </form>
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
