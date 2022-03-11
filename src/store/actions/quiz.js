import {
  ENCREASE_CURRENT_QUESTION,
  REFRESH,
  SET_ANSWERED_QUESTIONS,
  SET_ISFINISHED,
  SET_QUESTIONS_AND_LOADING,
} from './actionTypes'

export function setQuestionsAndLoading({ questions, loading }) {
  return {
    type: SET_QUESTIONS_AND_LOADING,
    questions,
    loading,
  }
}
export function setAnsweredQuestions(question) {
  return {
    type: SET_ANSWERED_QUESTIONS,
    question,
  }
}
export function encreaseCurrentQuestion() {
  return {
    type: ENCREASE_CURRENT_QUESTION,
  }
}
export function setIsFinished(isFinished) {
  return {
    type: SET_ISFINISHED,
    isFinished,
  }
}
export function refresh() {
  return {
    type: REFRESH,
  }
}
