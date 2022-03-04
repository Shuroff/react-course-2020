import { useState } from 'react'
import classes from './Menu.module.css'
import { NavLink } from 'react-router-dom'
export function Menu(props) {
  const [active, setActive] = useState(false)

  const cls = [classes.HamburgerWrapper]
  const MenuCls = [classes.Menu]
  const bgCls = [classes.background]
  if (active) {
    cls.push(classes.Active)
    MenuCls.push(classes.MenuActive)
    bgCls.push(classes.none)
  }

  function toggleMenu() {
    setActive((prevState) => {
      return !prevState
    })
  }
  const links = [{ to: '/', label: 'Список' }]
  if (props.authorized) {
    links.push({ to: '/quiz-creator', label: 'Создать тест' })
    links.push({ to: '/exit', label: 'Выйти' })
  } else {
    links.push({ to: '/auth', label: 'Авторизация' })
  }
  return (
    <>
      <div className={cls.join(' ')} onClick={toggleMenu}>
        <span className={classes.Hamburger}></span>
      </div>
      <div className={bgCls.join(' ')} onClick={toggleMenu}>
        <div className={MenuCls.join(' ')}>
          <ul>
            {links.map((link, index) => {
              if (link.to === '/exit') {
                return (
                  <li key={link.label + index}>
                    <a
                      href="#"
                      onClick={(event) => {
                        event.preventDefault()
                        props.setAuthorized(false)
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              }
              return (
                <li key={link.label + index}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? classes.ActiveLink : ''
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
