import { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import isEmail from 'email-validator'
import '../styles/auth.css'

const Register = ({ onFormSwitch }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  const onFieldUpdate = (e) => {
    const { id, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }))
  }

  const validateForm = async () => {
    const validNameRegex = /^[A-Za-z\s'-]+$/
    if (!validNameRegex.test(form.name))
      return (
        `Name can only include letters (a-z), spaces, hyphens (-), and ` +
        `apostrophes (').`
      )

    if (!isEmail.validate(form.email))
      return 'Email address is invalid. Please enter a valid email.'

    const validUsernameRegex = /^[a-zA-Z0-9-]+$/
    if (form.username.length < 4 || form.username.length > 27)
      return 'Username must be between 4 and 26 characters.'
    else if (!validUsernameRegex.test(form.username))
      return (
        'Username can only include letters (a-z), numbers (0-9), and' +
        ' hyphens (-).'
      )

    if (form.password.length < 8)
      return 'Password must be at least 8 characters. '

    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    const validationError = await validateForm()
    if (!validationError) {
      try {
        const res = await axios.post(`${apiUrl}/auth/register`, form)
        console.log(res.data)
        onFormSwitch('login', true)
      } catch (err) {
        setErrorMsg(err.response.data.msg || err.response.data || err)
      }
    } else setErrorMsg(validationError)
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
