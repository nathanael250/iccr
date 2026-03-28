const mongoose = require('mongoose')

const { normalizeDocument } = require('../utils/normalize-document')

const prayerRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    phone: { type: String, default: '', trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, default: 'New', trim: true },
  },
  { timestamps: true },
)

const PrayerRequest =
  mongoose.models.PrayerRequest || mongoose.model('PrayerRequest', prayerRequestSchema)

async function listPrayerRequests() {
  const records = await PrayerRequest.find().sort({ createdAt: -1 })
  return records.map(normalizeDocument)
}

async function createPrayerRequest(payload) {
  return normalizeDocument(await PrayerRequest.create(payload))
}

module.exports = {
  PrayerRequest,
  listPrayerRequests,
  createPrayerRequest,
}
