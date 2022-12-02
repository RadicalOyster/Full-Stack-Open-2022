import LoginForm from './LoginForm'
import Togglable from './Togglable'

const LoginView = ({ setUsername, setPassword, username, password, handleLogin }) => {
    return (
        <div>
            <h1>Login</h1>
            <Togglable buttonLabel="Log in">
                <LoginForm
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                    username={username}
                    password={password}
                    handleSubmit={handleLogin}
                />
            </Togglable>
        </div>
    )
}

export default LoginView