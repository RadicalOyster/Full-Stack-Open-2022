const Notification = ({ message }) => {
    if (!message) {
      return
    }
    return (
      <div name="TEST" style={{
        color: 'green',
        border: '1px solid black',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <span style={{
          fontWeight: 'bold',
          fontSize: '24px'
        }}>{message}</span>
      </div>
    )
  }

  export default Notification