import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
  loading: false,
  quizes: {},
  error: null,
}

export default function quizListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: action.payload.loading,
        quizes: action.payload.quizes,
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}
