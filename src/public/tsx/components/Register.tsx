import * as React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from './Modal'
import { Form } from './Form'

interface Props {
  modalMessage?: string
  modalTitle?: string
  showHidePassword: boolean
  
  changeShowHidePassword(): void
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
      <h1>Registerácia</h1>
      {
        Form({
          formType: 'register',
          showHidePassword: props.showHidePassword,
          changeShowHidePassword: props.changeShowHidePassword,
          submitForm: props.submitForm
        })
      }
      <p>Už máte účet? <Link to='/admin/login'>Prihláste sa</Link> prosím.</p>
    </div>
  ]
}
