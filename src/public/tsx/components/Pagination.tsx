import * as React from 'react'

interface Props {
  order: boolean
  page: number
  pagesCount: number

  changePage(page: number, order: boolean): void
}

export const Pagination: Function = (props:Props) => {
  let pageItemBtn: Array<JSX.Element> = []

  for(let i: number = 0; i < props.pagesCount; i++)
    pageItemBtn.push(
      <li className={props.page === i ? 'page-item active' : 'page-item'} key={i}>
        <button
          type='button'
          className='page-link btn-link'
          onClick={() => {
            props.changePage(i, props.order)
          }}
        >
          {i+1}
        </button>
      </li>
    )

  return(
    <nav aria-label='Page navigation'>
      <ul className='pagination'>
        <li className={props.page > 0 ? 'page-item' : 'page-item disabled'}>
          <button
            type='button'
            disabled={props.page > 0 ? false : true}
            className='page-link btn-link'
            onClick={() => props.changePage(props.page - 1, props.order)}
          >
            Previous
          </button>
        </li>
        {
          pageItemBtn
        }
        <li className={props.page === props.pagesCount ? 'page-item disabled' : 'page-item'}>
          <button
            type='button'
            disabled={props.page === (props.pagesCount - 1) ? true : false}
            className='page-link btn-link'
            onClick={() => props.changePage(props.page + 1, props.order)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}