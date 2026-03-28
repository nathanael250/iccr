const mongoose = require('mongoose')

const { normalizeDocument } = require('../utils/normalize-document')

const memberRequestSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, default: '', trim: true },
    maritalStatus: { type: String, default: '', trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    occupation: { type: String, default: '', trim: true },
    nationality: { type: String, default: '', trim: true },
    countryOfResidence: { type: String, default: '', trim: true },
    region: { type: String, default: '', trim: true },
    notes: { type: String, default: '', trim: true },
    photoUrl: { type: String, default: '', trim: true },
    status: { type: String, default: 'New', trim: true },
  },
  { timestamps: true },
)

const MemberRequest =
  mongoose.models.MemberRequest || mongoose.model('MemberRequest', memberRequestSchema)

async function listMemberRequests() {
  const records = await MemberRequest.find().sort({ createdAt: -1 })
  return records.map(normalizeDocument)
}

async function getMemberRequestById(memberId) {
  return normalizeDocument(await MemberRequest.findById(memberId))
}

async function createMemberRequest(payload) {
  return normalizeDocument(await MemberRequest.create(payload))
}

module.exports = {
  MemberRequest,
  listMemberRequests,
  getMemberRequestById,
  createMemberRequest,
}
