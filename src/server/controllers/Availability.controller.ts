import * as mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { IAvailability } from '../interfaces/Availability.interface'
import { Availability, AvailabilityDocument, Availabilities } from '../models/Availability.model'

export class AvailabilityController {
  async createAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const availability = await Availabilities.findOne({ $and:[{ date: req.body.date }, { arrN: req.body.arrN }] })

      if(availability)
        this.throwError('Availability allready exist on selected time', 409, next)
      else {
        let availabilityData: object = {} as IAvailability

          for(let i: number = 0; i < Object.keys(req.body).length; i++)
            availabilityData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i]

          const newAvailability: object = new Availability(availabilityData as IAvailability)
          const saveAvailability = await Availabilities.create(newAvailability)

          if(saveAvailability) {
            res.json({
              message: 'Availability has been set for date: '+
                (newAvailability['date'].split('T')[0]).split('-')[2]+
                '/'+(newAvailability['date'].split('T')[0]).split('-')[1]+
                '/'+(newAvailability['date'].split('T')[0]).split('-')[0],
              success: true
            })
          }
          else
            res.json({ message: saveAvailability, success: false })
      }
    }
    catch(err) {
      return next(err)
    }
  }

  async getAvailabilities(req: Request, res: Response, next: NextFunction) {
    const availabilities = await Availabilities.find({ $and: [{ date: req.params.date}, {city: req.params.city}] })

    if(!availabilities || availabilities.length < 1)
      this.throwError('Nothing found', 404, next)
    else
      res.json({ data: availabilities, success: true })
  }

  async updateAvailability(req: Request, res: Response, next: NextFunction) {
    const availability = await Availabilities.findOne({ _id: mongoose.Types.ObjectId(req.body._id) })
   
    if(!availability)
      this.throwError('Nothing found', 404, next)
    else {
      const dataToUpdate: object = new Availability(req.body as IAvailability)
      const updatedAvailability: object = await Availabilities.update({ $and: [{ date: req.body.date }, { arrN: req.body.arrN }] }, dataToUpdate)

      if(updatedAvailability)
        res.json({ message: 'Availability has been successfully updated', success: true })
      else
        this.throwError('Can\'t update availability data', 500, next)
    }
  }

  throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: Error = new Error(errMessage)

    err['status'] = errStatus
    return next(err)
  }
}