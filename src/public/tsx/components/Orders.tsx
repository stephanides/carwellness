import * as React from 'react'

const program: Array<string> = ['COMFORT', 'EXCLUSIVE', 'EXTERIÉR', 'INTERIÉR', 'PREMIUM EXTERIÉR', 'PREMIUM INTERIÉR', 'AVANGARDE', 'TOP GLANZ']

interface Props {
  boss: number
  list?: Array<object>

  getList(): void
}

export const Orders: Function = (props: Props) => {
  if(!props.list || props.list.length === 0)
    props.getList()

  return(
    <div className='list-group order-list-container'>
      <div className='list-group-item'>
        <div className='row'>
          {
            props.boss === 0 ?
            <div className='col text-center'>Mesto</div> : null 
          }
          <div className='col text-center'>Termín</div>
          <div className='col text-center'>Program</div>
          <div className='col text-center'>Typ auta</div>
          <div className='col text-center'>Meno</div>
          <div className='col text-center'>Telefón</div>          
          <div className='col text-center'>E-mail</div>
        </div>
      </div>
      {
        props.list && props.list.length > 0 ? props.list.map((item, i) => {
          const dt: Date = new Date(item['date'])
          const day: number = dt.getDate()
          const month: string = dt.getMonth() < 10 ? '0'+(dt.getMonth()+1) : String((dt.getMonth()+1))
          const year: number = dt.getFullYear()
          const h: string = dt.getUTCHours() < 10 ? '0'+dt.getUTCHours() : String(dt.getUTCHours())
          const min: string = dt.getMinutes() < 10 ? '0'+dt.getMinutes() : String(dt.getMinutes())

          let programs: string = ''

          for(let i: number = 0; i < item['program'].length; i++)
            if(item['program'][i])
              programs += program[i]+' '

          return(
            <div className='list-group-item' key={i}>
              <div className='row align-items-center'>
                {
                  props.boss === 0 ? (
                    item['city'] < 2 ?
                    <div className='col text-center align-items-center'>Nitra</div> :
                    <div className='col text-center align-items-center'>Žilina</div>
                  ) : null
                }
                <div className='col text-center align-items-center'>{day+'/'+month+'/'+year+' - '+h+':'+min}</div>
                <div className='col text-center align-items-center'>{programs}</div>
                <div className='col text-center align-items-center'>{item['carType']}</div>
                <div className='col text-center align-items-center'>{item['fullName']}</div>
                <div className='col text-center align-items-center'>{item['phone']}</div>
                <div className='col text-center align-items-center'>{item['email']}</div>
              </div>
            </div>
          )
        }) :
        <div className='no-orders list-group-item d-flex justify-content-center align-items-center'>
          <div className='row'>
            <div className='col'>
              <h6 className='text-center'>Neboli nájdené žiadne objednávky</h6>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
