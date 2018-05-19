import * as React from 'react'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Redirect, Switch } from 'react-router'
import { Admin } from './components/Admin'
import { Login } from './components/Login'
import { Link } from 'react-router-dom'
import { Register } from './components/Register'
import { Settings } from './components/Settings'
import { Users } from './components/Users'
import { UserPayLoad } from './interfaces/UserPayLoad.interface'
//import * as WebSocket from 'ws'
const history = createBrowserHistory()

interface State {
  authorised: boolean
  modalMessage?: string | JSX.Element
  modalTitle?: string
  login: boolean
  orderList?: Array<object> | null
  orderedOrderList?: Array<object> | null
  orderState: Array<string>
  program: Array<string>
  paginationItemCount: number
  claimList?: Array<object> | null
  showHidePassword: boolean
  user?: UserPayLoad
  usersList?: Array<object> | null
}

const initialState: State = {
  authorised: false,
  login: true,
  program: ['COMFORT', 'EXCLUSIVE', 'EXTERIÉR', 'INTERIÉR', 'PREMIUM EXTERIÉR', 'PREMIUM INTERIÉR', 'AVANGARDE', 'TOP GLANZ'],
  paginationItemCount: 10,
  orderState: ['NOVÁ', 'VYBAVUJE SA', 'VYBAVENÁ'],
  showHidePassword: false
}

export class App extends React.Component<{}, State> {
  private myStorage: Storage
  private ws: WebSocket
  
  constructor(props: State) {
    super(props)

    this.myStorage = localStorage
    this.state = initialState
    //this.ws = new WebSocket('ws:/localhost:4141/order/order-create')
    this.authenticate = this.authenticate.bind(this)
    this.changeUserApprovedProperty = this.changeUserApprovedProperty.bind(this)
    this.changeShowHidePassword = this.changeShowHidePassword.bind(this)
    this.changeOrders = this.changeOrders.bind(this)
    this.getOrderList = this.getOrderList.bind(this)
    this.getClaimList = this.getClaimList.bind(this)
    this.getUsersList = this.getUsersList.bind(this)
    this.handleModal = this.handleModal.bind(this)
    //this.onWebSockets = this.onWebSockets.bind(this)
    this.orderByTime = this.orderByTime.bind(this)
    this.orderByOrderState = this.orderByOrderState.bind(this)
    this.orderByOrderProgram = this.orderByOrderProgram.bind(this)
    this.signOut = this.signOut.bind(this)
    this.storeUserData = this.storeUserData.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.updateOrder = this.updateOrder.bind(this)
  }

  authenticate(): void {
    const user: UserPayLoad | null = this.getUserData() as UserPayLoad

    if(user)
      this.setState({ authorised: true, user: user })
  }

  changeUserApprovedProperty(updatedUsers: Array<object>, callback?:() => void) {
    this.setState({ usersList: updatedUsers }, () => {
      if(typeof callback === 'function')
        callback()
    })
  }

  changeShowHidePassword() {
    if(this.state.showHidePassword)
      this.setState({ showHidePassword: false })
    else
      this.setState({ showHidePassword: true })
  }

  async getOrderList() {
    const url = '/order/orders/'+this.state.user.city
    const resp: Response = await fetch(url)

    if(resp) {
      if(resp.status === 200) {
        const respJSON: Array<object> = await resp.json()

        if(respJSON)
          this.setState({ orderList: respJSON['data'] }, this.orderByTime)
      }
      else
        console.log(resp.statusText)
    }
  }

  orderByTime() {
    if(this.state.orderList && this.state.orderList.length > 0) {
      let arr: Array<object> = []

      if(this.state.orderList.length > this.state.paginationItemCount) {
        for(let i: number = 0; i < this.state.paginationItemCount; i++) //this.state.orderList.length
          arr.push(this.state.orderList[i])

        arr.sort((a: object, b: object) => ( a['date'].toLowerCase().localeCompare(b['date'].toLowerCase()) ))
        this.setState({ orderedOrderList: arr })
      }
    }
  }

  orderByOrderState(orderState: number | null) {
    let arr: Array<object> = []

    if(orderState === null)
      this.setState({ orderedOrderList: this.state.orderList })
    else {
      for(let i: number = 0; i < this.state.orderList.length; i++) {
        if(this.state.orderList[i]['orderState'] === orderState)
          arr.push(this.state.orderList[i])
      }

      this.setState({ orderedOrderList: arr })
    }
  }

  orderByOrderProgram(orderProgram: number | null) {
    let arr: Array<object> | null = []

    if(orderProgram === null)
      this.setState({ orderedOrderList: this.state.orderList })
    else {
      for(let i: number = 0; i < this.state.orderList.length; i++) {
        if(this.state.orderList[i]['program'][orderProgram])
          arr.push(this.state.orderList[i])
      }

      if(arr.length < 1)
        arr = null

      this.setState({ orderedOrderList: arr })
    }
  }

  changeOrders(orders: Array<object>) {
    this.setState({ orderList: orders })
  }

  async updateOrder(order: object, callBack?: () => void) {
    const url: string = '/order/orders/'+order['_id']
    const data: object = order

    const response: Response = await fetch(url, {
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
      method: 'PUT'
    })

    if(response) {
      if(response.status === 200) {
        const responseJSON: object = await response.json()

        if(responseJSON['success']) {
          console.log(responseJSON['message'])

          if(typeof callBack === 'function')
            callBack()
        }
        else
          console.log(responseJSON['message'])
      }
      else
        console.log(response.statusText)
    }
  }

