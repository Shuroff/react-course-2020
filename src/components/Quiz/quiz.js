import classes from './Quiz.module.css'
import { useState } from 'react'
import { Question } from '../Question/Question'
import { AnswerList } from '../Answer/AnswerList'
import { Finish } from '../Finish/Finish'
import { useEffect } from 'react/cjs/react.development'
import axios from '../../axios/axios-quiz'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
export function Quiz() {
  const initialState = {
    questions: [],
    loading: true,
    currentQuestion: 0,
    isFinished: false,
    answeredQuestions: [], // {id: true/false}
  }
  const [state, setState] = useState(initialState)

  const params = useParams()
  useEffect(() => {
    axios
      .get(`/quizes/${params.id}.json`)
      .then((quiz) => {
        const isFinished = false
        setState((prevState) => {
          return { ...prevState, questions: quiz.data, loading: false }
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
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
    setState((prevState) => {
      return {
        ...prevState,
        loading: false,
        isFinished: false,
        answeredQuestions: [],
        currentQuestion: 0,
      }
    })
  }
  if (state.loading) {
    return <h1>...loading</h1>
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
