import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import isEmail from 'email-validator'
import style from '../pages/Authentication/Authentication.module.css'

const AuthForm = ({ fields, setErrorMsg, setSuccessMsg, setCurrentForm }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [form, setForm] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )

  const onFieldUpdate = (e) =>
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }))

  const validateForm = async () => {
    const { name, email, username, password } = form
    const validNameRegex = /^[A-Za-z\s'-]+$/
    const validUsernameRegex = /^[a-zA-Z0-9-]+$/

    if (!validNameRegex.test(name))
      return "Name can only include letters (a-z), spaces, hyphens (-), and apostrophes (')."

    if (!isEmail.validate(email))
      return 'Email address is invalid. Please enter a valid email.'

    if (username.length < 4 || username.length > 26)
      return 'Username must be between 4 and 26 characters.'

    if (!validUsernameRegex.test(username))
      return 'Username can only include letters (a-z), numbers (0-9), and hyphens (-).'

    if (password.length < 8) return 'Password must be at least 8 characters.'
  }

  const createLabel = (str) => {
    const label = str.charAt(0).toUpperCase() + str.slice(1)
    if (label.includes('Confirm')) return 'Confirm Password'
    return label
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    if (Object.keys(form).length > 2) {
      const validationError = await validateForm()
      if (!validationError) {
        try {
          await axios.post(`${apiUrl}/auth/register`, form)
          setSuccessMsg('Welcome to the community! Log in to get started.')
          setCurrentForm('login')
        } catch (err) {
          if (err.response && err.response.data && err.response.data.msg)
            setErrorMsg(err.response.data.msg)
          else if (err.response && err.response.data)
            setErrorMsg(err.response.data)
          else setErrorMsg('An error occurred, please try again.')
        }
      } else {
        setErrorMsg(validationError)
      }
    } else {
      const { username, password } = form
      try {
        const res = await axios.post(`${apiUrl}/auth/login`, {
          username,
          password,
        })
        sessionStorage.setItem('rate', res.data.accessToken)
        navigate('/')
      } catch (err) {
        if (err.response && err.response.data && err.response.data.msg)
          setErrorMsg(err.response.data.msg)
        else if (err.response && err.response.data)
          setErrorMsg(err.response.data)
        else setErrorMsg('An error occurred, please try again.')
      }
    }
  }

  return (
    <form
      className={`${
        Object.keys(form).length === 2 ? style['login-form'] : style['reg-form']
      }`}
      onSubmit={handleSubmit}
    >
      {fields.map((field, index) => {
        const label = createLabel(field.name)
        const isFirst = index === 0
        return (
          <div key={index}>
            <label htmlFor={field.name}>{label}</label>
            <input
              className={
                Object.keys(form).length === 2 && field.name === 'password'
                  ? style['login-btn']
                  : ''
              }
              value={form[field.name]}
              onChange={onFieldUpdate}
              autoFocus={isFirst}
              type={field.type}
              name={field.name}
              id={field.name}
              placeholder={label}
              autoComplete="on"
              required
            />
          </div>
        )
      })}
      {form.password &&
        form.confirmPassword &&
        (form.password === form.confirmPassword ? (
          <span style={{ color: '#2ff46a' }}>Passwords match.</span>
        ) : (
          <span style={{ color: '#f42f2f' }}>Passwords do not match.</span>
        ))}
      <button type="submit">
        {Object.keys(form).length > 2 ? 'Create Account' : 'Log In'}
      </button>
    </form>
  )
}

AuthForm.propTypes = {
  fields: PropTypes.array,
  setErrorMsg: PropTypes.func,
  setSuccessMsg: PropTypes.func,
  setCurrentForm: PropTypes.func,
}

export default AuthForm
