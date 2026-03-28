const { createGivingRecord } = require('../models/giving-record.model')
const { createMemberRequest } = require('../models/member-request.model')
const { createPartnerRequest } = require('../models/partner-request.model')
const { createPrayerRequest } = require('../models/prayer-request.model')

async function submitMembership(request, response) {
  response.status(201).json(await createMemberRequest(request.body))
}

async function submitPartnership(request, response) {
  response.status(201).json(await createPartnerRequest(request.body))
}

async function submitPrayerRequest(request, response) {
  response.status(201).json(await createPrayerRequest(request.body))
}

async function submitGiving(request, response) {
  response.status(201).json(await createGivingRecord(request.body))
}

module.exports = {
  submitMembership,
  submitPartnership,
  submitPrayerRequest,
  submitGiving,
}
