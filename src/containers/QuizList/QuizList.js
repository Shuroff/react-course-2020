import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from '../../axios/axios-quiz'
import classes from './QuizList.module.css'
export function QuizList(props) {
  const [state, setState] = useState({
    loading: true,
    quizes: {},
  })
  function renderQuizes(quizes) {
    let result = []
    for (let i = 0; i < Object.keys(quizes).length; i++) {
      result.push(
        <li key={i}>
          <NavLink to={'/quiz/' + (i + 1)}>Тест №{i + 1}</NavLink>
        </li>
      )
    }
    return result
  }
  useEffect(() => {
    axios
      .get('/quizes.json')
      .then((response) => {
        setState({
          loading: false,
          quizes: response.data,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {state.loading ? (
          <p>...loading</p>
        ) : (
          <ul>{renderQuizes(state.quizes)}</ul>
        )}
      </div>
    </div>
  )
}
