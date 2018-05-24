import * as mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { IClaim } from '../interfaces/Claim.interface'
import { Claim, ClaimDocument, Claims } from '../models/Claim.model'
import * as path from 'path'
import * as fs from 'fs'

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

        const fileName = req.body['fullName'].replace(/\s/, '-').toLowerCase()
        const date = new Date()
        
        const imageData = {
          imagePath: path.normalize(
            __dirname+'/../../public/images/claims/'+fileName+'-'+
            (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+'-'+
            (date.getMonth() < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)+'-'+
            date.getFullYear()
          ),
          imageFileName: fileName+'-'+
            (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+'-'+
            (date.getMonth() < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)+'-'+
            date.getFullYear()+'-'+
            (date.getHours() < 10 ? '0'+date.getHours() : date.getHours())+'-'+
            (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes())+'-'+
            (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()),
          imageType: req.body.image.split(';base64,')[0].indexOf('image/jpeg') < 0 ?
            (req.body.image.split(';base64,')[0].indexOf('image/png') < 0 ? 'gif' : 'png') : 'jpg',
          imageBase64Data: req.body.image.split(';base64,')[1]
        }

        claimData['image'] = './assets/images/claims/'+fileName+'-'+
          (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+'-'+
          (date.getMonth() < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)+'-'+
          date.getFullYear()+'/'+imageData.imageFileName+'.'+imageData.imageType

        const newClaim: object = new Claim(claimData as IClaim)

        Claims.create(newClaim, (err, item) => {
          if(err) return next(err)
          else {
            if(!fs.existsSync(path.normalize(imageData.imagePath)))
              fs.mkdirSync(path.normalize(imageData.imagePath))

            if(fs.existsSync(path.normalize(imageData.imagePath))) {
              fs.writeFile(path.normalize(imageData.imagePath+'/'+imageData.imageFileName+'.'+imageData.imageType), imageData.imageBase64Data, { encoding: 'base64' }, err => {
                if(err) return next(err)
                else res.json({ message: 'Claim has been created', success: true })
              })
            }            
          }
        })
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