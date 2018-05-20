import * as React from 'react'

interface Props {
  boss: number
  list?: Array<object>

  getList(): void
}

export class Claims extends React.Component <Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.props.getList()
  }

  render() {
    return(
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th className='text-center' scope='col'>#</th>
              {
                this.props.boss === 0 ?
                <th className='text-center' scope='col'>Prevádzka</th> : null
              }
              <th className='text-center' scope='col'>Čas vytvorenia rekl.</th>
              <th className='text-center' scope='col'>Obr.</th>
              <th className='text-center' scope='col'>Meno</th>
              <th className='text-center' scope='col'>Telefón</th>
              <th className='text-center' scope='col'>E-mail</th>
            </tr>
           </thead>
           <tbody>
             {
                this.props.list && this.props.list.length > 0 ? this.props.list.map((item, i) => {
                  const dt: Date = new Date(item['date'])
                  const day: number = dt.getDate()
                  const month: string = dt.getMonth() < 10 ? '0'+(dt.getMonth()+1) : String((dt.getMonth()+1))
                  const year: number = dt.getFullYear()
                  const h: string = dt.getUTCHours() < 10 ? '0'+dt.getUTCHours() : String(dt.getUTCHours())
                  const min: string = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : String(dt.getMinutes())
                  
                  return(
                    <tr key={i}>
                      <th className='text-center' scope='row'>{i+1}</th>
                      {
                        this.props.boss === 0 ?
                        (
                          item['city'] < 2 ?
                          <td className='text-center'>Nitra</td> :
                          <td className='text-center'>Žilina</td>
                        ) : null
                      }
                      <td className='text-center'>{day+'/'+month+'/'+year+' - '+h+':'+min}</td>
                      <td className='text-center'>{item['image'] ? <img src={item['image']['src']} /> : 'Obrázok nie je k dispozícii'}</td>
                      <td className='text-center'>{item['fullName']}</td>
                      <td className='text-center'>{item['phone']}</td>
                      <td className='text-center'>{item['email']}</td>
                    </tr>
                  )
                }) :
                <tr>
                  <td colSpan={7}>
                    <h6 className='text-center'>Neboli nájdené žiadne reklamácie</h6>
                  </td>
                </tr> 
             }
           </tbody>
        </table>
      </div>
    )
  }
}
