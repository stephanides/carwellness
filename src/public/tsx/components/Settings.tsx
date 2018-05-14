import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from './Nav'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  user: UserPayLoad
  
  signOut(): void
}

export const Settings: Function = (props: Props) => {
  console.log('SETTINGS')
  console.log(props)

  return(
    <div className='admin-content'>
      {
        Nav({ user: props.user, signOut: props.signOut })
      }
      <div>USER SETTINGS</div>
    </div>
  )
}