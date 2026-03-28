const express = require('express')

const { asyncHandler } = require('../utils/async-handler')
const {
  submitGiving,
  submitMembership,
  submitPartnership,
  submitPrayerRequest,
} = require('../controllers/public-form.controller')

const publicRouter = express.Router()

publicRouter.post('/membership', asyncHandler(submitMembership))
publicRouter.post('/partnership', asyncHandler(submitPartnership))
publicRouter.post('/prayer-requests', asyncHandler(submitPrayerRequest))
publicRouter.post('/giving', asyncHandler(submitGiving))

module.exports = {
  publicRouter,
}
