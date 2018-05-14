import * as React from 'react'

interface Props {
  formType: string

  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void
}

export const Form: Function = (props: Props) => {
  return(
    <form onSubmit={e => { props.submitForm(e, 'user/'+props.formType, props.formType) }}>
      {
        props.formType === 'register' ?
        [
          <div className='form-group' key={0}>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' id='firstName' className='form-control' placeholder='Enter your first name' required />
          </div>,
          <div className='form-group' key={1}>
            <label htmlFor='lastName'>Last Name</label>
            <input type='text' id='lastName' className='form-control' placeholder='Enter your last name' required />
          </div>
        ] : null
      }
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' className='form-control' placeholder='Enter your email' required />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' className='form-control' placeholder='Enter your password' required />
      </div>
      {
        props.formType === 'register' ?
        (
          <div className='form-group'>
            <label htmlFor='retypePassword'>Retype Password</label>
            <input type='password' id='retypePassword' className='form-control' placeholder='Retype Password' required />
          </div>
        ) : null
      }
      <div className='form-group'>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </div>
    </form>
  )
}
