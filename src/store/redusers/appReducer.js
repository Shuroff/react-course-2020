import { SET_AUTHORIZED } from '../actions/actionTypes'

const initialState = {
  authorized: false,
}
export function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHORIZED:
      return {
        ...state,
        authorized: action.authorized,
      }
    default:
      return state
  }
}
