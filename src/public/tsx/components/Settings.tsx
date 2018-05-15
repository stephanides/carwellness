import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from './Nav'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  user: UserPayLoad
  
  signOut(): void
}

export const Settings: Function = (props: Props) => {
  return(
    <div className='admin-content'>
      {
        Nav({ user: props.user, signOut: props.signOut })
      }
      <div className='container-fluid'>USER SETTINGS</div>
    </div>
  )
}