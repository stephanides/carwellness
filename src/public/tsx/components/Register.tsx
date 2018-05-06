import * as React from 'react'
import { Link } from 'react-router-dom'
import { Form } from './Form'

interface Props {
  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void
}

export class Register extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return(
      <div className='container'>
        <h1>Register</h1>

        <Form formType='register' submitForm={this.props.submitForm} />
        <p>You allready have an account? <Link to='/admin/login'>Log in</Link> please.</p>
      </div>
    )
  }
}
