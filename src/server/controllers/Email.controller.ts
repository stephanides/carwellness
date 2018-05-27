import * as mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'

export class Email {
  sendEmail(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)

    res.json({ message: 'Mail has been successfully sent', success: true })
  }
}