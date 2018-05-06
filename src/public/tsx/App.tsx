import * as React from 'react'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Redirect, Switch } from 'react-router'
import { Admin } from './components/Admin'
import { Login } from './components/Login'
import { Modal } from './components/Modal'
import { Register } from './components/Register'
import { UserPayLoad } from './interfaces/UserPayLoad.interface'

const history = createBrowserHistory()

interface State {
  authorised: boolean
  modalMessage?: string
  modalTitle?: string
  login: boolean
  user?: UserPayLoad
}

const initialState: State = {
  authorised: false,
  login: true
} 

export class App extends React.Component<{}, State> {
  private myStorage: Storage

  constructor(props: State) {
    super(props)

    this.myStorage = localStorage
    this.state = initialState

    this.authenticate = this.authenticate.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.storeUserData = this.storeUserData.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  authenticate(): void {
    const user: UserPayLoad | null = this.getUserData() as UserPayLoad

    if(user)
      this.setState({ authorised: true, user: user })
  }

  getUserData() {
    let user: object | null = {} as UserPayLoad

    if(this.myStorage.getItem('token') && this.myStorage.getItem('uFN')) {
      user = {
        token: this.myStorage.getItem('token'),
        firstName: this.myStorage.getItem('uFN')
      }
    }
    else
      user = null

    return user
  }

  handleModal(message: string, success: boolean) {
    const title: string = success ? '' : 'Chyba'

    console.log('MODAL')
    console.log(success)

    this.setState({ modalMessage: message, modalTitle: title }, () => { $('#modal').modal('show') })
  }

  storeUserData(data: object): void {
    this.myStorage.setItem('token', data['token'])
    this.myStorage.setItem('uFN', data['firstName'])

    this.authenticate()
  }

  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void {
    event.preventDefault()

    let data: object = {}
    const self: any = this
    const form: HTMLElement = event.currentTarget as HTMLElement
    const formInputs: any = form.getElementsByTagName('input')
    const _url: string = location.protocol+'//'+location.host+'/'+url

    for(let i: number = 0; i < formInputs.length; i++)
      data[formInputs[i]['id']] = formInputs[i].value

    const xhttp = new XMLHttpRequest()

    xhttp.open('POST', _url, true)    
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.onreadystatechange = () => {
      if(xhttp.readyState === 4) {
        const resp = JSON.parse(xhttp.response)

        if(xhttp.status === 200) {
          if(action === 'login') {
            if(resp['user']['approved']) {
              const data: UserPayLoad = {
                token: resp.token,
                firstName: resp.user.firstName
              }

              self.storeUserData(data)
            }
            else self.handleModal('Váš účet zatiaľ nebol schválený. Skúste neskôr prosím.', resp['success'])
          }
          else self.handleModal(resp['message'], resp['success'])
        }
        else self.handleModal(resp['message'], resp['success'])
      }
    }

    xhttp.send(JSON.stringify(data))
  }

  componentDidMount() {
    this.authenticate()
  }

  render() {
    return(
      <Router history={history}>
        <Switch>
          <Route exact path='/admin' render={() => (
            this.state.authorised ?
            <Admin
              user={this.state.user}
            /> :
            <Redirect to='/admin/login' />
          )} />
          <Route path='/admin/login' render={() => (
            <Login
              authorised={this.state.authorised}
              modalMessage={this.state.modalMessage}
              modalTitle={this.state.modalTitle}

              submitForm={this.submitForm}
            />
          )} />
          <Route path='/admin/register' render={() => (
            <Register
              modalMessage={this.state.modalMessage}
              modalTitle={this.state.modalTitle}

              submitForm={this.submitForm}
            />
          )} />
        </Switch>
      </Router>
    )
  }
}
