import * as React from 'react'
import { Link } from 'react-router'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  user: UserPayLoad
}

export class Admin extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return(
      <div className='admin-content'>
        <nav className='navbar navbar-expand-lg navbar-light'>
          <div className='container'>
            <a className='navbar-brand'>
              <img src='../assets/images/logo.png' /><span>Admin</span>
            </a>
            <button type='button' data-toggle='collapse' data-target='navbarCollapse' className='navbar-toggler'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div id='navbarCollapse' className='collapse navbar-collapse justify-content-end'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  {this.props.user['firstName']}
                </li>
                <li className='nav-item'>
                  <button><i className='fas fa-sign-out-alt'></i></button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
