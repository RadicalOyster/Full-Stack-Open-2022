import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MapUser = (user) => {
    let text = 'blogs'
    if (user.blogs.length == 1) {
        text = 'blog'
    }

    return (
        <li key={user.id}>
        <table>
            <tbody>
                <tr>
                    <td
                        style={{
                            minWidth: '120px',
                            fontWeight: 'bold',
                        }}
                    >
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </td>
                    <td>{user.blogs.length} {text}</td>
                </tr>
            </tbody>
        </table>
    </li>
    )
}

const UsersView = () => {
    const usersList = useSelector((state) => state.users)

    return (
        <div>
            <h2>Users</h2>
            <ul
                className="usersContainer"
                style={{ listStyle: 'none', paddingLeft: '6px' }}
            >
                {usersList.map((user) => (
                    MapUser(user)
                ))}
            </ul>
        </div>
    )
}

export default UsersView
