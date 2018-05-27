import * as React from 'react'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Redirect, Switch } from 'react-router'
import { Admin } from './components/Admin'
import { Login } from './components/Login'
import { Link } from 'react-router-dom'
import { Register } from './components/Register'
import { Settings } from './components/Settings'
import * as io from 'socket.io-client'
import { Users } from './components/Users'
import { UserPayLoad } from './interfaces/UserPayLoad.interface'
const history = createBrowserHistory()

const _date: Date = new Date()
const _today: string =_date.getDate() < 10 ? '0'+_date.getDate() : String(_date.getDate())
const _tomorrow: string = _today.indexOf('0') > -1 ? String('0'+(parseInt(_today.replace('0', ''))+1)) : String(parseInt(_today)+1)
const _month: string = _date.getMonth() < 10 ? '0'+(_date.getMonth()+1) : String(_date.getMonth()+1)
const _year: number = _date.getFullYear()

interface State {
  authorised: boolean
  availabilityDate?: string
  carType: Array<string>
  dayOfWeek: number
  daysOfWeek: Array<string>
  modalMessage?: string | JSX.Element
  modalTitle?: string
  login: boolean
  orderList?: Array<object> | null
  orderedOrderList?: Array<object> | null
  orderState: Array<string>
  program: Array<string>
  page: number
  pagesCount: number
  paginationItemCount: number
  claimList?: Array<object> | null
  orderedClaimList?: Array<object>
  showHidePassword: boolean
  user?: UserPayLoad
  usersList?: Array<object> | null
  workingHours: string[][]
  workingHoursAvailability: Array<boolean>
  availableDates?: Array<object>
  windowActive: boolean
}

const initialState: State = {
  authorised: false,
  carType: ['AUTO CLASSIC', 'AUTO SUV'],
  dayOfWeek: _date.getDay(),
  daysOfWeek: ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota'],  
  login: true,
  program: ['COMFORT', 'EXCLUSIVE', 'EXTERIÉR', 'INTERIÉR', 'PREMIUM EXTERIÉR', 'PREMIUM INTERIÉR', 'AVANGARDE', 'TOP GLANZ'],
  page: 0,
  pagesCount: 1,
  paginationItemCount: 10,
  orderState: ['NOVÁ', 'ZRUŠENÁ', 'VYBAVENÁ'],
  showHidePassword: false,
  workingHours: [['00:00', '00:30'], ['00:30', '01:00'], ['01:00', '01:30'], ['01:30', '02:00'], ['02:00', '02:30'], ['02:30', '03:00'], ['03:00', '03:30'], ['03:30', '04:00'], ['04:00', '04:30'], ['04:30', '05:00'], ['05:00', '05:30'], ['05:30', '06:00'], ['06:00', '06:30'], ['06:30', '07:00'], ['07:00', '07:30'], ['07:30', '08:00'], ['08:00', '08:30'], ['08:30', '09:00'], ['09:00', '09:30'], ['09:30', '10:00'], ['10:00','10:30'], ['10:30', '11:00'], ['11:00', '11:30'], ['11:30', '12:00'], ['12:00', '12:30'], ['12:30', '13:00'], ['13:00', '13:30'], ['13:30', '14:00'], ['14:00', '14:30'], ['14:30','15:00'], ['15:00', '15:30'], ['15:30', '16:00'], ['16:00', '16:30'], ['16:30', '17:00'], ['17:00', '17:30'], ['17:30', '18:00'], ['18:00', '18:30'], ['18:30', '19:00'], ['19:00', '19:30'], ['19:30', '20:00'], ['20:00', '20:30'], ['20:30', '21:00'], ['21:00', '21:30'], ['21:30', '22:00'], ['22:00', '22:30'], ['22:30', '23:00'], ['23:00', '23:30']],
  workingHoursAvailability: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  windowActive: false
}

export class App extends React.Component<{}, State> {
  private fromURL: string
  private intervalCheckAuthenticate: number
  private myStorage: Storage
  private socket: any
  
