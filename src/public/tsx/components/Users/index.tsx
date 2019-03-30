import * as React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../Nav'
import { IUserPayLoad } from '../../interfaces/UserPayLoad.interface'
import CreateEmployeeForm from './CreateEmployeeForm';

interface IProps {
  employeeList?: object[]
  user: IUserPayLoad
  usersList?: object[]
  
  signOut(): void
  changeUserApprovedProperty(updatedUsers: object[], callback?:() => void): void
  createEmployee(employee: object): Promise<void>
  getUsersList(): void
  getEmployees(city?: number): Promise<void>
  updateUser(user: object): void
}

export const Users: Function = (props: IProps) => {
  const {
    employeeList,
    user,
    usersList,
  } = props;

  if(!usersList || usersList.length === 0) {
    props.getUsersList();
  }

  if (!employeeList || employeeList.length < 1) {
    props.getEmployees(0);
  }

  return(
    <div className='admin-content'>
      {
        Nav({ user, signOut: props.signOut })
      }
      <div className='container-fluid'>
        <h3>Zoznam užívateľov</h3>
        <div className='list-group mb-2'>
          <div className='list-group-item'>
            <div className='row'>
              <div className='col d-flex justify-content-center align-items-center'>Dátum registrácie</div>
              <div className='col d-flex justify-content-center align-items-center'>Krstné meno</div>
              <div className='col d-flex justify-content-center align-items-center'>Priezvysko</div>
              <div className='col d-flex justify-content-center align-items-center'>e-mail</div>
              <div className='col d-flex justify-content-center align-items-center'>Schválený</div>
            </div>
          </div>
          {
            usersList && usersList.length > 0
              ? usersList.map((item, i) => {
              const date: Date = new Date(item['dateCreated'])
              const day: string = date.getDate() < 10 ? '0'+date.getDate() : String(date.getDate())
              const month: string = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : String(date.getMonth()+1)
              const year: number = date.getFullYear()
              const parsedDate: string = day+'/'+month+'/'+year

              return(
                <div className='list-group-item' key={i}>
                  <div className='row'>
                    <div className='col d-flex justify-content-center align-items-center'>{parsedDate}</div>
                    <div className='col d-flex justify-content-center align-items-center'>{item['firstName']}</div>
                    <div className='col d-flex justify-content-center align-items-center'>{item['lastName']}</div>
                    <div className='col d-flex justify-content-center align-items-center'>{item['email']}</div>
                    <div className='col d-flex justify-content-center align-items-center'>
                      <label className='switch'>
                        <input type='checkbox' checked={item['approved']} onChange={e => {
                          const users: Array<object> = props.usersList

                          users[i]['approved'] = item['approved'] ? false : true
                          
                          props.changeUserApprovedProperty(users, () => {
                            props.updateUser(item)
                          })
                        }} />
                        <span className='slider round'></span>
                      </label>                   
                    </div>
                  </div>
                </div>
              )
            }) : <div className='no-orders list-group-item d-flex justify-content-center align-items-center'>
              <div className='row'>
                <div className='col'>
                  <h6 className='text-center'>Neboli nájdení žiadni užívatelia</h6>
                </div>
              </div>
            </div>
          }
        </div>
        <CreateEmployeeForm
          createEmployee={props.createEmployee}
        />
        <div className='list-group mb-2'>
          <div className='list-group-item'>
            <div className="row">
              <div className="col-4 d-flex align-items-center">Meno zamestnanca</div>
              <div className="col-4 d-flex justify-content-center align-items-center">Prevádzka</div>
              <div className="col-4"></div>
            </div>
          </div>
          {
            employeeList && employeeList.length > 0 ?
            employeeList.map(({ city, name }: any, i: number) => {
              return (
                <div className="list-group-item" key={i}>
                  <div className="row">
                    <div className="col-4 d-flex align-items-center">{name}</div>
                    <div className="col-4 d-flex justify-content-center align-items-center">{city < 2 ? 'Nitra' : 'Žilina'}</div>
                    <div className="col-4"></div>
                  </div>
                </div>
              );
            }) : (
              <div className="row">
                <div className="col">
                  <h6 className='text-center'>Neboli nájdení žiadni užívatelia</h6>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}