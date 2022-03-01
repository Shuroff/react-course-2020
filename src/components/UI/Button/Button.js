import classes from './Button.module.css'
export function Button(props) {
  const cls = [classes.Button]
  if (props.color === 'green') {
    cls.push(classes.Green)
  }
  if (props.color === 'blue') {
    cls.push(classes.Blue)
  }
  console.log(props)
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={cls.join(' ')}
    >
      {props.text}
    </button>
  )
}
