import classes from './Button.module.css'
export function Button(props) {
  const cls = [classes.Button]
  if (props.color === 'green') {
    cls.push(classes.Green)
  }
  if (props.color === 'blue') {
    cls.push(classes.Blue)
  }

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={cls.join(' ')}
    >
      {props.text}
    </button>
  )
}
