const {
  getPartnerRequestById,
  listPartnerRequests,
} = require('../models/partner-request.model')

async function getPartners(request, response) {
  response.json(await listPartnerRequests())
}

async function getPartner(request, response) {
  const partner = await getPartnerRequestById(request.params.partnerId)

  if (!partner) {
    response.status(404).json({ message: 'Partner request not found' })
    return
  }

  response.json(partner)
}

module.exports = {
  getPartners,
  getPartner,
}
