import {
  ADD_QUESTION,
  CHANGE_OPTIONS,
  CHANGE_QUESTION,
  CHANGE_RIGHT_ANSWER,
  RESET_QUIZ_CREATOR,
} from '../actions/actionTypes'

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

export default function quizCreatorReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION:
      console.log('state.answers', state.answers)
      const questions = state.questions
      questions.push({
        question: state.question,
        answers: state.answers,
        rightAnswerId: state.rightAnswerId,
      })
      return { ...initialState, questions }
    case CHANGE_OPTIONS:
      return {
        ...state,
        answers: { ...action.answers },
        formControls: action.formControls,
      }
    case CHANGE_QUESTION:
      console.log('change quest')
      return {
        ...state,
        question: action.question,
        formControls: action.formControls,
      }
    case CHANGE_RIGHT_ANSWER:
      return {
        ...state,
        rightAnswerId: action.rightAnswerId,
      }
    case RESET_QUIZ_CREATOR:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
