import { useState } from 'react'
import PropTypes from 'prop-types' // Import PropTypes
import '../styles/auth.css'

const Register = ({ onFormSwitch }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const onFieldUpdate = (e) => {
    const { id, value } = e.target
    const nextFormState = {
      ...form,
      [id]: value,
    }

    setForm(nextFormState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(JSON.stringify(form, null, 2))
  }

  return (
    <div className="auth-container register-container">
      <h1 style={{ marginBottom: '1rem' }}>Let&apos;s Get Popping! 🍿</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          defaultValue={form.name}
          onChange={(e) => onFieldUpdate(e)}
          type="text"
          id="name"
        />
        <label htmlFor="email">Email</label>
        <input
          defaultValue={form.email}
          onChange={onFieldUpdate}
          type="text"
          id="email"
        />
        <label htmlFor="username">Username</label>
        <input
          defaultValue={form.username}
          onChange={onFieldUpdate}
          type="text"
          id="username"
        />
        <label htmlFor="password">Password</label>
        <input
          defaultValue={form.password}
          onChange={onFieldUpdate}
          type="password"
          id="password"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          defaultValue={form.confirmPassword}
          onChange={onFieldUpdate}
          type="password"
          id="confirmPassword"
        />
        {form.password.length > 0 || form.confirmPassword.length > 0 ? (
          form.password === form.confirmPassword ? (
            <span
              style={{
                color: '#2ff46a',
              }}
            >
              Passwords match.
            </span>
          ) : (
            <span
              style={{
                color: '#f42f2f',
              }}
            >
              Passwords do not match.
            </span>
          )
        ) : null}
        <button className="submit" type="submit">
          Create Account
        </button>
      </form>
      <button className="link-btn" onClick={() => onFormSwitch('login')}>
        Already have an account? Log in here.
      </button>
    </div>
  )
}

Register.propTypes = {
  onFormSwitch: PropTypes.func.isRequired,
}

export default Register
