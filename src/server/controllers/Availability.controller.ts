import * as React from 'react'
import { Request, Response, NextFunction } from 'express'
import { IAvailability } from '../interfaces/Availability.interface'
import { Availability, AvailabilityDocument, Availabilities } from '../models/Availability.model'

export class AvailabilityController {
  async createAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const availability = await Availabilities.findOne({ date: req.body.date })

      if(availability)
        this.throwError('Availability allready exist on selected time', 409, next)
      else {
        let availabilityData: object = {} as IAvailability

          for(let i: number = 0; i < Object.keys(req.body).length; i++)
            availabilityData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i]

          const newAvailability: object = new Availability(availabilityData as IAvailability)
          const saveAvailability = await Availabilities.create(newAvailability)

          if(saveAvailability)
            res.json({ message: 'Order has been created', success: true })
          else
            res.json({ message: saveAvailability, success: false })
      }
    }
    catch(err) {
      return next(err)
    }
  }

  async getAvailabilities(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)

    res.json({ message: 'Request has been successfully sent', success: true })
  }

  async updateAvailability(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)

    res.json({ message: 'Request has been successfully sent', success: true })
  }

  throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: Error = new Error(errMessage)

    err['status'] = errStatus
    return next(err)
  }
}