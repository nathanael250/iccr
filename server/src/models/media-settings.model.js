const mongoose = require('mongoose')

const { normalizeDocument } = require('../utils/normalize-document')

const mediaSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'default' },
    layout: {
      type: String,
      enum: ['grouped-gallery', 'sections', 'continuous'],
      default: 'grouped-gallery',
    },
    imageLimitMb: { type: Number, default: 5, min: 1 },
  },
  { timestamps: true },
)

const MediaSettings =
  mongoose.models.MediaSettings || mongoose.model('MediaSettings', mediaSettingsSchema)

async function getMediaSettingsRecord() {
  const record = await MediaSettings.findOneAndUpdate(
    { key: 'default' },
    { $setOnInsert: { key: 'default' } },
    { new: true, upsert: true },
  )

  return normalizeDocument(record)
}

async function saveMediaSettingsRecord(payload) {
  const record = await MediaSettings.findOneAndUpdate(
    { key: 'default' },
    payload,
    { new: true, upsert: true, runValidators: true },
  )

  return normalizeDocument(record)
}

module.exports = {
  MediaSettings,
  getMediaSettingsRecord,
  saveMediaSettingsRecord,
}
