import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
} from './actionTypes'

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quizes.json')

      dispatch(fetchQuizesSuccess({ loading: false, quizes: response.data }))
    } catch (error) {
      dispatch(fetchQuizesError({ error: error }))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  }
}

export function fetchQuizesSuccess(payload) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload,
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  }
}
