import * as express from 'express'
import { ClaimController } from '../controllers/Claim.controller'
import { checkToken } from './helpers/CheckToken.helper'

const router = express.Router()
const claim = new ClaimController()

router.get('/claim/claims/:city', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    claim.getClaims(req, res, next)
  })
})

router.post('/claim/claim-create', (req, res, next) => {
  claim.createClaim(req, res, next)
})

router.put('/claim/claims/:id', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    claim.updateClaim(req, res, next)
  })
})

export default router