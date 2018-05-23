import * as express from 'express'
import { AvailabilityController } from '../controllers/Availability.controller'

const router = express.Router()
const availability = new AvailabilityController()

router.get('/availability/availabilities/', (req, res, next) => {
  availability.getAvailabilities(req, res, next)
})

router.post('/availability/availability-create', (req, res, next) => {
  availability.createAvailability(req, res, next)
})

router.put('/availability/availabilities/:id', (req, res, next) => {
  availability.updateAvailability(req, res, next)
})

export default router