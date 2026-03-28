const mongoose = require('mongoose')

const { normalizeDocument } = require('../utils/normalize-document')

const partnerRequestSchema = new mongoose.Schema(
  {
    organizationName: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    country: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    partnershipType: { type: String, default: '', trim: true },
    website: { type: String, default: '', trim: true },
    vision: { type: String, default: '', trim: true },
    proposal: { type: String, default: '', trim: true },
    logoUrl: { type: String, default: '', trim: true },
    status: { type: String, default: 'New', trim: true },
  },
  { timestamps: true },
)

const PartnerRequest =
  mongoose.models.PartnerRequest || mongoose.model('PartnerRequest', partnerRequestSchema)

async function listPartnerRequests() {
  const records = await PartnerRequest.find().sort({ createdAt: -1 })
  return records.map(normalizeDocument)
}

async function getPartnerRequestById(partnerId) {
  return normalizeDocument(await PartnerRequest.findById(partnerId))
}

async function createPartnerRequest(payload) {
  return normalizeDocument(await PartnerRequest.create(payload))
}

module.exports = {
  PartnerRequest,
  listPartnerRequests,
  getPartnerRequestById,
  createPartnerRequest,
}
