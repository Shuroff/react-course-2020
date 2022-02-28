import classes from './Button.module.css'
export function Button({ color, text }) {
  const cls = [classes.Button]
  if (color === 'green') {
    cls.push(classes.Green)
  }
  if (color === 'blue') {
    cls.push(classes.Blue)
  }
  return <button className={cls.join(' ')}>{text}</button>
}
