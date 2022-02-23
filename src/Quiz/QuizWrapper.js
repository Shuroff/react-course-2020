import classes from './QuizWrapper.module.css'
export function QuizWrapper(props) {
  return <div className={classes.quizWrapper}>{props.children}</div>
}
