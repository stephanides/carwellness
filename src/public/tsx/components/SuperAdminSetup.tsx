import * as React from 'react'
import { Form } from './Form'
import { Modal } from './Modal'

interface IProps {
  modalMessage?: string
  modalTitle?: string
  showHidePassword: boolean
  
  changeShowHidePassword(): void
  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void
}

export const SuperAdminSetup: Function = (props: IProps) => {
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
            <h3>Nastavenie administrátorského účtu</h3>
            {
              Form({
                formType: 'setup',
                showHidePassword: props.showHidePassword,
                changeShowHidePassword: props.changeShowHidePassword,
                submitForm: props.submitForm
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}