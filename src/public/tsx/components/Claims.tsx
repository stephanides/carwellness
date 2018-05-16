import * as React from 'react'

interface Props {
  boss: number
  list?: Array<object>

  getList(): void
}

export const Claims: Function = (props: Props) => {
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
          <div className='col text-center'>Obr.</div>
          <div className='col text-center'>Meno</div>
          <div className='col text-center'>Telefón</div>          
          <div className='col text-center'>E-mail</div>
        </div>
      </div>
      {
        props.list && props.list.length > 0 ? props.list.map((item, i) => {
          const dt: Date = new Date(parseInt(item['date']))
          const day: number = dt.getDate()
          const month: string = dt.getMonth() < 10 ? '0'+(dt.getMonth()+1) : String((dt.getMonth()+1))
          const year: number = dt.getFullYear()
          
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
                <div className='col text-center align-items-center'>{day+'/'+month+'/'+year}</div>
                <div className='col text-center align-items-center'>{item['image']['src']}</div>
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
              <h6 className='text-center'>Neboli nájdené žiadne reklamácie</h6>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
