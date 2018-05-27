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
    <div className='row'>
      <div className='col-xl-6 col-lg-6 col-md-8 col-ls-12 m-auto'>
        <h1 className='mt-3'>Prihlásenie</h1>
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
    </div>
  </div>
}
