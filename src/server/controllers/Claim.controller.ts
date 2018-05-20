import * as mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { IClaim } from '../interfaces/Claim.interface'
import { Claim, ClaimDocument, Claims } from '../models/Claim.model'

export class ClaimController {
  async createClaim(req: Request, res: Response, next: NextFunction) {
    try {
      const claim = await Claims.findOne({ $and: [{ date: req.body.date }, { email: req.body.email}] })

      if(claim)
        this.throwError('Allready exist', 409, next)
      else {
        let claimData: object = {} as IClaim

        for(let i: number = 0; i < Object.keys(req.body).length; i++) {
          if(Object.keys(req.body)[i] !== 'image')
            claimData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i]
        }

        const imageData = {
          imageType: req.body.image.split(';base64,')[0].indexOf('image/jpeg') < 0 ?
            (req.body.image.split(';base64,')[0].indexOf('image/png') < 0 ? 'gif' : 'png') : 'jpg',
          imageBase64Data: req.body.image.split(';base64,')[1]
        }

        //TODO create image object with image name and image src

        const newClaim: object = new Claim(claimData as IClaim)
        const saveClaim = await Claims.create(newClaim)

        if(saveClaim)
          res.json({ message: 'Claim has been created', success: true })
        else
          res.json({ message: saveClaim, success: false })
      }
    }
    catch(err) {
      return next(err)
    }    
  }

  async updateClaim(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderToUpdate: object = await Claims.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })

      if(!orderToUpdate)
        this.throwError('Not Found', 404, next)
      else {
        const dataToUpdate: object = new Claim(req.body as IClaim)
        const updatedOrder: object = await Claims.update({ _id: mongoose.Types.ObjectId(req.body._id) }, dataToUpdate)

        if(updatedOrder)
          res.json({ message: 'Claim has been successfully updated', success: true })
        else
          this.throwError('Can\'t update claim data', 500, next)
      }
    }
    catch(err) {
      return next(err)
    }
  }

  async getClaims(req: Request, res: Response, next: NextFunction) {
    try {
      const query: object = parseInt(req.params.city) > 0 ? { $and: [{ city: parseInt(req.params.city) }, { deleted: false }] } : { deleted: false }
      const claims: Array<object> = await Claims.find(query)

      if(!claims || claims.length === 0)
        this.throwError('Nothing found', 404, next)
      else
        res.json({ data: claims, success: true })
    }
    catch(err) {
      return next(err)
    }
  }

  throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: Error = new Error(errMessage)

    err['status'] = errStatus
    return next(err)
  }
}