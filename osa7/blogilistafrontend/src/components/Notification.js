import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    if (notification) {
        if (notification.error) {
            return <Alert variant="danger" className="notification">{notification.message}</Alert>
        } else {
            return <Alert variant="success" className="notification">{notification.message}</Alert>
        }
    } else {
        return null
    }
}

export default Notification
