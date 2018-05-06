import * as React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from './Modal'
import { Form } from './Form'

interface Props {
  modalMessage: string
  modalTitle: string
  
  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void
}

export class Register extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return[
      <Modal
          modalMessage={this.props.modalMessage}
          modalTitle={this.props.modalTitle}

          key={0}
        />,
      <div className='container' key={1}>
        <h1>Register</h1>

        <Form formType='register' submitForm={this.props.submitForm} />
        <p>You allready have an account? <Link to='/admin/login'>Log in</Link> please.</p>
      </div>
    ]
  }
}
