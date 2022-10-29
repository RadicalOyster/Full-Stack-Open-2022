const InputField = (props) => {
    return (
      <div>
        {props.title}: <input
          value={props.value}
          onChange={props.handler}
        />
      </div>
    )
  }

  export default InputField