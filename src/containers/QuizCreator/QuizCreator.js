import React, { useState } from 'react'
import { Input } from '../../components/UI/Input/Input'
import classes from './QuizCreator.module.css'
import { Button } from '../../components/UI/Input/Button/Button'
export function QuizCreator(props) {
  const initialState = {
    questions: [],
    question: '',
    answers: {
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    },
    rightAnswerId: null,
  }
  const [state, setState] = useState(initialState)

  function changeOptionsHandler(value, key) {
    let answers = state.answers
    answers[key] = value
    setState((prevState) => {
      return { ...prevState, answers }
    })
  }

  function changeQuestionHandler(event) {
    const question = event.target.value
    setState((prevState) => {
      return { ...prevState, question }
    })
  }
  function changeRightAnswerHandler(event) {
    setState((prevState) => {
      return { ...prevState, rightAnswerId: +event.target.value }
    })
  }

  function createOptionInputs(answers) {
    const keys = Object.keys(state.answers)
    return keys.map((key, index) => {
      return (
        <React.Fragment key={key}>
          <label htmlFor={key}>Вариант {index + 1}</label>
          <Input
            type="text"
            value={state.answers[key]}
            onChange={(event) => changeOptionsHandler(event.target.value, key)}
            id={key}
          />
        </React.Fragment>
      )
    })
  }
  console.log(state)
  return (
    <div className={classes.Background}>
      <div className={classes.Wrapper}>
        <h4>Создание теста</h4>
        <form>
          <label htmlFor="question">Введите вопрос</label>
          <Input
            type="text"
            id="question"
            value={state.question}
            onChange={changeQuestionHandler}
          />
          {createOptionInputs(state.answers)}
          <label htmlFor="select">Выберите правильный ответ</label>
          <select id="select" onChange={changeRightAnswerHandler}>
            {[1, 2, 3, 4].map((id) => {
              return (
                <option value={id} key={id}>
                  {id}
                </option>
              )
            })}
          </select>
          <Button text="Добавить вопрос" color="blue"></Button>
          <Button text="Создать тест" color="green"></Button>
        </form>
      </div>
    </div>
  )
}
