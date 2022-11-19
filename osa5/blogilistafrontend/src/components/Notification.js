const Notification = ({ message, isError }) => {
  if (message) {
    if (isError) {
      return (
        <div id='error' className='error'>
          {message}
        </div>
      )
    }
    else {
      return (
        <div id='notification' className='notification'>
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