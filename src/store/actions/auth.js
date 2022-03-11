import { SET_FORM_CONTROLS } from './actionTypes'
export function setFormControls(formControls) {
  return {
    type: SET_FORM_CONTROLS,
    formControls,
  }
}
