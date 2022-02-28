import classes from './Question.module.css'
export function Question(props) {
  return (
    <div className={classes.question}>
      <strong style={{ fontWeight: 'bold' }}>
        {props.index + 1}. {props.question}
      </strong>
      <p>
        Вопрос {props.index + 1} из {props.length}
      </p>
    </div>
  )
}
