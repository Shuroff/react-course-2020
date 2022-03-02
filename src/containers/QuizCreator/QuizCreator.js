import React, { useState } from 'react'
import { Input } from '../../components/UI/Input/Input'
import classes from './QuizCreator.module.css'
import { Button } from '../../components/UI/Button/Button'
import axios from '../../axios/axios-quiz'
function formControlsCreator(number) {
  const formControls = {}
  const input = {
    valid: false,
    touched: false,
    validation: {
      required: true,
    },
  }
  for (let i = 0; i < number; i++) {
    formControls[`input${i + 1}`] = { ...input }
  }
  formControls.question = { ...input }
  return formControls
}
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
    formControls: formControlsCreator(4),
  }

  const [state, setState] = useState(initialState)

  function changeOptionsHandler(value, i) {
    const question = value
    const answers = state.answers
    answers[`option${i}`] = question
    const formControls = state.formControls
    let control = formControls[`input${i}`]
    control.touched = true
    let isValid = true
    if (question.trim() === '') {
      isValid = false
    }
    control.valid = isValid
    formControls[`input${i}`] = control
    setState((prevState) => {
      return { ...prevState, answers, formControls }
    })
  }

  function changeQuestionHandler(event) {
    const question = event.target.value
    const formControls = state.formControls
    let control = formControls.question
    control.touched = true
    let isValid = true

    if (question.trim() === '') {
      isValid = false
    }
    control.valid = isValid
    formControls.question = control
    setState((prevState) => {
      return { ...prevState, question, formControls }
    })
  }
  function changeRightAnswerHandler(event) {
    setState((prevState) => {
      return { ...prevState, rightAnswerId: +event.target.value }
    })
  }

  function createOptionInputs() {
    const keys = Object.keys(state.answers)
    return keys.map((key, index) => {
      return (
        <React.Fragment key={key}>
          <label htmlFor={key}>Вариант {index + 1}</label>
          <Input
            type="text"
            value={state.answers[key]}
            onChange={(event) =>
              changeOptionsHandler(event.target.value, index + 1)
            }
            valid={state.formControls[`input${index + 1}`].valid}
            touched={state.formControls[`input${index + 1}`].touched}
            shouldValidate={true}
            id={key}
            errorMessage="Не оставляйте поле пустым"
          />
        </React.Fragment>
      )
    })
  }
  function addQuestionHandler() {
    setState((prevState) => {
      const questions = prevState.questions
      questions.push({
        question: prevState.question,
        answers: prevState.answers,
        rightAnswerId: prevState.rightAnswerId,
      })
      return { ...initialState, questions }
    })
  }
  function isFormValid() {
    let isValid = true
    const formControls = state.formControls
    for (let key of Object.keys(formControls)) {
      isValid = isValid && formControls[key].valid
    }
    return isValid
  }
  async function createTestHandler() {
    try {
      await axios.post(
        'https://react-quiz-253c1-default-rtdb.europe-west1.firebasedatabase.app/quizes.json',
        state.questions
      )
      setState(initialState)
    } catch (e) {
      console.log(e)
    }
  }
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
            onChange={(event) => changeQuestionHandler(event)}
            valid={state.formControls.question.valid}
            touched={state.formControls.question.touched}
            shouldValidate={true}
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
          <Button
            onClick={addQuestionHandler}
            text="Добавить вопрос"
            color="blue"
            disabled={isFormValid()}
          ></Button>
          <Button
            onClick={createTestHandler}
            text="Создать тест"
            color="green"
            disabled={isFormValid()}
          ></Button>
        </form>
      </div>
    </div>
  )
}
