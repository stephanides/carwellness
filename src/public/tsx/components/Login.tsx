import * as React from 'react'
import { Redirect } from 'react-router'
import { Modal } from './Modal'
import { Link } from 'react-router-dom'
import { Form } from './Form'

interface Props {
  authorised: boolean
  modalMessage?: string
  modalTitle: string

  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void
}

export const Login: Function = (props: Props) => {
  return props.authorised ?
  <Redirect to='/admin' /> :
  <div className='container' key={1}>
    {
      Modal({
        modalMessage: props.modalMessage,
        modalTitle: props.modalTitle
      })
    }
    <h1>Log in</h1>
    {
      Form({ formType: 'login', submitForm: props.submitForm })
    }
    <p>You don't have an account? <Link to='/admin/register'>Register</Link> please.</p>
  </div>
}
