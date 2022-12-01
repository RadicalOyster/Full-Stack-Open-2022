import { useSelector } from 'react-redux'

const Header = ({ handleLogout }) => {
    const user = useSelector(state => state.loggedUser)
    return (
        <div>
            <h2>Welcome to the Blogs List!</h2>
            <form onSubmit={handleLogout}>
                <div>
                    Logged in as {user.name}{' '}
                    <button className="logoutButton" type="submit">
                        Logout
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Header
