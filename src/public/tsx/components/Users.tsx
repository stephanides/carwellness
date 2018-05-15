import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from './Nav'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  user: UserPayLoad
  usersList?: Array<object>
  
  signOut(): void
  getUsersList(): void
}

export const Users: Function = (props: Props) => {
  if(!props.usersList || props.usersList.length === 0)
    props.getUsersList()

  console.log(props.usersList)

  return(
    <div className='admin-content'>
      {
        Nav({ user: props.user, signOut: props.signOut })
      }
      <div className='container-fluid'>
        {
          props.usersList && props.usersList.length > 0 ?
          props.usersList.map((item, i) => {
            const date: Date = new Date(item['dateCreated'])
            const day: string = date.getDate() < 10 ? '0'+date.getDate() : String(date.getDate())
            const month: string = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : String(date.getMonth()+1)
            const year: number = date.getFullYear()
            const parsedDate: string = day+'/'+month+'/'+year

            return(
              <div className='list-item' key={i}>
                <div className='row'>
                  <div className='col'>{parsedDate}</div>
                  <div className='col'>{item['firstName']}</div>
                  <div className='col'>{item['lastName']}</div>
                  <div className='col'>{item['email']}</div>
                  <div className='col'>
                    <input type='checkbox' checked={item['approved']} onChange={() => {
                      console.log('Here we change checked to true/false')
                    }} />                    
                  </div>
                </div>
              </div>
            )
          }) : ('Nothing Found')
        }
      </div>
    </div>
  )
}