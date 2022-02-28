import { Link } from 'react-router-dom'
import './Finish.css'
export function Finish(props) {
  return (
    <div className="finish">
      <h5>Результаты теста:</h5>
      <ul>
        {props.answeredQuestions.map((question, index) => {
          let cls = ['fas']
          if (question[index]) {
            cls.push('fa-check')
          } else {
            cls.push('fa-times')
          }
          return (
            <li key={index} className={'answeredQuestions'}>
              <strong>{index + 1}. </strong>
              {props.questions[index].question}
              &nbsp;
              <i className={cls.join(' ')}></i>
            </li>
          )
        })}
      </ul>
      <button className="refresh" onClick={props.refresh}>
        Начать заново
      </button>
      <Link to={'/'}>
        <button className="toQuizes">Перейти в список тестов</button>
      </Link>
    </div>
  )
}
