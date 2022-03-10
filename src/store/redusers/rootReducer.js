import { combineReducers } from 'redux'
import quizCreatorReducer from './quizCreator'
import quizListReducer from './quizList'
// import { quizReducer } from './quiz'
export default combineReducers({
  quizList: quizListReducer,
  quizCreator: quizCreatorReducer,
  // quiz: quizReducer,
})
