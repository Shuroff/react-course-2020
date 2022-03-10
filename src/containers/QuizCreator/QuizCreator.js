import React, { useState } from 'react'
import { Input } from '../../components/UI/Input/Input'
import classes from './QuizCreator.module.css'
import { Button } from '../../components/UI/Button/Button'
import axios from '../../axios/axios-quiz'
import { connect } from 'react-redux'
import {
  changeOptions,
  changeQuestion,
  addQuestion,
  changeRightAnswer,
  resetQuizCreator,
} from '../../store/actions/quizCreator'

function QuizCreator(props) {
  function changeOptionsHandler(value, i) {
    const question = value
    const answers = props.answers
    console.log(answers[`option${i}`])
    answers[`option${i}`] = question
    console.log(answers[`option${i}`])
    const formControls = props.formControls
    let control = formControls[`input${i}`]
    control.touched = true
    let isValid = true
    if (question.trim() === '') {
      isValid = false
    }
    control.valid = isValid
    formControls[`input${i}`] = control

    props.changeOptions({ answers, formControls }) // redux
  }
  function changeQuestionHandler(event) {
    const question = event.target.value
    const formControls = props.formControls
    let control = formControls.question
    control.touched = true
    let isValid = true

    if (question.trim() === '') {
      isValid = false
    }
    control.valid = isValid
    formControls.question = control

    props.changeQuestion({ question, formControls }) // redux
  }
  function changeRightAnswerHandler(event) {
    const rightAnswerId = +event.target.value

    props.changeRightAnswer({ rightAnswerId }) // redux
  }

  function createOptionInputs(props) {
    const keys = Object.keys(props.answers)
    return keys.map((key, index) => {
      console.log('props.answers[key]', props.answers[key])
      return (
        <React.Fragment key={key}>
          <label htmlFor={key}>Вариант {index + 1}</label>
          <Input
            type="text"
            value={props.answers[key]}
            onChange={(event) =>
              changeOptionsHandler(event.target.value, index + 1)
            }
            valid={props.formControls[`input${index + 1}`].valid}
            touched={props.formControls[`input${index + 1}`].touched}
            shouldValidate={true}
            id={key}
            errorMessage="Не оставляйте поле пустым"
          />
        </React.Fragment>
      )
    })
  }
  function addQuestionHandler(event, props) {
    event.preventDefault()

    props.addQuestion() // redux
  }
  function isFormValid() {
    let isValid = true
    const formControls = props.formControls
    for (let key of Object.keys(formControls)) {
      isValid = isValid && formControls[key].valid
    }
    return isValid
  }
  async function createTestHandler(event) {
    event.preventDefault()
    try {
      await axios.post('/quizes.json', props.questions)
      props.resetQuizCreator() // redux
    } catch (e) {
      console.log(e)
    }
  }
  function isQuestonsEmpty() {
    return props.questions.length === 0 ? true : false
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
            value={props.question}
            onChange={(event) => changeQuestionHandler(event)}
            valid={props.formControls.question.valid}
            touched={props.formControls.question.touched}
            shouldValidate={true}
            errorMessage="Не оставляйте поле пустым"
          />
          {createOptionInputs(props)}
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
            onClick={(event) => addQuestionHandler(event, props)}
            text="Добавить вопрос"
            color="blue"
            disabled={!isFormValid()}
          ></Button>
          <Button
            onClick={createTestHandler}
            text="Создать тест"
            color="green"
            disabled={isQuestonsEmpty()}
          ></Button>
        </form>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    questions: state.quizCreator.questions,
    question: state.quizCreator.question,
    answers: state.quizCreator.answers,
    rightAnswerId: state.quizCreator.rightAnswerId,
    formControls: state.quizCreator.formControls,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeQuestion: (payload) => dispatch(changeQuestion(payload)),
    changeRightAnswer: (payload) => dispatch(changeRightAnswer(payload)),
    changeOptions: (payload) => dispatch(changeOptions(payload)),
    addQuestion: () => dispatch(addQuestion()),
    resetQuizCreator: () => dispatch(resetQuizCreator()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
