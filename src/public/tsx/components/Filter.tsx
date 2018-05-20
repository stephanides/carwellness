import * as React from 'react'

interface Props {
  program: Array<string>
  orderState: Array<string>

  orderByTime(): void
  orderByOrderState(orderState: number | null): void
  orderByOrderProgram(orderProgram: number | null): void
}

export const Filter: Function = (props: Props) => {
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
            <select onChange={e => {
              const stateNum: number = e.currentTarget.options[e.currentTarget.selectedIndex].value !== 'x' ?
                parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].value) : null

              props.orderByOrderState(stateNum)
            }}>
              <option value='x'>VŠETKY</option>
              {
                props.orderState.map((item, i) => <option value={i} key={i}>{item}</option>)
              }
            </select>
          </td>
          <td>
            <select onChange={e => {
              const stateNum: number = e.currentTarget.options[e.currentTarget.selectedIndex].value !== 'x' ?
                parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].value) : null

              props.orderByOrderProgram(stateNum)
            }}>
              <option value='x'>VŠETKY</option>
              {
                props.program.map((item, i) => <option value={i} key={i}>{item}</option>)
              }
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  )  
}
