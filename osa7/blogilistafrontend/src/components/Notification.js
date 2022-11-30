import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    if (notification) {
        if (notification.error) {
            return (
                <div id="error" className="error">
                    {notification.message}
                </div>
            )
        } else {
            return (
                <div id="notification" className="notification">
                    {notification.message}
                </div>
            )
        }
    } else {
        return null
    }
}

export default Notification
