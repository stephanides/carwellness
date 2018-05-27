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
  return(
    <div>
      {
        Modal({
          modalMessage: props.modalMessage,
          modalTitle: props.modalTitle
        })
      }
      <div className='container middle-content'>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-8 col-ls-12 m-auto'>
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
        </div>
      </div>
    </div>
  )
}
