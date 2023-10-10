import PropTypes from 'prop-types'
import { useState } from 'react'
import slatelistTypeDark from '../assets/slatelist-type-dark.png'
import AuthForm from '../components/AuthForm'
import '../styles/auth.css'

const Message = ({ message, color }) => {
  return message ? <p style={{ color, marginTop: '24px' }}>{message}</p> : null
}

const Authentication = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setErrorMsg('')
    setSuccessMsg('')
    setCurrentForm(formName)
  }

  return (
    <div className="auth-container">
      <img src={slatelistTypeDark} alt="Logo" />
      {currentForm === 'login' ? (
        <>
          <AuthForm
            key="login"
            fields={[
              { name: 'username', type: 'text' },
              { name: 'password', type: 'password' },
            ]}
            setErrorMsg={setErrorMsg}
            setSuccessMsg={setSuccessMsg}
            setCurrentForm={setCurrentForm}
          />
          <Message message={successMsg} color="#2ff46a" />
          <Message message={errorMsg} color="#f42f2f" />
          <button className="link-btn" onClick={() => toggleForm('register')}>
            Don&apos;t have an account? Register here.
          </button>
        </>
      ) : (
        <>
          <AuthForm
            key="register"
            fields={[
              { name: 'name', type: 'text' },
              { name: 'email', type: 'text' },
              { name: 'username', type: 'text' },
              { name: 'password', type: 'password' },
              { name: 'confirmPassword', type: 'password' },
            ]}
            setErrorMsg={setErrorMsg}
            setSuccessMsg={setSuccessMsg}
            setCurrentForm={setCurrentForm}
          />
          <Message message={successMsg} color="#2ff46a" />
          <Message message={errorMsg} color="#f42f2f" />
          <button className="link-btn" onClick={() => toggleForm('login')}>
            Already have an account? Log in here.
          </button>
        </>
      )}
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
}

export default Authentication
