import { AnswerItem } from './AnswerItem'
import classes from './AnswerList.module.css'
export function AnswerList(props) {
  const answers = Object.values(props.question.answers)
  // console.log('answers', props)
  return (
    <ul className={classes.answerList}>
      {answers.map((answer, index) => (
        <AnswerItem
          key={index}
          item={answer}
          index={index}
          nextQuestion={props.nextQuestion}
          rightId={props.question.rightAnswerId}
          answeredQuestions={props.answeredQuestions}
          currentQuestion={props.currentQuestion}
        />
      ))}
    </ul>
  )
}
