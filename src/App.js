import React from 'react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { QuizWrapper } from './components/Quiz/QuizWrapper/QuizWrapper'
import { Quiz } from './components/Quiz/quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import { Menu } from './components/Menu/Menu'
import { connect } from 'react-redux'
import { setAuthorized } from './store/actions/app'
function App(props) {
  function setAuthorized(authorized) {
    props.setAuthorized(authorized)
  }
  const quiz = (
    <QuizWrapper>
      <Quiz />
    </QuizWrapper>
  )

  const location = useLocation()
  const navigation = useNavigate()

  useEffect(() => {
    if (props.authorized && location.pathname === '/auth') {
      navigation('/')
    }
    if (!props.authorized && location.pathname === '/exit') {
      navigation('/')
    }
    if (!props.authorized && location.pathname === '/quiz-creator') {
      navigation('/')
    }
  }, [props.authorized])

  let routes

  if (props.authorized) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<QuizList />}></Route>
          <Route path="/quiz-creator" element={<QuizCreator />}></Route>
          <Route path="/quiz/:id" element={quiz}></Route>
        </Routes>
        <Menu
          authorized={props.authorized}
          setAuthorized={setAuthorized}
        ></Menu>
      </>
    )
  } else {
    routes = (
      <>
        <Routes>
          <Route
            path="/auth"
            element={<Auth setAuthorized={setAuthorized} />}
          ></Route>
          <Route path="/quiz/:id" element={quiz}></Route>
          <Route path="/" element={<QuizList />}></Route>
        </Routes>
        <Menu
          authorized={props.authorized}
          setAuthorized={setAuthorized}
        ></Menu>
      </>
    )
  }
  return routes
}
function mapStateToProps(state) {
  return {
    authorized: state.app.authorized,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthorized: (authorized) => dispatch(setAuthorized(authorized)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
