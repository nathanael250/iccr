const mongoose = require('mongoose')

const { normalizeDocument } = require('../utils/normalize-document')

const givingRecordSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    phone: { type: String, default: '', trim: true },
    purpose: { type: String, default: '', trim: true },
    paymentCategory: {
      type: String,
      enum: ['mobile-money', 'credit-card'],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, trim: true },
    status: { type: String, default: 'Pending', trim: true },
  },
  { timestamps: true },
)

const GivingRecord =
  mongoose.models.GivingRecord || mongoose.model('GivingRecord', givingRecordSchema)

async function listGivingRecords() {
  const records = await GivingRecord.find().sort({ createdAt: -1 })
  return records.map(normalizeDocument)
}

async function createGivingRecord(payload) {
  return normalizeDocument(await GivingRecord.create(payload))
}

module.exports = {
  GivingRecord,
  listGivingRecords,
  createGivingRecord,
}
