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
  const links = [
    { to: '/', label: 'Список' },
    { to: '/auth', label: 'Авторизация' },
    { to: '/quiz-creator', label: 'Создать тест' },
  ]
  return (
    <>
      <div className={cls.join(' ')} onClick={toggleMenu}>
        <span className={classes.Hamburger}></span>
      </div>
      <div className={bgCls.join(' ')} onClick={toggleMenu}>
        <div className={MenuCls.join(' ')}>
          <ul>
            {links.map((link, index) => {
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
