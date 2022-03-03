import { useState } from 'react'
import classes from './AnswerItem.module.css'
export function AnswerItem(props) {
  const [state, setState] = useState([classes.answerItem])
  function nextQuestion() {
    const timeOut = setTimeout(() => {
      clearTimeout(timeOut)
      setState([classes.answerItem])
      props.nextQuestion()
    }, 1000)
  }
  console.log(props)
  const clickHandler = (event) => {
    if (props.index + 1 === props.rightId) {
      setState([...state, classes.success])
      const question = {}
      question[props.currentQuestion] = true
      props.answeredQuestions(question)
      nextQuestion()
    } else {
      setState([...state, classes.wrong])
      const question = {}
      question[props.currentQuestion] = false
      props.answeredQuestions(question)
      nextQuestion()
    }
  }
  return (
    <li className={state.join(' ')} onClick={clickHandler}>
      <strong>{props.index + 1}</strong> &nbsp;
      {props.item}
    </li>
  )
}
