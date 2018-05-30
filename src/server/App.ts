import * as express from 'express'
//Compression should be managed by nginx server in production
//import * as compression from 'compression'
import * as mongoose from 'mongoose'
import * as path from 'path'
import config from './config'
import * as helmet from 'helmet'
//import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import * as io from 'socket.io'
import * as http from 'http'

import { User, UserDocument, Users } from './models/User.model'

import AvailabilityRouter from './routes/Availability.router'
import ClaimRouter from './routes/Claim.router'
import EmailRouter from './routes/Email.router'
import OrderRouter from './routes/Order.router'
import UserRouter from './routes/User.router'

class App {
  private app: express.Application
  private db: mongoose.Connection
  private mongoose
  private router: express.Router
  private io: SocketIO.Server
  public http
  
  constructor() {
    this.app = express()
    this.mongoose = mongoose
    this.db = this.mongoose.connection
    this.router = express.Router()
    this.http = http.createServer(this.app)
    this.io = io(this.http)

    this.config()
    this.routes()
    this.onError()
  }

  /*
  * Methode for establish connection with Mongo DB
  */
  private dbConnect(): void {
    this.mongoose.connect(config.mongo)

    this.db.on('error', console.error.bind(console, 'connection error:'))
    this.db.once('open', () => console.log('Connected to db'))
  }

   /*
  * Basic configuraiton of the application
  */
  private config(): void {
    // 
    this.app.use(helmet())
    
    //Morgan should be off in production
    //this.app.use(morgan('dev'))
    
    //Compression should be managed by nginx server in production
    //this.app.use(compression())
    this.app.use(bodyParser.json({ limit: '5mb' }))
    this.app.use(bodyParser.urlencoded({ parameterLimit: 10000, limit: '5mb', extended: false }))
    
    //Set service worker header for service-worker.js - Should be managed by nginx server in production
    //Optional service worker config for offline site behaviour
    /*this.app.use((req, res, next) => {
      const matchURL: string = '/assets/js/service-worker.js'
      if(req.url.substring(0, matchURL.length) === matchURL)
        res.setHeader('Service-Worker-Allowed', '/')      
      next()
    })*/

    //Serve static files from imaginary /assets directory
    //Should be managed by nginx server in production
    this.app.use('/assets', express.static(__dirname + '/../public/'))

    // Set pug as default template engine
    this.app.set('view engine', 'pug')
    this.app.locals.pretty = false; //False in production
    this.app.set('views', path.join(__dirname, '../views'))
    
    // Connect to DB
    this.dbConnect()
  }

  /*
  * Methode for catch all errors from application
  */
  private onError(): void {
    this.app.use((err, req, res, next) => {
      if(err) res.status(err.status || 500).json({ message: err.message, success: false })
      next()
    })
  }

  /*
  * Methode listing all routes of the application
  */
  private routes(): void {
    this.router.get('/', (req, res) => { res.render('index') })
    this.router.get('/admin', (req, res) => { res.render('admin') })
    this.router.get('/admin/setup', async (req, res) => {
      const user: object = await Users.findOne({ role: 2 })
      if(!user)
        res.render('admin')
      else
        res.render('error')
    })
    this.router.get('/admin/:action', (req, res) => { res.render('admin') })
    this.router.get('/cennik', (req, res) => { res.render('price-list') })
    this.router.get('/galeria', (req, res) => { res.render('gallery') })
    this.router.get('/gdpr', (req, res) => { res.render('gdpr') })
    this.router.get('/kontakt', (req, res) => { res.render('contact') })
    this.router.get('/obchodne-podmienky', (req, res) => { res.render('business-conditions') })
    this.router.get('/online-objednavka', (req, res) => { res.render('order') })
    this.router.get('/sluzby', (req, res) => { res.render('services') })
    this.router.get('/reklamacia', (req, res) => { res.render('claim') })

    this.io.on('connection', socket => {
      const admin = this.io.of('/admin')

      socket.on('order created', () => {
        admin.emit('order been created', { success: true })
      })
      socket.on('claim created', () => {
        admin.emit('claim been created', { success: true })
      })
    })

    this.app.use(AvailabilityRouter)
    this.app.use(ClaimRouter)
    this.app.use(EmailRouter)
    this.app.use(OrderRouter)
    this.app.use(UserRouter)
    this.app.use(this.router)
  }
}

export default new App().http
