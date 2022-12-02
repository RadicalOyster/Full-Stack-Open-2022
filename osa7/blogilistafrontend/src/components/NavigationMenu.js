import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Navbar, Nav } from 'react-bootstrap'

const NavigationMenu = ({ handleLogout }) => {
    const user = useSelector((state) => state.loggedUser)
    const leftStyle = {
        paddingRight: 5,
        fontWeight: 'bold',
    }
    const rightStyle = {
        paddingLeft: '5%',
        fontWeight: 'bold',
    }

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navigationMenu">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link variant="light" href="#" as="span">
                            <Link to="/">Blogs</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link to="/users">Users</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            {user ? (
                                <em>Logged in as {user.name} <Button variant="secondary" size="small" onClick={() => handleLogout()}>Log out</Button></em>
                            ) : (
                                <Link to="/login">login</Link>
                            )}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
}

export default NavigationMenu
