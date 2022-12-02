import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const MapUser = (user) => {
    let text = 'blogs'
    if (user.blogs.length == 1) {
        text = 'blog'
    }

    return (
        <tr key={user.id}>
            <td>
                <Link className="leftTableElement" to={`/users/${user.id}`}>{user.username}</Link> <span>{user.blogs.length} {text}</span>
            </td>
        </tr>
    )
}

const UsersView = () => {
    const usersList = useSelector((state) => state.users)

    if (usersList) {
        return (
            <div>
                <Table striped>
                    <tbody>{usersList.map((user) => MapUser(user))}</tbody>
                </Table>
            </div>
        )
    }
}

export default UsersView
