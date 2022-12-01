import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NavigationMenu = ({ handleLogout }) => {
    const user = useSelector((state) => state.loggedUser)
    const leftStyle = {
        paddingRight: 5,
        fontWeight: 'bold',
    }
    const rightStyle = {
        paddingLeft: '5%',
        fontWeight: 'bold',
        color: 'darkBlue'
    }

    return (
        <div style={{ backgroundColor: 'lightGray', marginBottom: '20px' }}>
            <Link to="/" style={leftStyle}>
                Blogs
            </Link>
            <Link to="/users" style={leftStyle}>
                Users
            </Link>
            <span style={rightStyle}>
                Logged in as {user.name}{' '}
                <button className="logoutButton" onClick={handleLogout}>
                    Logout
                </button>
            </span>
        </div>
    )
}

export default NavigationMenu
