import * as React from 'react'

interface IProps {
  formType: string
  showHidePassword: boolean

  changeShowHidePassword(): void
  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void
}

export const Form: Function = (props: IProps) => {
  return(
    <form onSubmit={e => { props.submitForm(e, 'user/'+(props.formType === 'login' ? 'login' : 'register'), props.formType) }}>
      {
        props.formType === 'register' || props.formType === 'setup' ?
        [
          <div className='form-group' key={0}>
            <label htmlFor='firstName'>Krstné meno</label>
            <input type='text' id='firstName' className='form-control' placeholder='Zadajte svoje krstné meno' required />
          </div>,
          <div className='form-group' key={1}>
            <label htmlFor='lastName'>Priezvisko</label>
            <input type='text' id='lastName' className='form-control' placeholder='Zadajte svoje priezvisko' required />
          </div>
        ] : null
      }
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' className='form-control' placeholder='Zadajte svoj email' required />
      </div>
      {
        props.formType === 'register' ?
        <div className='form-group'>
          <label htmlFor='city'>Zvoľte mesto</label>
          <select className='form-control' defaultValue='' id='city' required>
            <option value='' disabled>Zvoľte mesto</option>
            <option value='1'>Nitra</option>
            <option value='2'>Žilina</option>
          </select>
        </div> : null
      }
      <div className='form-group'>
        <label htmlFor='password'>Heslo</label>
        <div className='input-group'>
          <input type={!props.showHidePassword ? 'password' : 'text'} id='password' className='form-control' placeholder='Zadajte svoje heslo' required />
          <div className='input-group-append'>
            <span className='input-group-text' id='basic-addon2'>
              <button type='button' onClick={props.changeShowHidePassword}>
                {
                  !props.showHidePassword ? 'Zobraziť heslo' : 'Skryť heslo'
                }
              </button>
            </span>
          </div>
        </div>
      </div>
      {
        props.formType === 'register' || props.formType === 'setup' ?
        (
          <div className='form-group'>
            <label htmlFor='retypePassword'>Znovu zadajte svoje heslo</label>
            <input type='password' id='retypePassword' className='form-control' onChange={() => { checkPassword() }} placeholder='Znovu zadajte svoje heslo' required />
          </div>
        ) : null
      }
      <div className='form-group'>
        <button type='submit' className='btn btn-outline-primary'>{props.formType === 'register' || props.formType === 'setup' ? 'Zaregistrovať' : 'Prihlásiť'}</button>
      </div>
    </form>
  )
}

const checkPassword: Function = () => {
  const password: HTMLInputElement = document.getElementById('password') as HTMLInputElement
  const retypePassword: any = document.getElementById('retypePassword') as HTMLInputElement

  if(password && retypePassword) {
    if(password.value != retypePassword.value) {
      retypePassword.setCustomValidity('Heslá sa nezhodujú!')
      retypePassword.reportValidity()
    }
    else retypePassword.setCustomValidity('')
  }
}
