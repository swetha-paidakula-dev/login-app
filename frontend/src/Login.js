import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState(
    localStorage.getItem('username') || '',
  )
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const showPasswordChange = () => {
    setShowPassword(prev => !prev)
  }

  const loginButtonClick = async event => {
    event.preventDefault()

    if (!username || !password) {
      setErrorMsg('Please enter both username and password')
      return
    }

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      })

      if (response.status === 200) {
        localStorage.setItem('username', username)
        setErrorMsg('')
        navigate('/welcome')
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || 'Invalid username or password',
      )
    }
  }

  return (
    <form className="login-form" onSubmit={loginButtonClick}>
      <div className="bg-container">
        <h1 className="heading-login">Login</h1>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={onChangeUsername}
        />

        <br />

        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={onChangePassword}
        />

        <button
          type="button"
          onClick={showPasswordChange}
          className="button"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>

        <br />

        <button className="buttons" type="submit">
          Login
        </button>

        {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
      </div>
    </form>
  )
}

export default Login