  constructor(props: State) {
    super(props)

    this.fromURL = '/'
    this.intervalCheckAuthenticate = 0
    this.myStorage = localStorage
    this.state = initialState

    this.socket = io('/admin')
    this.authenticate = this.authenticate.bind(this)
    this.checkOrders = this.checkOrders.bind(this)
    this.changeAvailability = this.changeAvailability.bind(this)
    this.changeUserApprovedProperty = this.changeUserApprovedProperty.bind(this)
    this.changeShowHidePassword = this.changeShowHidePassword.bind(this)
    this.changeOrder = this.changeOrder.bind(this)
    this.changePage = this.changePage.bind(this)
    this.changePageItemsCount = this.changePageItemsCount.bind(this)
    this.getOrderList = this.getOrderList.bind(this)
    this.getClaimList = this.getClaimList.bind(this)
    this.getUsersList = this.getUsersList.bind(this)
    this.getAvailabilityByDate = this.getAvailabilityByDate.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.handlePaginationData = this.handlePaginationData.bind(this)
    this.sendNotification = this.sendNotification.bind(this)
    this.orderByTime = this.orderByTime.bind(this)
    this.orderByOrderState = this.orderByOrderState.bind(this)
    this.orderByOrderProgram = this.orderByOrderProgram.bind(this)
    this.setDay = this.setDay.bind(this)
    this.signOut = this.signOut.bind(this)
    this.socketListener = this.socketListener.bind(this)
    this.storeUserData = this.storeUserData.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.submitAvailability = this.submitAvailability.bind(this)
    this.updateAvailability = this.updateAvailability.bind(this)
    this.updateClaim = this.updateClaim.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.updateOrder = this.updateOrder.bind(this)
  }

  authenticate() {
    const user: UserPayLoad | null = this.getUserData() as UserPayLoad

    if(user)
      this.setState({ authorised: true, user: user })
    else
      this.signOut()
  }

  async checkClaims() {
    const url: string = '/claim/claims/'+this.state.user.city
    const response: Response = await fetch(url, {
      headers: { 'x-access-token': this.state.user.token }
    })

    if(response) {
      const responseJSON: object = await response.json()
      
      if(response.status === 200) {
        if(!this.state.claimList || (responseJSON['data'].length > this.state.claimList.length)) {
          const date = new Date()
          let newClaim: object
          let onlyInA: Array<object>
          let onlyInB: Array<object>

          if(this.state.claimList && this.state.claimList.length > 0) {
            function comparer(otherArray) {
              return (current) => {
                return otherArray.filter(other => {
                  return other['_id'] == current['_id']
                }).length == 0
              }
            }

            onlyInA = responseJSON['data'].filter(comparer(this.state.claimList))
            onlyInB = this.state.claimList.filter(comparer(responseJSON['data']))

            let tempArr = onlyInA.concat(onlyInB)
            
            newClaim = tempArr[0]
          }
          else newClaim = responseJSON['data'][0]

          this.sendNotification({
            title: 'Nová reklamácia',
            message: date.getDate() < 10 ? '0'+date.getDate():date.getDate()+'.'+
            (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):(date.getMonth()+1))+'.'+
            date.getFullYear()+' o '+
            (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+':'+
            (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes())+':'+
            (date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds())+'\n'+
              'Bola prijatá reklamácia od '+newClaim['fullName'],
            icon:'https://png.icons8.com/ios/150/3584fc/alarm-filled.png',
            //clickCallback: () => { alert('do something when clicked on notification') }
          }, this.getClaimList)
        }
        else console.log('Ziadna nova reklamácia')
      }
      else
        console.log(responseJSON['message'])
    }
  }

