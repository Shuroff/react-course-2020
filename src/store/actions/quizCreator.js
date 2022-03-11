import {
  ADD_QUESTION,
  CHANGE_OPTIONS,
  CHANGE_QUESTION,
  CHANGE_RIGHT_ANSWER,
  RESET_QUIZ_CREATOR,
} from './actionTypes'

export function changeQuestion({ question, formControls }) {
  return {
    type: CHANGE_QUESTION,
    question,
    formControls,
  }
}

export function changeRightAnswer({ rightAnswerId }) {
  return {
    type: CHANGE_RIGHT_ANSWER,
    rightAnswerId,
  }
}

export function changeOptions({ answers, formControls }) {
  console.log('answers ->', answers)
  return {
    type: CHANGE_OPTIONS,
    answers,
    formControls,
  }
}
export function addQuestion() {
  return {
    type: ADD_QUESTION,
  }
}

export function resetQuizCreator() {
  return {
    type: RESET_QUIZ_CREATOR,
  }
}
