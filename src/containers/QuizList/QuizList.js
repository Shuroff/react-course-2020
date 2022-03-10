import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import classes from './QuizList.module.css'
import { fetchQuizes } from '../../store/actions/quizList'
import { connect } from 'react-redux'

function QuizList(props) {
  function renderQuizes(quizes) {
    let result = []
    let i = 1
    for (let key of Object.keys(quizes)) {
      result.push(
        <li key={key}>
          <NavLink to={'/quiz/' + key}>Тест №{i}</NavLink>
        </li>
      )
      i++
    }
    return result
  }
  useEffect(() => {
    props.fetchQuizes()
  }, [])
  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {props.loading && Object.keys(props.quizes).length !== 0 ? (
          <p>...loading</p>
        ) : (
          <ul>{renderQuizes(props.quizes)}</ul>
        )}
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    quizes: state.quizList.quizes,
    loading: state.quizList.loading,
  }
}
function mapDispathToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  }
}
export default connect(mapStateToProps, mapDispathToProps)(QuizList)
