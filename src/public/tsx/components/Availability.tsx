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

  updateOrSubmitAvailability(i: number) {
    //TODO ISSUE with multiople update posts. Refactor this function

    if(this.props.availableDates && this.props.availableDates.length > 0) {
      for(let j: number = 0; j < this.props.availableDates.length; j++) {

        let itemDate = (this.props.availableDates[j]['date'].split('T')[0]).split('-')[2]+'-'+
          (this.props.availableDates[j]['date'].split('T')[0]).split('-')[1]+'-'+
          (this.props.availableDates[j]['date'].split('T')[0]).split('-')[0]

          console.log(this.props.availabilityDate)
          console.log(itemDate)

        if(itemDate === this.props.availabilityDate) {
          if(this.props.availableDates[j]['arrN'] === i) {
            let obj = this.props.availableDates[j]
            
            obj['available'] = this.props.workingHoursAvailability[i]
            this.props.updateAvailability(obj)
          }
          else this.props.submitAvailability(i)
        }
        else this.props.submitAvailability(i)
      }
    }
    else
      this.props.submitAvailability(i)
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
