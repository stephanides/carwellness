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
          this.props.availabilityDate ? 
          <div className=''>
            <h3><span className='badge badge-secondary'>{this.props.availabilityDate.replace(/-/g,'/')}</span></h3>
            {
              this.props.workingHours.map((item: Array<string>, i) => {
                return(
                  this.props.user.city > 0 ?
                  (
                    this.props.user.city > 1 ?
                    (
                       <div></div>//TODO FINISH THIS
                    ) : null
                  ) : null
                )
              })
            }
          </div> :
          <Calendar
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

/*
<div className='row mb-3' onChange={e => this.props.setDay(e)}>
  <div className='col-2'>
    <div className='form-check'>
      <input type='radio' className='form-check-input' defaultChecked value={0} name='day' />
      <label className='form-check-label'>
        Dnes <span className='badge badge-primary'>{ this.props.today }</span>
      </label>
    </div>
  </div>
  <div className='col-2'>
    <div className='form-check'>
      <input type='radio' className='form-check-input' value={1} name='day' />
      <label className='form-check-label'>
        Zajtra <span className='badge badge-primary'>{ this.props.tomorrow }</span>
      </label>
    </div>
  </div>
</div>

<div className='row mb-3'>
  <div className='col-2'>
    <div className='input-group'>
      <select>
        {
          this.props.workingHours.map((item, i) => {
            return(
              this.props.user.city > 0 ?
              (
                this.props.user.city > 1 ?
                (
                  this.props.dayOfWeek < 6 ?
                  <option key={i}>{item[0]+' - '+item[1]}</option> :
                  (
                    i > 1 ?
                    <option key={i}>{item[0]+' - '+item[1]}</option> : null
                  )
                )
                 :
                (
                  this.props.dayOfWeek < 6 ?
                  (
                    i > 1 ?
                    <option key={i}>{item[0]+' - '+item[1]}</option> : null
                  ) :
                  (
                    i > 2 ?
                    <option key={i}>{item[0]+' - '+item[1]}</option> : null
                  )
                )
              ) :
              <option key={i}>{item[0]+' - '+item[1]}</option>
            )
          })
        }
      </select>
    </div>
  </div>
</div>

<table className='table'>
  <tbody>
    <tr>
      {
        this.props.todayOrTomorrow > 0 ?
        this.props.tomorrowTimes.map((item, i) => {
          const items = this.props.workingHours.map((itm, j) => {
            return(
              this.props.user.city > 0 ?
              (
                this.props.user.city > 1 ?
                (
                  this.props.dayOfWeek < 6 ?
                  <td key={j}>{itm[0]+' - '+itm[1]}</td> :
                  (
                    i > i ?
                    <td key={j}>{itm[0]+' - '+itm[1]}</td> : null 
                  )
                )
                :
                this.props.dayOfWeek < 6 ?
                (
                  i > 1 ?
                  <td key={j}>{itm[0]+' - '+itm[1]}</td> : null
                ) :
                (
                  i > 2 ?
                  <td key={j}>{itm[0]+' - '+itm[1]}</td> : null
                )
              )
              :
              <td key={j}>{itm[0]+' - '+itm[1]}</td>
            )
          })

          return items                
        }) :
        this.props.todayTimes.map((item, i) => {
          const items = this.props.workingHours.map((itm, j) => {
            return(
              this.props.user.city > 0 ?
              (
                this.props.user.city > 1 ?
                (
                  this.props.dayOfWeek < 6 ?
                  <td key={j}>{itm[0]+' - '+itm[1]}</td> :
                  (
                    i > i ?
                    <td key={j}>{itm[0]+' - '+itm[1]}</td> : null 
                  )
                )
                :
                this.props.dayOfWeek < 6 ?
                (
                  i > 1 ?
                  <td key={j}>{itm[0]+' - '+itm[1]}</td> : null
                ) :
                (
                  i > 2 ?
                  <td key={j}>{itm[0]+' - '+itm[1]}</td> : null
                )
              )
              :
              <td key={j}>{itm[0]+' - '+itm[1]}</td>
            )
          })

          return items
        })
      }
    </tr>
  </tbody>
</table>
*/