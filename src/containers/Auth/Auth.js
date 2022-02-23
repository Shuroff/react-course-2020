import { useState } from 'react'
import classes from './Auth.module.css'
import { Input } from '../../components/UI/Input/Input'

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export function Auth(props) {
  const [state, setState] = useState({
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
  })

  function loginHandler() {}
  function registerHandler() {}
  function submitHandler(event) {
    event.preventDefault()
  }

  function validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid
    }

    return isValid
  }

  function onChangeHandler(event, controlName) {
    const formControls = { ...state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    console.log(event.target.value)
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    setState({
      formControls,
    })
  }
  function renderInputs() {
    return Object.keys(state.formControls).map((controlName, index) => {
      const control = state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          // type={control.type}
          // value={control.value}
          // valid={control.valid}
          // touched={control.touched}
          // label={control.label}
          // errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          {...control}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      )
    })
  }
  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>
        <form onSubmit={submitHandler} className={classes.AuthForm}>
          {renderInputs()}

          <button
            className={(classes.button, classes.refresh)}
            onClick={loginHandler}
          >
            Войти
          </button>
          <button
            className={(classes.button, classes.toQuizes)}
            onClick={registerHandler}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  )
}