  async checkOrders() {
    const url: string = '/order/orders/'+this.state.user.city
    const response: Response = await fetch(url, {
      headers: { 'x-access-token': this.state.user.token }
    })

    if(response) {
      const responseJSON: object = await response.json()
      
      if(response.status === 200) {
        if(!this.state.orderList || (responseJSON['data'].length > this.state.orderList.length)) {
          const date = new Date()
          let newOrder: object
          let onlyInA: Array<object>
          let onlyInB: Array<object>

          if(this.state.orderList && this.state.orderList.length > 0) {
            function comparer(otherArray) {
              return (current) => {
                return otherArray.filter(other => {
                  return other['_id'] == current['_id']
                }).length == 0
              }
            }

            onlyInA = responseJSON['data'].filter(comparer(this.state.orderList))
            onlyInB = this.state.orderList.filter(comparer(responseJSON['data']))

            let tempArr = onlyInA.concat(onlyInB)
            
            newOrder = tempArr[0]
          }
          else newOrder = responseJSON['data'][0]

          this.sendNotification({
            title: 'Nová objednávka',
            message: date.getDate() < 10 ? '0'+date.getDate():date.getDate()+'.'+
            (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):(date.getMonth()+1))+'.'+
            date.getFullYear()+' o '+
            (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+':'+
            (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes())+':'+
            (date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds())+'\n'+
              'Bola prijatá objednávka od '+newOrder['fullName'],
            icon:'https://png.icons8.com/ios/150/3584fc/alarm-filled.png',
            //clickCallback: () => { alert('do something when clicked on notification') }
          }, this.getOrderList)
        }
        else console.log('Ziadna nova objednavka')
      }
      else
        console.log(responseJSON['message'])
    }
  }

  changeAvailability(e: React.FormEvent<HTMLSelectElement>, i: number) {
    const el: HTMLSelectElement = e.target as HTMLSelectElement
    const val: number = parseInt(el.value)
    let arr = this.state.workingHoursAvailability

    if(val === 0) arr[i] = true
    else arr[i] = false

    this.setState({ workingHoursAvailability: arr })
  }

