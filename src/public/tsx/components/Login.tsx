import * as React from 'react'
import { Redirect } from 'react-router'
import { Modal } from './Modal'
import { Link } from 'react-router-dom'
import { Form } from './Form'

interface Props {
  authorised: boolean
  modalMessage: string
  modalTitle: string

  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void
}

export class Login extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return(
      this.props.authorised ? <Redirect to='/admin' /> :
      [
        <Modal
          modalMessage={this.props.modalMessage}
          modalTitle={this.props.modalTitle}

          key={0}
        />,
        <div className='container' key={1}>
          <h1>Log in</h1>

          <Form formType='login' submitForm={this.props.submitForm} />
          <p>You don't have an account? <Link to='/admin/register'>Register</Link> please.</p>
        </div>
      ]
    )
  }
}
