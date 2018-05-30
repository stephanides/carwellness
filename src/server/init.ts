import config from './config'
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { IUser } from './interfaces/User.interface'
import { User, UserDocument, Users } from './models/User.model'

export class Init {
  async run() {
    try{
      const user: object = await Users.findOne({ email: 'info@codebrothers.sk' })

      if(!user) {
        console.log('SUPER ADMIN NOT EXIST')
        const superAdmin: IUser = {
          firstName: config.sadm.firstName,
          lastName: config.sadm.lastName,
          email: config.sadm.email,
          city: 0,
          password: bcrypt.hashSync(config.sadm.password, bcrypt.genSaltSync(config.saltRounds)) as string,
          role: 1,
          approved: true
        }
        console.log('CREATING SUPER ADMIN')

        Users.create(superAdmin, err => {
          if(err) throw err
          else console.log('SUPER ADMIN CREATED')
        })
      }
      else console.log('SUPER ADMIN EXIST')
    }
    catch(err) {
      throw err
    }
  } 
}