  async submitAvailability(i: number) {
    const url: string = '/availability/availability-create' 
    const data = {
      city: this.state.user.city,
      date: new Date(
        this.state.availabilityDate.split('-')[2]+
        '-'+this.state.availabilityDate.split('-')[1]+
        '-'+this.state.availabilityDate.split('-')[0]
      ).toISOString(),
      available: this.state.workingHoursAvailability[i],
      arrN: i
    }

    console.log(data)

    const response: Response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'x-access-token': this.myStorage.getItem('token'),
        'content-type': 'application/json'
      },
      method: 'POST'
    })

    if(response) {
      if(response.status === 200) {
        const responseJSON: object = await response.json()

        if(responseJSON['success']) {
          console.log(responseJSON['message'])
          this.getAvailabilityByDate(data.date)
        }
        else
          console.log(responseJSON['message'])
      }
      else
        console.log(response.statusText)
    }    
  }

  async updateAvailability(item: object) {
    const url: string = '/availability/availabilities/'+item['_id']
    const data: object = item
    const response: Response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'x-access-token': this.myStorage.getItem('token'),
        'content-type': 'application/json'
      },
      method: 'PUT'
    })

    if(response) {
      if(response.status === 200) {
        const responseJSON: object = await response.json()

        if(responseJSON)
          console.log(responseJSON['message'])
      }
      else console.log(response.statusText)
    }
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

  changePage(page: number) {
    this.setState({ page: page }, () => this.handlePaginationData(this.state.page))
  }

  changePageItemsCount(itemsCount: number) {
    if(this.state.paginationItemCount !== itemsCount) {

      this.setState({
        paginationItemCount: itemsCount,
        page: 0
      }, () => {
        this.setState({
          pagesCount: this.state.paginationItemCount === 100 ?
            1 : 
            (
              this.state.orderList.length > this.state.paginationItemCount ?
              (
                this.state.orderList.length % this.state.paginationItemCount > 0 ?
                parseInt(String(this.state.orderList.length / this.state.paginationItemCount).split('.')[0]) + 1 :
                this.state.orderList.length / this.state.paginationItemCount
              ) : 1
            )
        }, () => this.handlePaginationData(this.state.page))
      })
    }
  }

  async getOrderList() {
    const url = '/order/orders/'+this.state.user.city
    const resp: Response = await fetch(url, {
      headers: { 'x-access-token': this.state.user.token }
    })

    if(resp) {
      if(resp.status === 200) {
        const respJSON: Array<object> = await resp.json()

        if(respJSON) {
          this.setState({ orderList: respJSON['data'] }, () => {
            this.setState({
              pagesCount: this.state.paginationItemCount === 100 ?
                1 : 
                (
                  this.state.orderList.length > this.state.paginationItemCount ?
                  (
                    this.state.orderList.length % this.state.paginationItemCount > 0 ?
                    parseInt(String(this.state.orderList.length / this.state.paginationItemCount).split('.')[0]) + 1 :
                    this.state.orderList.length / this.state.paginationItemCount
                  ) : 1
                )
            }, this.orderByTime)
          })
        }
      }
      else console.log(resp.statusText)
    }
  }

  changeOrder(order: object) {
    let newOrderList: Array<object> = this.state.orderedOrderList

    for(let i: number = 0; i < newOrderList.length; i++) {
      if(newOrderList[i]['_id'] === order['_id'])
        newOrderList[i] = order
    }

    this.setState({ orderedOrderList: newOrderList })
  }

  orderByTime() {
    this.handlePaginationData(this.state.page, () => {
      const arr: Array<object> = this.state.orderedOrderList

      arr.sort((a: object, b: object) => ( b['date'].toLowerCase().localeCompare(a['date'].toLowerCase()) ))
      this.setState({ orderedOrderList: arr })
    })
  }

  handlePaginationData(page: number, callBack?: () => void) {
    let arr: Array<object> = []
    
    if(this.state.pagesCount > 1) {
      const fromItem: number = page > 0 ? page * this.state.paginationItemCount : 0
      const toItem: number = (page * this.state.paginationItemCount) + this.state.paginationItemCount

      for(let i: number = fromItem; i < toItem; i++) {
        if(this.state.orderList[i])
          arr.push(this.state.orderList[i])
      }

      this.setState({ orderedOrderList: arr }, () => {
        if(typeof callBack === 'function')
          callBack()
      })
    }
    else {
      for(let i: number = 0; i < this.state.orderList.length; i++)
          arr.push(this.state.orderList[i])

      this.setState({ orderedOrderList: arr }, () => {
        if(typeof callBack === 'function')
          callBack()
      })
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
        if(this.state.orderList[i]['program'][orderProgram]) {
          arr.push(this.state.orderList[i])
        }
      }

      if(arr.length < 1)
        arr = null

      this.setState({ orderedOrderList: arr })
    }
  }

  async updateOrder(order: object, callBack?: () => void) {
    const url: string = '/order/orders/'+order['_id']
    const data: object = order

    const response: Response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'x-access-token': this.myStorage.getItem('token'),
        'content-type': 'application/json'
      },
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
      else {
        const responseJSON: object = await response.json()
        
        if(responseJSON)
          console.log(responseJSON['message'])
      }
    }
  }

  async updateClaim(claim: object, callBack?: () => void) {
    const url: string = '/claim/claims/'+claim['_id']
    const data: object = claim

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
    const resp: Response = await fetch(url, { 
      headers: { 'x-access-token': this.myStorage.getItem('token') }
    })

    if(resp) {
      if(resp.status === 200) {
        const respJSON: Array<object> = await resp.json()

        if(respJSON)
          this.setState({ claimList: respJSON['data'] }, () => {
            const arr: Array<object> = this.state.claimList

            arr.sort((a: object, b: object) => ( b['date'].toLowerCase().localeCompare(a['date'].toLowerCase()) ))
            this.setState({ orderedClaimList: arr })
          })
      }
      else
        console.log(resp.statusText)
    }
  }

  getUserData() {
    let user: object | null = null
    
    if(this.myStorage.getItem('uLT')) {
      const timeDiff: number = Date.now() - parseInt(this.myStorage.getItem('uLT'))
      
      if(timeDiff < 2.88e+7) {
        user = {
          token: this.myStorage.getItem('token'),
          firstName: this.myStorage.getItem('uFN'),
          role: parseInt(this.myStorage.getItem('uR')),
          city: parseInt(this.myStorage.getItem('cI'))
        } as UserPayLoad 
      }
    }

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
    const title: string = success ? 'Info' : 'Chyba'

    this.setState({ modalMessage: message, modalTitle: title }, () => { $('#modal').modal('show') })
  }

  async sendNotification(data, callBack?: () => void) {
    console.log('NOTIFICATION')
    
    if (data === undefined || !data) return false

    const title = (data.title === undefined) ? 'Notification' : data.title
    const clickCallback = data.clickCallback
    const message = (data.message === undefined) ? 'null' : data.message
    const icon = (data.icon === undefined) ? 'https://png.icons8.com/ios/150/3584fc/alarm-filled.png' : data.icon
    const sendNotification = () => {
      console.log('SEND NOTIFICATION')

      const notification = new Notification(title, {
        icon: icon,
        body: message,
        //vibrate: [200, 100, 200]
      })

      if (clickCallback !== undefined) {
        notification.onclick = () => {
          clickCallback()
          notification.close()
        }
      }
    }

    if (!window['Notification'])
      return false
    else {
      console.log('BROWSER SUPPORT NOTIFICATION')

      if (Notification['permission'] === 'default') {
        console.log('PERMISSION: DEFAULT')
        Notification.requestPermission().then(permission => {
          console.log(permission)
            
          if (permission !== 'denied') sendNotification()
        })
      }
      else sendNotification()
    }

    if(typeof callBack === 'function')
      callBack()
}

  setDay(e: string) {
    let date, dateFormat

    if(e !== '') {
      date = new Date(e) as Date
      dateFormat = date.getDate()+'-'+(date.getMonth() < 10 ? '0'+(date.getMonth()+1) : date.getMonth())+'-'+date.getFullYear() as string
    
      const formattedDate: string = new Date(dateFormat.split('-')[2]+'-'+dateFormat.split('-')[1]+'-'+dateFormat.split('-')[0]).toISOString()
      
      console.log(formattedDate)
      this.getAvailabilityByDate(formattedDate, () => {
        this.setState({
          dayOfWeek: date ? date.getDay() : this.state.dayOfWeek,
          availabilityDate: dateFormat ? dateFormat : ''
        })
      })
    }
    else {
      let arr: Array<boolean> = []
      for(let i: number = 0; i < this.state.workingHoursAvailability.length; i++)
        arr[i] = true

      this.setState({
        dayOfWeek: date ? date.getDay() : this.state.dayOfWeek,
        availabilityDate: dateFormat ? dateFormat : '',
        workingHoursAvailability: arr
      })
    }
  }

  socketListener() {
    this.socket.on('connect', () => {
      console.log('CONNECTED')
      this.socket.on('order been created', data => {
        if(data.success) {
          this.checkOrders()
          return
        }
      })
      this.socket.on('claim been created', data => {
        if(data.success) {
          console.log('NEW CLAIM HAS BEEN CREATED SHOULD RERENDER')
          this.checkClaims()
          return
        }
      })
    })
  }

  async getAvailabilityByDate(date: string, callBack?: () => void) {
    const url: string = '/availability/availability/'+date+'/'+this.state.user.city
    const response: Response = await fetch(url)
    let arr = this.state.workingHoursAvailability

    if(response) {
      if(response.status === 200) {
        const responseJSON: object = await response.json()

        if(responseJSON) {
          if(responseJSON['success']) {            
            for(let i: number = 0; i < responseJSON['data'].length; i++)
              arr[responseJSON['data'][i]['arrN']] = responseJSON['data'][i]['available']

            this.setState({ workingHoursAvailability: arr, availableDates: responseJSON['data'] }, () => {
              if(typeof callBack === 'function')
                callBack()
            })
          }
          else
            console.log(responseJSON['message'])
        }
      }
      else {
        console.log(response.statusText)
        for(let i: number = 0; i < this.state.workingHoursAvailability.length; i++)
          arr[i] = true

        this.setState({ workingHoursAvailability: arr }, () => {
          if(typeof callBack === 'function')
            callBack()
        })
      }
    }
  }

  signOut() {
    this.setState({
      availabilityDate: '',
      authorised: false,
      orderList: null,
      showHidePassword: false,
      user: {} as UserPayLoad,
      claimList: null,
      usersList: null
    }, () => {
      this.myStorage.clear()
      clearInterval(this.intervalCheckAuthenticate)
      this.fromURL = '/'
    })
  }

  storeUserData(data: object): void {
    this.myStorage.setItem('token', data['token'])
    this.myStorage.setItem('uFN', data['firstName'])
    this.myStorage.setItem('uR', data['role'])
    this.myStorage.setItem('cI', data['city'])
    this.myStorage.setItem('uLT', String(Date.now()))

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
    this.intervalCheckAuthenticate = window.setInterval(this.authenticate, 8*60*1000)
    this.authenticate()
  }

  render() {
    return(
      <Router history={history}>
        <Switch>
          <Route exact path='/admin' render={(props) => (
            this.state.authorised ?
            <Admin
              availableDates={this.state.availableDates}
              availabilityDate={this.state.availabilityDate}
              carType={this.state.carType}
              orderedClaimList={this.state.orderedClaimList}
              dayOfWeek={this.state.dayOfWeek}
              daysOfWeek={this.state.daysOfWeek}
              modalMessage={this.state.modalMessage}
              modalTitle={this.state.modalTitle}
              orderList={this.state.orderList}
              orderedOrderList={this.state.orderedOrderList}
              orderState={this.state.orderState}
              page={this.state.page}
              paginationItemCount={this.state.paginationItemCount}
              pagesCount={this.state.pagesCount}
              program={this.state.program}
              user={this.state.user}
              workingHours={this.state.workingHours}
              workingHoursAvailability={this.state.workingHoursAvailability}
              
              changeAvailability={this.changeAvailability}
              changeOrder={this.changeOrder}
              changePage={this.changePage}
              changePageItemsCount={this.changePageItemsCount}
              getOrderList={this.getOrderList}
              getClaimList={this.getClaimList}
              handleModal={this.handleModal}
              orderByOrderState={this.orderByOrderState}
              orderByOrderProgram={this.orderByOrderProgram}
              orderByTime={this.orderByTime}
              updateClaim={this.updateClaim}
              updateOrder={this.updateOrder}
              setDay={this.setDay}
              signOut={this.signOut}
              socketListener={this.socketListener}
              submitAvailability={this.submitAvailability}
              updateAvailability={this.updateAvailability}
            /> :
            <Redirect to='/admin/login' />
          )} />
          <Route path='/admin/login' render={() => (
            Login({
              authorised: this.state.authorised,
              fromURL: this.fromURL,
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
          <Route path='/admin/settings' render={(props) => {
            this.fromURL = props.match.path

            return(
              this.state.authorised ?
              Settings({
                showHidePassword: this.state.showHidePassword,
                user: this.state.user,
                changeShowHidePassword: this.changeShowHidePassword,
                signOut: this.signOut
              }) :
              <Redirect to='/admin/login' />
            )
          }} />
          <Route path='/admin/users' render={(props) => {
            this.fromURL = props.match.path
            
            return(
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
            )
          }} />
        </Switch>
      </Router>
    )
  }
}