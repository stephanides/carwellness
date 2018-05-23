import * as React from 'react'
import Calendar from 'react-calendar/dist/entry.nostyle'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  availabilityDate?: string
  dayOfWeek: number
  user: UserPayLoad
  //today: string
  //tomorrow: string
  todayTimes: Array<boolean>
  tomorrowTimes: Array<boolean>
  //todayOrTomorrow: number
  workingHours: string[][]

  changeAvailability(e: React.FormEvent<HTMLElement>): void
  setDay(e: string): void
}

export class Availability extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return(
      <div>
        {
          this.props.availabilityDate && this.props.availabilityDate !== '' ? 
          <div className=''>
            <h3>
              <button type='button' className='' onClick={() => { this.props.setDay('') }}>
                <i className='fas fa-chevron-left'></i>
              </button>
              <span className='badge badge-secondary'>{this.props.availabilityDate.replace(/-/g,'/')}</span>
            </h3>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Čas od</th>
                  <th scope='col'>Čas do</th>
                  <th scope='col' className='text-center'>Dostupnosť</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.workingHours.map((item: Array<string>, i) => {
                    return(
                      this.props.user.city > 0 ?
                      (
                        this.props.user.city > 1 ?
                        (
                        	this.props.dayOfWeek < 6 && this.props.dayOfWeek != 0 ?
                        	<tr key={i}>
                            <td>{item[0]}</td><td>{item[1]}</td>
                            <td className='text-center'>
                              <select onChange={e => this.props.changeAvailability(e)}>
                                <option value='0'>VOĽNÉ</option>
                                <option value='1'>OBSADENÉ</option>
                              </select>
                            </td>
                            <td className='text-center'><button className='btn btn-primary'>Aktualizovať</button></td>
                          </tr> :
                        	(
                        		i > 1 ?
                        	  <tr key={i}>
                              <td>{item[0]}</td><td>{item[1]}</td>
                              <td className='text-center'>
                                <select onChange={e => this.props.changeAvailability(e)}>
                                  <option value='0'>VOĽNÉ</option>
                                  <option value='1'>OBSADENÉ</option>
                                </select>
                              </td>
                              <td className='text-center'><button className='btn btn-primary'>Aktualizovať</button></td>
                            </tr> : null
                        	)
                        ) : 
                        (
                          this.props.dayOfWeek < 6 && this.props.dayOfWeek != 0 ?
                          (
                            i > 1 ?
                            <tr key={i}>
                              <td>{item[0]}</td><td>{item[1]}</td>
                              <td className='text-center'>
                                <select onChange={e => this.props.changeAvailability(e)}>
                                  <option value='0'>VOĽNÉ</option>
                                  <option value='1'>OBSADENÉ</option>
                                </select>
                              </td>
                              <td className='text-center'><button className='btn btn-primary'>Aktualizovať</button></td>
                            </tr> : null
                          ) :
                          (
                            i > 2 ?
                            <tr key={i}>
                              <td>{item[0]}</td><td>{item[1]}</td>
                              <td className='text-center'>
                                <select onChange={e => this.props.changeAvailability(e)}>
                                  <option value='0'>VOĽNÉ</option>
                                  <option value='1'>OBSADENÉ</option>
                                </select>
                              </td>
                              <td className='text-center'><button className='btn btn-primary'>Aktualizovať</button></td>
                            </tr> : null
                          )
                        )
                      ) : <tr key={i}>
                            <td>{item[0]}</td><td>{item[1]}</td>
                            <td className='text-center'>
                              <select onChange={e => this.props.changeAvailability(e)}>
                                <option value='0'>VOĽNÉ</option>
                                <option value='1'>OBSADENÉ</option>
                              </select>
                            </td>
                            <td className='text-center'><button className='btn btn-primary'>Aktualizovať</button></td>
                          </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div> :
          <Calendar
            minDate={new Date()}
            value={new Date()}
            onClickDay={e => {
              this.props.setDay(e)
            }}
          />
        }
      </div>
    )
  }
}
