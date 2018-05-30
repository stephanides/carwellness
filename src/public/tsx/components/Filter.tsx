import * as React from 'react'

interface IProps {
  program: string[]
  orderState: string[]
  timeAscend: boolean

  changeOrderByTime(): void
  orderByTime(order: boolean): void
  orderByOrderState(orderState: number | null): void
  orderByOrderProgram(orderProgram: number | null): void
}

export class Filter extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)
  }
  public render(): JSX.Element {
    return(
      <table className='w-50 mb-3'>
        <tbody>
          <tr>
            <td>Filtrovať podľa:</td>
            <td>Stav objednávky</td>
            <td>Program</td>
            <td>Dátum</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <select className='form-control' ref='orderFilter' onChange={e => {
                const stateNum: number = e.currentTarget.options[e.currentTarget.selectedIndex].value !== 'x' ?
                  parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].value) : null
                const programFilter: HTMLSelectElement = this.refs.programFilter as HTMLSelectElement
  
                if(programFilter.options.selectedIndex > 0) {
                  programFilter.options.selectedIndex = 0
                  this.props.orderByOrderProgram(null)
                }
                
                this.props.orderByOrderState(stateNum)
              }}>
                <option value='x'>VŠETKY</option>
                {
                  this.props.orderState.map((item, i) => <option value={i} key={i}>{item}</option>)
                }
              </select>
            </td>
            <td>
              <select className='form-control' ref='programFilter' onChange={e => {
                const stateNum: number = e.currentTarget.options[e.currentTarget.selectedIndex].value !== 'x' ?
                  parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].value) : null
                const orderFilter: HTMLSelectElement = this.refs.orderFilter as HTMLSelectElement

                if(orderFilter.options.selectedIndex > 0) {
                  orderFilter.options.selectedIndex = 0
                  this.props.orderByOrderState(null)
                }
  
                this.props.orderByOrderProgram(stateNum)
              }}>
                <option value='x'>VŠETKY</option>
                {
                  this.props.program.map((item, i) => <option value={i} key={i}>{item}</option>)
                }
              </select>
            </td>
            <td>
              <button
                type='button'
                className='btn btn-primary'
                onClick={this.props.changeOrderByTime}
              >{this.props.timeAscend ? 'Najnovšie' : 'Najstaršie'}</button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  } 
}
