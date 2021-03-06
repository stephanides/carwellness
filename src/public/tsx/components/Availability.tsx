import * as React from 'react'
import Calendar from 'react-calendar/dist/entry.nostyle'
import { IUserPayLoad } from '../interfaces/UserPayLoad.interface'

interface IProps {
  availableDates?: Array<object>
  availabilityDate?: string
  city?: number
  dayOfWeek: number
  daysOfWeek: Array<string>
  user: IUserPayLoad
  workingHours: string[][]
  workingHoursAvailability: Array<boolean>

  changeAvailability(e: React.FormEvent<HTMLElement>, i: number): void
  changeCity(e: React.FormEvent<HTMLDivElement>): void
  setDay(e: string): void
  submitAvailability(i: number): void
  updateAvailability(item: object): void
}

export class Availability extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)

    this.updateOrSubmitAvailability = this.updateOrSubmitAvailability.bind(this)
  }

  private updateOrSubmitAvailability(num: number): void {
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

  public render() {
    return(
      this.props.availabilityDate && this.props.availabilityDate !== '' ? 
      (
        <div className='availability'>
          <div className='row'>
            <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12 m-auto'>
              <p>
                <button type='button' className='btn btn-link' onClick={() => { this.props.setDay('') }}>
                  <i className='fas fa-chevron-left'></i>
                </button>
                <span className='badge badge-light text-18'>
                  {
                    this.props.availabilityDate.replace(/-/g,'.')
                  }&nbsp;-&nbsp; 
                  {
                    this.props.daysOfWeek[this.props.dayOfWeek]
                  }
                </span>
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12 m-auto'>
              {
                this.props.user.city < 1 ?
                (
                  <div onChange={this.props.changeCity} className='row'>
                    <div className='col-6 ml-0 mr-auto'>
                      <div className='form-check form-check-inline'>
                        <input type='radio' id='nitra' value='1' name='nitra' checked={this.props.city < 2 ? true : false} readOnly />
                        <label className='form-check-label' htmlFor='nitra'>Nitra</label>
                      </div>
                      <div className='form-check form-check-inline'>
                        <input type='radio' id='zilina' value='2' name='zilina' checked={this.props.city < 2 ? false : true} readOnly />
                        <label className='form-check-label' htmlFor='zilina'>Žilina</label>
                      </div>
                    </div>
                  </div>
                ) : null
              }
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Čas od</th>
                    <th scope='col'>Čas do</th>
                    <th scope='col' className='text-center'>Dostupnosť</th>
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
                              i > 16  && i < this.props.workingHours.length - 5 ?
                              <tr key={i} className={this.props.workingHoursAvailability[i] ? 'bg-light' : 'bg-danger'}>
                                <td>{item[0]}</td><td>{item[1]}</td>
                                <td className='text-center'>
                                  <select disabled={this.props.user.city > 0 ? false : true}
                                    defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                    onChange={e => {
                                      this.props.changeAvailability(e, i)
                                      setTimeout(this.updateOrSubmitAvailability(i), 10)
                                    }}
                                  >
                                    <option value='0'>VOĽNÉ</option>
                                    <option value='1'>OBSADENÉ</option>
                                  </select>
                                </td>
                              </tr> : null
                            )
                              :
                            (
                              i > 16 && i < this.props.workingHours.length - 5 ?
                              <tr key={i} className={this.props.workingHoursAvailability[i] ? 'bg-light' : 'bg-danger'}>
                                <td>{item[0]}</td><td>{item[1]}</td>
                                <td className='text-center'>
                                  <select disabled={this.props.user.city > 0 ? false : true}
                                    defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                    onChange={e => {
                                      this.props.changeAvailability(e, i)
                                      setTimeout(this.updateOrSubmitAvailability(i), 10)
                                    }}
                                  >
                                    <option value='0'>VOĽNÉ</option>
                                    <option value='1'>OBSADENÉ</option>
                                  </select>
                                </td>
                              </tr> : null
                            )
                          ) : 
                          (
                            this.props.dayOfWeek < 6 && this.props.dayOfWeek != 0 ?
                            (
                              i > 16 && i < this.props.workingHours.length - 5 ?
                              <tr key={i} className={this.props.workingHoursAvailability[i] ? 'bg-light' : 'bg-danger'}>
                                <td>{item[0]}</td><td>{item[1]}</td>
                                <td className='text-center'>
                                  <select disabled={this.props.user.city > 0 ? false : true}
                                    defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                    onChange={e => {
                                      this.props.changeAvailability(e, i)
                                      setTimeout(this.updateOrSubmitAvailability(i), 10)
                                    }}
                                  >
                                    <option value='0'>VOĽNÉ</option>
                                    <option value='1'>OBSADENÉ</option>
                                  </select>
                                </td>
                              </tr> : null
                            ) :
                            (
                              i > 16 && i < this.props.workingHours.length - 5 ?
                              <tr key={i} className={this.props.workingHoursAvailability[i] ? 'bg-light' : 'bg-danger'}>
                                <td>{item[0]}</td><td>{item[1]}</td>
                                <td className='text-center'>
                                  <select disabled={this.props.user.city > 0 ? false : true}
                                    defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                    onChange={e => {
                                      this.props.changeAvailability(e, i)
                                      setTimeout(this.updateOrSubmitAvailability(i), 10)
                                    }}
                                  >
                                    <option value='0'>VOĽNÉ</option>
                                    <option value='1'>OBSADENÉ</option>
                                  </select>
                                </td>
                              </tr> : null
                            )
                          )
                        )
                        :
                        (
                          this.props.city > 1 ?
                          (
                          this.props.dayOfWeek < 6 && this.props.dayOfWeek != 0 ?
                            (
                              i > 16  && i < this.props.workingHours.length - 5 ?
                              <tr key={i} className={this.props.workingHoursAvailability[i] ? 'bg-light' : 'bg-danger'}>
                                <td>{item[0]}</td><td>{item[1]}</td>
                                <td className='text-center'>
                                  <select disabled={this.props.user.city > 0 ? false : true}
                                    defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                    onChange={e => {
                                      this.props.changeAvailability(e, i)
                                      setTimeout(this.updateOrSubmitAvailability(i), 10)
                                    }}
                                  >
                                    <option value='0'>VOĽNÉ</option>
                                    <option value='1'>OBSADENÉ</option>
                                  </select>
                                </td>
                              </tr> : null
                            ) :
                            (
                              i > 16 && i < this.props.workingHours.length - 5 ?
                              <tr key={i} className={this.props.workingHoursAvailability[i] ? 'bg-light' : 'bg-danger'}>
                                <td>{item[0]}</td><td>{item[1]}</td>
                                <td className='text-center'>
                                  <select disabled={this.props.user.city > 0 ? false : true}
                                    defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                    onChange={e => {
                                      this.props.changeAvailability(e, i)
                                      setTimeout(this.updateOrSubmitAvailability(i), 10)
                                    }}
                                  >
                                    <option value='0'>VOĽNÉ</option>
                                    <option value='1'>OBSADENÉ</option>
                                  </select>
                                </td>
                              </tr> : null
                            )
                          ) :
                          (
                            this.props.dayOfWeek < 6 && this.props.dayOfWeek != 0 ?
                            (
                              i > 16 && i < this.props.workingHours.length - 5 ?
                              <tr key={i} className={this.props.workingHoursAvailability[i] ? 'bg-light' : 'bg-danger'}>
                                <td>{item[0]}</td><td>{item[1]}</td>
                                <td className='text-center'>
                                  <select disabled={this.props.user.city > 0 ? false : true}
                                    defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                    onChange={e => {
                                      this.props.changeAvailability(e, i)
                                      setTimeout(this.updateOrSubmitAvailability(i), 10)
                                    }}
                                  >
                                    <option value='0'>VOĽNÉ</option>
                                    <option value='1'>OBSADENÉ</option>
                                  </select>
                                </td>
                              </tr> : null
                            ) :
                            (
                              i > 16 && i < this.props.workingHours.length - 5 ?
                              <tr key={i} className={this.props.workingHoursAvailability[i] ? 'bg-light' : 'bg-danger'}>
                                <td>{item[0]}</td><td>{item[1]}</td>
                                <td className='text-center'>
                                  <select disabled={this.props.user.city > 0 ? false : true}
                                    defaultValue={!this.props.workingHoursAvailability[i] ? '1' : '0'}
                                    onChange={e => {
                                      this.props.changeAvailability(e, i)
                                      setTimeout(this.updateOrSubmitAvailability(i), 10)
                                    }}
                                  >
                                    <option value='0'>VOĽNÉ</option>
                                    <option value='1'>OBSADENÉ</option>
                                  </select>
                                </td>
                              </tr> : null
                            )
                          )
                        )
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) :
      (
        <div className='availability'>
          <div className='row'>
            <div className='col-xl-6 col-lg-8 col-md-8 col-sm-12 m-auto'>
              <Calendar
                minDate={new Date()}
                value={new Date()}
                onClickDay={e => {
                  this.props.setDay(e)
                }}
              />
            </div>
          </div>
        </div>
      )
    )
  }
}
