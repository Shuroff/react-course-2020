import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { QuizWrapper } from './components/Quiz/QuizWrapper/QuizWrapper'
import { Quiz } from './Quiz/quiz'
import { QuizList } from './containers/QuizList/QuizList'
import { Auth } from './containers/Auth/Auth'
import { QuizCreator } from './containers/QuizCreator/QuizCreator'
import { Menu } from './Menu/Menu'
function App() {
  const [state, setState] = useState({
    authorized: true,
  })
  const quiz = (
    <QuizWrapper>
      <Quiz />
    </QuizWrapper>
  )

  let routes
  if (state.authorized) {
    routes = (
      <>
        <Routes>
          <Route path="/exit" element={<Auth />}></Route>
          <Route path="/quiz-creator" element={<QuizCreator />}></Route>
          <Route path="/quiz/:id" element={quiz}></Route>
          <Route path="/" element={<QuizList />}></Route>
        </Routes>
        <Menu authorized={state.authorized}></Menu>
      </>
    )
  } else {
    routes = (
      <>
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/quiz/:id" element={quiz}></Route>
          <Route path="/" element={<QuizList />}></Route>
        </Routes>
        <Menu authorized={state.authorized}></Menu>
      </>
    )
  }
  return routes
}

export default App
