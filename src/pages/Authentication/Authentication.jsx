import PropTypes from 'prop-types'
import { useState } from 'react'
import AuthForm from '../../components/AuthForm'
import slatelistTypeDark from '../../assets/slatelist-type-dark.png'
import style from './Authentication.module.css'

const Message = ({ message, color }) => {
  return message ? <p style={{ color, margin: '8px 0' }}>{message}</p> : null
}

const Authentication = ({ successMsg, setSuccessMsg, isMobile }) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setErrorMsg('')
    setSuccessMsg('')
    setCurrentForm(formName)
  }

  return (
    <div className={`${style['auth-wrapper']}`}>
      <div className={`${style['auth-container']}`}>
        <img
          className={`${style.logo} ${
            currentForm === 'login' ? style['logo-login'] : ''
          }`}
          src={slatelistTypeDark}
          alt="SlateList Logo"
        />
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
            <button
              className={`${style['toggle-btn']} ${style['login']}`}
              onClick={() => toggleForm('register')}
            >
              Don&apos;t have an account? Register here.
            </button>
          </>
        ) : (
          <>
            <AuthForm
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
              isMobile={isMobile}
            />
            <Message message={successMsg} color="#2ff46a" />
            <Message message={errorMsg} color="#f42f2f" />
            <button
              className={style['toggle-btn']}
              onClick={() => toggleForm('login')}
            >
              Already have an account? Log in here.
            </button>
          </>
        )}
      </div>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
}

Authentication.propTypes = {
  successMsg: PropTypes.string,
  setSuccessMsg: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default Authentication
