import * as React from 'react'

interface Props {
  tabs: Array<object>
}

export const TabNav: Function = (props: Props) => {
  return(
    <ul className='nav nav-tabs nav-fill' role='tablist'>
      {
        props.tabs.map((item, i) => {
          return(
            <li className='nav-item' key={i}>
              <a
                className={i < 1 ? 'nav-link active' : 'nav-link'}
                id={item['param']+'-tab'}
                data-toggle='tab'
                role='tab'
                aria-controls={item['param']}
                aria-selected={i < 1 ? true : false}
                href={'#'+item['param']}
              >
                {item['title']}
              </a>
            </li>
          )
        })
      }      
    </ul>
  )
}