"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
//Compression should be managed by nginx server in production
const compression = require("compression");
const mongoose = require("mongoose");
const path = require("path");
const config_1 = require("./config");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.app = express();
        this.mongoose = mongoose;
        this.db = this.mongoose.connection;
        this.router = express.Router();
        this.config();
        this.routes();
        this.onError();
    }
    /*
    * Methode for establish connection with Mongo DB
    */
    dbConnect() {
        this.mongoose.connect(config_1.default.mongo);
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', () => console.log('Connected to db'));
    }
    /*
   * Basic configuraiton of the application
   */
    config() {
        // 
        this.app.use(helmet());
        //Morgan should be off in production
        this.app.use(morgan('dev'));
        //Compression should be managed by nginx server in production
        this.app.use(compression());
        this.app.use(bodyParser.json({ limit: '15mb' }));
        this.app.use(bodyParser.urlencoded({ parameterLimit: 300000, limit: '15mb', extended: false }));
        //Set service worker header for service-worker.js - Should be managed by nginx server in production
        //Optional service worker config for offline site behaviour
        /*this.app.use((req, res, next) => {
          const matchURL: string = '/assets/js/service-worker.js'
          if(req.url.substring(0, matchURL.length) === matchURL)
            res.setHeader('Service-Worker-Allowed', '/')
          next()
        })*/
        //Serve static files from imaginary /assets directory
        this.app.use('/assets', express.static(__dirname + '/../public/'));
        // Set pug as default template engine
        this.app.set('view engine', 'pug');
        this.app.locals.pretty = false; //False in production
        this.app.set('views', path.join(__dirname, '../views'));
        // Connect to DB
        this.dbConnect();
    }
    /*
    * Methode for catch all errors from application
    */
    onError() {
        this.app.use((err, req, res, next) => {
            if (err)
                res.status(err.status || 500).json({ message: err.message, success: false });
            next();
        });
    }
    /*
    * Methode listing all routes of the application
    */
    routes() {
        this.router.get('/', (req, res) => {
            res.render('index');
        });
        this.app.use(this.router);
    }
}
exports.default = new App().app;
//# sourceMappingURL=App.js.map