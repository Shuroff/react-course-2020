import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { QuizWrapper } from './Quiz/QuizWrapper'
import { Quiz } from './Quiz/quiz'
import { QuizList } from './containers/QuizList/QuizList'
import { Auth } from './containers/Auth/Auth'
import { QuizCreator } from './containers/QuizCreator/QuizCreator'
import { Menu } from './Menu/Menu'
function App() {
  const quiz = (
    <QuizWrapper>
      <Quiz />
    </QuizWrapper>
  )
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/quiz-creator" element={<QuizCreator />}></Route>
        <Route path="/quiz/:id" element={quiz}></Route>
        <Route path="/" element={<QuizList />}></Route>
      </Routes>
      <Menu></Menu>
    </>
  )
}

export default App
