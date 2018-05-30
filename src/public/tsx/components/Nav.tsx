import * as React from 'react'
import { Link } from 'react-router-dom'
import { IUserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  user: IUserPayLoad
  
  signOut(): void
}

export const Nav: Function = (props: Props) => {
  return(
    <nav className='navbar navbar-expand-lg navbar-light mb-3'>
      <div className='container'>
        <Link className='navbar-brand' to='/admin'>
          <img src='../assets/images/logo.png' />
          <span>
            {
              props.user.city > 0 ? (props.user.city > 1 ? 'Žilina' : 'Nitra') : 'BOSS'
            }
          </span>
        </Link>
        <button type='button' data-toggle='collapse' data-target='navbarCollapse' className='navbar-toggler'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div id='navbarCollapse' className='collapse navbar-collapse justify-content-end'>
          <ul className='navbar-nav'>
            <li className='nav-item position-relative'>
              {props.user['firstName']}
              <ul className='hover-nav'>
                {
                  props.user.role < 3 ?
                  <li>
                    <Link to='/admin/users'><i className='fas fa-address-book'></i>Užívateľské účty</Link>
                  </li> : null
                }
                <li>
                  <Link to='/admin/settings'><i className='fas fa-user-cog'></i>Nastavenie účtu</Link>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <button onClick={props.signOut}><i className='fas fa-sign-out-alt'></i></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}