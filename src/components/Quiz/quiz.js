import classes from './Quiz.module.css'
import { Question } from '../Question/Question'
import { AnswerList } from '../Answer/AnswerList'
import { Finish } from '../Finish/Finish'
import { useEffect } from 'react/cjs/react.development'
import axios from '../../axios/axios-quiz'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  setQuestionsAndLoading,
  setAnsweredQuestions,
  encreaseCurrentQuestion,
  setIsFinished,
  refresh,
} from '../../store/actions/quiz'
function Quiz(props) {
  const params = useParams()
  useEffect(() => {
    axios
      .get(`/quizes/${params.id}.json`)
      .then((quiz) => {
        const isFinished = false
        props.setQuestionsAndLoading({ questions: quiz.data, loading: false }) // redux
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
  const changeAnsweredQuestions = (question) => {
    props.setAnsweredQuestions(question) // redux
  }
  const nextQuestion = () => {
    if (props.currentQuestion + 1 !== props.questions.length) {
      props.encreaseCurrentQuestion() //redux
    } else {
      const isFinished = true
      props.setIsFinished(isFinished) //redux
    }
  }
  const refresh = () => {
    props.refresh()
  }
  if (props.loading) {
    return <h1>...loading</h1>
  }
  const currentQuestion = props.currentQuestion
  const text = props.questions[currentQuestion].question
  const question = props.questions[currentQuestion]
  return (
    <div className={classes.quiz}>
      {!props.isFinished ? (
        <>
          <Question
            question={text}
            index={currentQuestion}
            length={props.questions.length}
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
          answeredQuestions={props.answeredQuestions}
          questions={props.questions}
          refresh={refresh}
        />
      )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    questions: state.quiz.questions,
    loading: state.quiz.loading,
    currentQuestion: state.quiz.currentQuestion,
    isFinished: state.quiz.isFinished,
    answeredQuestions: state.quiz.answeredQuestions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setQuestionsAndLoading: (payload) =>
      dispatch(setQuestionsAndLoading(payload)),
    setAnsweredQuestions: (question) =>
      dispatch(setAnsweredQuestions(question)),
    encreaseCurrentQuestion: () => dispatch(encreaseCurrentQuestion()),
    setIsFinished: (isFinished) => dispatch(setIsFinished(isFinished)),
    refresh: () => dispatch(refresh()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
