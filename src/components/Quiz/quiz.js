import classes from './Quiz.module.css'
import { useState } from 'react'
import { Question } from '../Question/Question'
import { AnswerList } from '../Answer/AnswerList'
import { Finish } from '../Finish/Finish'
export function Quiz() {
  const initialState = {
    questions: [
      {
        question: 'Столица Нигерии?',
        answers: ['Нигер', 'Нлукумба', 'Абуджа', 'Махачкала'],
        rightId: 2,
      },
      {
        question: 'Гей ли Сизыч?',
        answers: [
          'Нет он натуризыч',
          'Да, он гей-слейв',
          'Нет, он самуризыч',
          'Нет, он Джейсон Сизыч и ломал всем лица',
        ],
        rightId: 1,
      },
      {
        question: 'Кто играет в геньшин?',
        answers: ['Бибочка', 'Бэк', 'Анхрюгор', 'Сквиртё'],
        rightId: 1,
      },
      {
        question: 'Что есть у макрона?',
        answers: [
          'Мощные житцепсы',
          'Воля к победе',
          'Много волос',
          'Целлюлит на жопе',
        ],
        rightId: 3,
      },
      {
        question: 'Какая кровать у Фурса?',
        answers: ['Потрёпаная', 'Поёбаная', 'Подроченная', 'Пожёванная'],
        rightId: 3,
      },
    ],
    currentQuestion: 0,
    isFinished: false,
    answeredQuestions: [], // {id: true/false}
  }
  const [state, setState] = useState(initialState)
  const changeAnsweredQuestions = (question) => {
    setState((prevState) => {
      const newAnsweredQuestions = [...prevState.answeredQuestions, question]
      return { ...prevState, answeredQuestions: newAnsweredQuestions }
    })
  }
  const nextQuestion = () => {
    if (state.currentQuestion + 1 !== state.questions.length) {
      setState((prevState) => {
        return { ...prevState, currentQuestion: prevState.currentQuestion + 1 }
      })
    } else {
      setState((prevState) => {
        return { ...prevState, isFinished: true }
      })
    }
  }
  const refresh = () => {
    setState(initialState)
  }
  const currentQuestion = state.currentQuestion
  const text = state.questions[currentQuestion].question
  const question = state.questions[currentQuestion]
  return (
    <div className={classes.quiz}>
      {!state.isFinished ? (
        <>
          <Question
            question={text}
            index={currentQuestion}
            length={state.questions.length}
          />
          <AnswerList
            question={question}
            nextQuestion={nextQuestion}
            answeredQuestions={changeAnsweredQuestions}
            currentQuestion={currentQuestion}
          />
        </>
      ) : (
        <Finish
          answeredQuestions={state.answeredQuestions}
          questions={state.questions}
          refresh={refresh}
        />
      )}
    </div>
  )
}
