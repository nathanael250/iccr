const mongoose = require('mongoose')

const { normalizeDocument } = require('../utils/normalize-document')

const notificationSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'default' },
    channels: {
      inApp: { type: Boolean, default: true },
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
    },
    triggers: {
      membership: { type: Boolean, default: true },
      partnership: { type: Boolean, default: true },
      prayerRequest: { type: Boolean, default: true },
      giving: { type: Boolean, default: true },
      projectUpdate: { type: Boolean, default: true },
      eventUpdate: { type: Boolean, default: true },
      mediaUpload: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
)

const NotificationSettings =
  mongoose.models.NotificationSettings ||
  mongoose.model('NotificationSettings', notificationSettingsSchema)

async function getNotificationSettingsRecord() {
  const record = await NotificationSettings.findOneAndUpdate(
    { key: 'default' },
    { $setOnInsert: { key: 'default' } },
    { new: true, upsert: true },
  )

  return normalizeDocument(record)
}

async function saveNotificationSettingsRecord(payload) {
  const record = await NotificationSettings.findOneAndUpdate(
    { key: 'default' },
    payload,
    { new: true, upsert: true, runValidators: true },
  )

  return normalizeDocument(record)
}

module.exports = {
  NotificationSettings,
  getNotificationSettingsRecord,
  saveNotificationSettingsRecord,
}
