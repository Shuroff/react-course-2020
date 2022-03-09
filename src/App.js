import React from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { QuizWrapper } from './components/Quiz/QuizWrapper/QuizWrapper'
import { Quiz } from './components/Quiz/quiz'
import QuizList from './containers/QuizList/QuizList'
import { Auth } from './containers/Auth/Auth'
import { QuizCreator } from './containers/QuizCreator/QuizCreator'
import { Menu } from './components/Menu/Menu'
function App() {
  const [state, setState] = useState({
    authorized: false,
  })

  function setAuthorized(authorized) {
    setState({
      authorized,
    })
  }
  const quiz = (
    <QuizWrapper>
      <Quiz />
    </QuizWrapper>
  )

  const location = useLocation()
  const navigation = useNavigate()

  useEffect(() => {
    if (state.authorized && location.pathname === '/auth') {
      navigation('/')
    }
    if (!state.authorized && location.pathname === '/exit') {
      navigation('/')
    }
    if (!state.authorized && location.pathname === '/quiz-creator') {
      navigation('/')
    }
  }, [state.authorized])

  let routes

  if (state.authorized) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<QuizList />}></Route>
          <Route path="/quiz-creator" element={<QuizCreator />}></Route>
          <Route path="/quiz/:id" element={quiz}></Route>
        </Routes>
        <Menu
          authorized={state.authorized}
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
          authorized={state.authorized}
          setAuthorized={setAuthorized}
        ></Menu>
      </>
    )
  }
  return routes
}

export default App
