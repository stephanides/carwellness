import * as React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from './Modal'
import { Form } from './Form'

interface Props {
  modalMessage?: string
  modalTitle?: string
  
  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void
}

export const Register: Function = (props: Props) => {
  return[
    <div className='container' key={1}>
      {
        Modal({
          modalMessage: props.modalMessage,
          modalTitle: props.modalTitle
        })
      }
      <h1>Register</h1>
      {
        Form({ formType: 'register', submitForm: props.submitForm})
      }
      <p>You allready have an account? <Link to='/admin/login'>Log in</Link> please.</p>
    </div>
  ]
}
