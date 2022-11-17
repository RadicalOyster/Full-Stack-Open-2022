const Notification = ({ message, isError }) => {
  if (message) {
    if (isError) {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
    else {
      return (
        <div className="notification">
          {message}
        </div>
      )
    }
  }
  else {
    return null
  }
}

export default Notification