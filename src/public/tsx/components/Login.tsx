import * as React from 'react'
import { Redirect } from 'react-router'
import { Modal } from './Modal'
import { Link } from 'react-router-dom'
import { Form } from './Form'

interface Props {
  authorised: boolean
  modalMessage?: string
  modalTitle: string
  showHidePassword: boolean

  changeShowHidePassword(): void
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
    <h1>Prihlásenie</h1>
    {
      Form({
          formType: 'login',
          showHidePassword: props.showHidePassword,
          changeShowHidePassword: props.changeShowHidePassword,
          submitForm: props.submitForm
        })
    }
    <p>Nemáte účet? <Link to='/admin/register'>Zaregistrujte sa</Link> prosím.</p>
  </div>
}
