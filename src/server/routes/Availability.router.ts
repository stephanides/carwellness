import * as express from 'express'
import { AvailabilityController } from '../controllers/Availability.controller'
import { checkToken } from './helpers/CheckToken.helper'

const router = express.Router()
const availability = new AvailabilityController()

router.get('/availability/availability/:date/:city', (req, res, next) => {
  availability.getAvailabilities(req, res, next)
})

router.post('/availability/availability-create', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    availability.createAvailability(req, res, next)
  })
})

router.put('/availability/availabilities/:id', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    availability.updateAvailability(req, res, next)
  })
})

export default router