  async getClaimList() {
    const url = '/claim/claims/'+this.state.user.city
    const resp: Response = await fetch(url)

    if(resp) {
      if(resp.status === 200) {
        const respJSON: Array<object> = await resp.json()

        if(respJSON)
          this.setState({ claimList: respJSON['data'] })
      }
      else
        console.log(resp.statusText)
    }
  }

  getUserData() {
    let user: object | null = {} as UserPayLoad

    if(this.myStorage.getItem('token') && this.myStorage.getItem('uFN')) {
      user = {
        token: this.myStorage.getItem('token'),
        firstName: this.myStorage.getItem('uFN'),
        role: parseInt(this.myStorage.getItem('uR')),
        city: parseInt(this.myStorage.getItem('cI'))
      }
    }
    else user = null

    return user
  }

  async updateUser(user: object) {
    const url: string = '/user/user/'+user['_id']
    const data: object = user

    const response: Response = await fetch(url, {
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
      method: 'PUT'
    })

    if(response) {
      if(response.status === 200) {
        const responseJSON: object = await response.json()

        if(responseJSON['success'])
          console.log(responseJSON['message'])
        else
          console.log(responseJSON['message'])
      }
      else
        console.log(response.statusText)
    }
  }

  async getUsersList() {
    const url = '/user/users'
    const resp: Response = await fetch(url)

    if(resp) {
      if(resp.status === 200) {
        const respJSON: Array<object> = await resp.json()

        if(respJSON)
          this.setState({ usersList: respJSON['data'] })
      }
      else console.log(resp.statusText)
    }
  }

  handleModal(message: string, success: boolean) {
    const title: string = success ? '' : 'Chyba'

    this.setState({ modalMessage: message, modalTitle: title }, () => { $('#modal').modal('show') })
  }

  /*onWebSockets() {
    this.ws.onopen = () => {
      console.log('OPENING WS')
    }
    this.ws.onerror = (error) => {
      console.log(error)
    }
    this.ws.onmessage = (data) => {
      console.log('RECIEVE SOMETHING')
      console.log(data)
    }
  }*/

  signOut() {
    this.setState({ 
      authorised: false,
      orderList: null,
      showHidePassword: false,
      user: {} as UserPayLoad,
      claimList: null,
      usersList: null
    })
    this.myStorage.clear()
  }

  storeUserData(data: object): void {
    this.myStorage.setItem('token', data['token'])
    this.myStorage.setItem('uFN', data['firstName'])
    this.myStorage.setItem('uR', data['role'])
    this.myStorage.setItem('cI', data['city'])

    this.authenticate()
  }

  submitForm(event: React.FormEvent<HTMLElement>, url: string, action: string): void {
    event.preventDefault()

    let data: object = {}
    const self: any = this
    const form: HTMLElement = event.currentTarget as HTMLElement
    const formInputs: any = form.getElementsByTagName('input')
    const select: HTMLSelectElement = form.querySelector('select')
    const _url: string = location.protocol+'//'+location.host+'/'+url

    for(let i: number = 0; i < formInputs.length; i++)
      data[formInputs[i]['id']] = formInputs[i].value

    if(select)
      data['city'] = parseInt(select.options[select.selectedIndex].value)

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
                firstName: resp.user.firstName,
                role: resp.user.role,
                city: resp.user.city
              }

              self.storeUserData(data)
            }
            else self.handleModal('Váš účet zatiaľ nebol schválený. Skúste neskôr prosím.', resp['success'])
          }
          else if(action === 'register') {
            if(resp['success']) {
              self.handleModal(<span>Registrácia prebehla úspešne. <Link to='/admin/login' onClick={() => {$('#modal').modal('hide')}}>Prihláste sa</Link> prosím.</span>, resp['success'])
            }
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
              claimList={this.state.claimList}
              orderList={this.state.orderList}
              orderedOrderList={this.state.orderedOrderList}
              orderState={this.state.orderState}
              paginationItemCount={this.state.paginationItemCount}
              program={this.state.program}
              user={this.state.user}
              
              changeOrders={this.changeOrders}
              getOrderList={this.getOrderList}
              getClaimList={this.getClaimList}
              orderByOrderState={this.orderByOrderState}
              orderByOrderProgram={this.orderByOrderProgram}
              orderByTime={this.orderByTime}
              updateOrder={this.updateOrder}
              signOut={this.signOut}
            /> :
            <Redirect to='/admin/login' />
          )} />
          <Route path='/admin/login' render={() => (
            Login({
              authorised: this.state.authorised,
              modalMessage: this.state.modalMessage,
              modalTitle: this.state.modalTitle,
              showHidePassword: this.state.showHidePassword,
              changeShowHidePassword: this.changeShowHidePassword,
              submitForm: this.submitForm
            })
          )} />
          <Route path='/admin/register' render={() => (
            Register({
              modalMessage: this.state.modalMessage,
              modalTitle: this.state.modalTitle,
              changeShowHidePassword: this.changeShowHidePassword,
              showHidePassword: this.state.showHidePassword,
              submitForm: this.submitForm
            })
          )} />
          <Route path='/admin/settings' render={() => (
            this.state.authorised ?
            Settings({
              showHidePassword: this.state.showHidePassword,
              user: this.state.user,
              changeShowHidePassword: this.changeShowHidePassword,
              signOut: this.signOut
            }) :
            <Redirect to='/admin/login' />
          )} />
          <Route path='/admin/users' render={() => (
            this.state.authorised ?
            Users({
              user: this.state.user,
              usersList: this.state.usersList,
              signOut: this.signOut,
              changeUserApprovedProperty: this.changeUserApprovedProperty,
              getUsersList: this.getUsersList,
              updateUser: this.updateUser
            }) :
            <Redirect to='/admin/login' />
          )} />
        </Switch>
      </Router>
    )
  }
}