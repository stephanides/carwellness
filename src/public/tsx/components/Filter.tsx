import * as React from 'react';
import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  dateFrom?: number
  dateTo?: number
  program: string[]
  orderState: string[]
  timeAscend: boolean

  changeDateFrom(dateFrom: number): void
  changeDateTo(dateTo: number): void
  changeOrderByTime(): void
  orderByTime(order: boolean): void
  orderByOrderState(orderState: number | null): void
  orderByOrderProgram(orderProgram: number | null): void
}

export class Filter extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)
  }
  private formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
 }
  public render(): JSX.Element {
    return(
      <table className='w-75 mb-3'>
        <tbody>
          <tr>
            <td>Filtrovať podľa:</td>
            <td>Dátum</td>
            <td>Stav objednávky</td>
            <td>Program</td>
            <td>Termín</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className="row">
                <div className="col">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">od</span>
                    </div>
                      <DatePicker
                        className="form-control"
                        selected={new Date(this.props.dateFrom)}
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => {
                          const newDate = Date.parse(e);

                          this.props.changeDateFrom(newDate);
                        }}
                      />
                  </div>
                </div>
                <div className="col">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">do</span>
                    </div>
                    <DatePicker
                      className="form-control"
                      selected={new Date(this.props.dateTo)}
                      dateFormat="dd/MM/yyyy"
                      onChange={(e) => {
                        const newDate = Date.parse(e);
                        
                        this.props.changeDateTo(newDate);
                      }}
                    />
                  </div>
                </div>
              </div>
            </td>
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
