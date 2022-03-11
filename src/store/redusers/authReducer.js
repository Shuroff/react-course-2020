import { SET_FORM_CONTROLS } from '../actions/actionTypes'

const initialState = {
  formControls: {
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  },
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_CONTROLS:
      return {
        ...state,
        formControls: { ...action.formControls },
      }
    default:
      return state
  }
}
