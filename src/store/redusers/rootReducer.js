import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { authReducer } from './authReducer'
import quizCreatorReducer from './quizCreator'
import quizListReducer from './quizList'
// import { quizReducer } from './quiz'
export default combineReducers({
  quizList: quizListReducer,
  quizCreator: quizCreatorReducer,
  auth: authReducer,
  app: appReducer,
  // quiz: quizReducer,
})
