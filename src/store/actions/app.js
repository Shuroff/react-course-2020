import { SET_AUTHORIZED } from './actionTypes'

export function setAuthorized(authorized) {
  return {
    type: SET_AUTHORIZED,
    authorized,
  }
}
