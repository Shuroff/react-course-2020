import {
  SET_QUESTIONS_AND_LOADING,
  SET_ANSWERED_QUESTIONS,
  ENCREASE_CURRENT_QUESTION,
  SET_ISFINISHED,
  REFRESH,
} from '../actions/actionTypes'

const initialState = {
  questions: [],
  loading: true,
  currentQuestion: 0,
  isFinished: false,
  answeredQuestions: [], // {id: true/false}
}

export function quizReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTIONS_AND_LOADING:
      return {
        ...state,
        questions: [...action.questions],
        loading: action.loading,
      }
    case SET_ANSWERED_QUESTIONS:
      const newAnsweredQuestions = [...state.answeredQuestions, action.question]
      return {
        ...state,
        answeredQuestions: newAnsweredQuestions,
      }
    case ENCREASE_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      }
    case SET_ISFINISHED:
      return {
        ...state,
        isFinished: true,
      }
    case REFRESH:
      return {
        ...state,
        loading: false,
        isFinished: false,
        answeredQuestions: [],
        currentQuestion: 0,
      }
    default:
      return state
  }
}
