import * as React from 'react'

interface Props {
  program: Array<string>
  orderState: Array<string>

  orderByTime(order: boolean): void
  orderByOrderState(orderState: number | null): void
  orderByOrderProgram(orderProgram: number | null): void
}

export class Filter extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return(
      <table className='w-50 mb-3'>
        <tbody>
          <tr>
            <td>Filtrovať podľa:</td>
            <td>Stav objednávky</td>
            <td>Program</td>
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
                  this.props.orderByOrderProgram(null)
                }
  
                this.props.orderByOrderProgram(stateNum)
              }}>
                <option value='x'>VŠETKY</option>
                {
                  this.props.program.map((item, i) => <option value={i} key={i}>{item}</option>)
                }
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    )
  } 
}
