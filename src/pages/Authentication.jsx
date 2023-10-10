import { useState } from 'react'
import PropTypes from 'prop-types'
import isEmail from 'email-validator'
import axios from 'axios'
import slatelistTypeDark from '../assets/slatelist-type-dark.png'
import '../styles/auth.css'

const Authentication = ({ successMsg, setSuccessMsg }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [currentForm, setCurrentForm] = useState('login')
  const initialFormState = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  }

  const [form, setForm] = useState(initialFormState)

  const toggleForm = (formName, msg) => {
    setCurrentForm(formName)
    setSuccessMsg(msg)
  }

  const resetForm = () => setForm(initialFormState)

  const [errorMsg, setErrorMsg] = useState('')

  const onFieldUpdate = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
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
    if (currentForm === 'login') {
      try {
        const { username, password } = form
        const res = await axios.post(`${apiUrl}/auth/login`, {
          username,
          password,
        })
        sessionStorage.setItem('rate', res.data.accessToken)
        setSuccessMsg('Welcome to the community! Log in to get started.')
        toggleForm('login')
      } catch (err) {
        if (err.response && err.response.data && err.response.data.msg)
          setErrorMsg(err.response.data.msg)
        else if (err.response && err.response.data)
          setErrorMsg(err.response.data)
        else setErrorMsg('An error occurred, please try again.')
      }
    } else {
      const validationError = await validateForm()
      if (!validationError) {
        try {
          await axios.post(`${apiUrl}/auth/register`, form)
          resetForm()
          toggleForm(
            'login',
            'Welcome to the community! Log in to get started.'
          )
        } catch (err) {
          if (err.response && err.response.data && err.response.data.msg)
            setErrorMsg(err.response.data.msg)
          else if (err.response && err.response.data)
            setErrorMsg(err.response.data)
          else setErrorMsg('An error occurred, please try again.')
        }
      } else setErrorMsg(validationError)
    }
  }

  return currentForm === 'login' ? (
    <div className="auth-container">
      <img
        src={slatelistTypeDark}
        style={{
          filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.50))',
          width: '75%',
          alignSelf: 'center',
          marginBottom: '2.5rem',
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
          autoComplete="on"
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
      <button className="link-btn" onClick={() => toggleForm('register')}>
        Don&apos;t have an account? Register here.
      </button>
    </div>
  ) : (
    <div className="auth-container register-container">
      <img
        src={slatelistTypeDark}
        style={{
          filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.50))',
          width: '75%',
          alignSelf: 'center',
          marginBottom: '2.5rem',
        }}
      />
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          value={form.name}
          onChange={onFieldUpdate}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
          autoComplete="on"
        />
        <label htmlFor="email">Email</label>
        <input
          value={form.email}
          onChange={onFieldUpdate}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          required
          autoComplete="on"
        />
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
          name="password"
          id="password"
          placeholder="Password"
          autoComplete="on"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={form.confirmPassword}
          onChange={onFieldUpdate}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="on"
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
      <button className="link-btn" onClick={() => toggleForm('login')}>
        Already have an account? Log in here.
      </button>
    </div>
  )
}

Authentication.propTypes = {
  successMsg: PropTypes.string,
  setSuccessMsg: PropTypes.func,
}

export default Authentication
