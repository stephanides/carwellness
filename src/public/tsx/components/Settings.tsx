import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from './Nav'
import { IUserPayLoad } from '../interfaces/UserPayLoad.interface'

interface IProps {
  showHidePassword: boolean
  user: IUserPayLoad
  
  changeShowHidePassword(): void
  signOut(): void
}

export const Settings: Function = (props: IProps) => {
  return(
    <div className='admin-content'>
      {
        Nav({ user: props.user, signOut: props.signOut })
      }
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 m-auto'>
            <form>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Zmeniť heslo</label>
                <div className='input-group'>
                  <input type={ props.showHidePassword ? 'text' : 'password' } className='form-control' id='password' placeholder='Zmeniť heslo' />
                  <div className='input-group-append'>
                    <div className='input-group-text'>
                      <button type='button' onClick={props.changeShowHidePassword}>
                        {
                          props.showHidePassword ?
                          'Skryť heslo' : 'Zobraziť heslo'
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='form-group text-center'>
                <button type='submit' className='btn btn-primary'>Odoslať</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}