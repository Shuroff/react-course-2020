import axios from 'axios'
import classes from './Auth.module.css'
import { Input } from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/Button'
import { connect } from 'react-redux'
import { setFormControls } from '../../store/actions/auth'
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

function Auth(props) {
  const API_KEY = 'AIzaSyCJROTW2d3snrUe6naVnMlDFnmwWV4kJOw'

  function isFormValid() {
    return props.formControls.email.valid && props.formControls.password.valid
  }

  async function loginHandler() {
    const payload = {
      email: props.formControls.email.value,
      password: props.formControls.email.value,
      returnSecureToken: true,
    }
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        payload
      )
      props.setAuthorized(true)
    } catch (e) {
      console.log(e)
    }
  }
  async function registerHandler() {
    const payload = {
      email: props.formControls.email.value,
      password: props.formControls.email.value,
      returnSecureToken: true,
    }
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        payload
      )
      props.setAuthorized(true)
    } catch (e) {
      console.log(e)
    }
  }
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
    const formControls = { ...props.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    props.setFormControls(formControls) // redux
  }
  function renderInputs() {
    return Object.keys(props.formControls).map((controlName, index) => {
      const control = props.formControls[controlName]
      return (
        <Input
          key={controlName + index}
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
          <Button
            color="blue"
            disabled={!isFormValid()}
            onClick={loginHandler}
            text="Войти"
          />
          <Button
            color="green"
            disabled={!isFormValid()}
            onClick={registerHandler}
            text="Зарегистрироваться"
          />
        </form>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    formControls: state.auth.formControls,
    password: state.auth.password,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFormControls: (formControls) => dispatch(setFormControls(formControls)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
