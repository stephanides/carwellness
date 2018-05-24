import * as React from 'react'
import Calendar from 'react-calendar/dist/entry.nostyle'
import { UserPayLoad } from '../interfaces/UserPayLoad.interface'

interface Props {
  availableDates?: Array<object>
  availabilityDate?: string
  dayOfWeek: number
  user: UserPayLoad
  //today: string
  //tomorrow: string
  //todayTimes: Array<boolean>
  //tomorrowTimes: Array<boolean>
  //todayOrTomorrow: number
  workingHours: string[][]
  workingHoursAvailability: Array<boolean>

  changeAvailability(e: React.FormEvent<HTMLElement>, i: number): void
  setDay(e: string): void
  submitAvailability(i: number): void
  updateAvailability(item: object): void
}

export class Availability extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)

    this.updateOrSubmitAvailability = this.updateOrSubmitAvailability.bind(this)
  }

  updateOrSubmitAvailability(num: number) {
    if(this.props.availableDates && this.props.availableDates.length > 0) {
      const dateFormattedForCheck: string = this.props.availabilityDate.split('-')[2]+'-'+this.props.availabilityDate.split('-')[1]+'-'+this.props.availabilityDate.split('-')[0]
      let toUpdate: boolean = false
      let objNum: number = 0

      for(let i: number = 0; i < this.props.availableDates.length; i++) {
        if(this.props.availableDates[i]['date'].split('T')[0] === dateFormattedForCheck) {
          if(this.props.availableDates[i]['arrN'] === num) {
            objNum = i
            toUpdate = true
          }
        }
      }

      if(toUpdate) {
        let obj = this.props.availableDates[objNum]
            
        obj['available'] = this.props.workingHoursAvailability[num]
        this.props.updateAvailability(obj)
      }
      else this.props.submitAvailability(num)
    }
    else this.props.submitAvailability(num)
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
                          (
                            i > 13  && i < this.props.workingHours.length - 5 ?
                            <tr key={i} className={this.props.workingHoursAvailability[i] ? '' : 'table-danger'}>
                              <td>{item[0]}</td><td>{item[1]}</td>
                              <td className='text-center'>
                                <select
                                  defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                  onChange={e => this.props.changeAvailability(e, i)}
                                >
                                  <option value='0'>VOĽNÉ</option>
                                  <option value='1'>OBSADENÉ</option>
                                </select>
                              </td>
                              <td className='text-center'>
                                <button
                                  className='btn btn-primary'
                                  onClick={() => this.updateOrSubmitAvailability(i)}
                                >Aktualizovať</button>
                              </td>
                            </tr> : null
                          )
                        	 :
                        	(
                        		i > 15 && i < this.props.workingHours.length - 5 ?
                        	  <tr key={i} className={this.props.workingHoursAvailability[i] ? '' : 'table-danger'}>
                              <td>{item[0]}</td><td>{item[1]}</td>
                              <td className='text-center'>
                                <select
                                  defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                  onChange={e => this.props.changeAvailability(e, i)}
                                >
                                  <option value='0'>VOĽNÉ</option>
                                  <option value='1'>OBSADENÉ</option>
                                </select>
                              </td>
                              <td className='text-center'>
                              <button
                                className='btn btn-primary'
                                onClick={() => this.updateOrSubmitAvailability(i)}
                                >Aktualizovať</button>
                              </td>
                            </tr> : null
                        	)
                        ) : 
                        (
                          this.props.dayOfWeek < 6 && this.props.dayOfWeek != 0 ?
                          (
                            i > 15 && i < this.props.workingHours.length - 5 ?
                            <tr key={i} className={this.props.workingHoursAvailability[i] ? '' : 'table-danger'}>
                              <td>{item[0]}</td><td>{item[1]}</td>
                              <td className='text-center'>
                                <select
                                  defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                  onChange={e => this.props.changeAvailability(e, i)}
                                >
                                  <option value='0'>VOĽNÉ</option>
                                  <option value='1'>OBSADENÉ</option>
                                </select>
                              </td>
                              <td className='text-center'>
                                <button
                                  className='btn btn-primary'
                                  onClick={() => this.updateOrSubmitAvailability(i)}
                                >Aktualizovať</button>
                              </td>
                            </tr> : null
                          ) :
                          (
                            i > 16 && i < this.props.workingHours.length - 5 ?
                            <tr key={i} className={this.props.workingHoursAvailability[i] ? '' : 'table-danger'}>
                              <td>{item[0]}</td><td>{item[1]}</td>
                              <td className='text-center'>
                                <select
                                  defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                  onChange={e => this.props.changeAvailability(e, i)}
                                >
                                  <option value='0'>VOĽNÉ</option>
                                  <option value='1'>OBSADENÉ</option>
                                </select>
                              </td>
                              <td className='text-center'>
                                <button
                                  className='btn btn-primary'
                                  onClick={() => this.updateOrSubmitAvailability(i)}
                                >Aktualizovať</button>
                              </td>
                            </tr> : null
                          )
                        )
                      )
                      :
                      i > 13 && i < this.props.workingHours.length - 5 ?
                      <tr key={i} className={this.props.workingHoursAvailability[i] ? '' : 'table-danger'}>
                        <td>{item[0]}</td><td>{item[1]}</td>
                        <td className='text-center'>
                          <select
                            defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                            onChange={e => this.props.changeAvailability(e, i)}
                          >
                            <option value='0'>VOĽNÉ</option>
                            <option value='1'>OBSADENÉ</option>
                          </select>
                        </td>
                        <td className='text-center'>
                          <button
                            className='btn btn-primary'
                            onClick={() => this.updateOrSubmitAvailability(i)}
                            >Aktualizovať</button>
                        </td>
                      </tr> : null
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
