const {
  getNotificationSettingsRecord,
  saveNotificationSettingsRecord,
} = require('../models/notification-settings.model')

async function getNotificationSettings(request, response) {
  response.json(await getNotificationSettingsRecord())
}

async function updateNotificationSettings(request, response) {
  response.json(await saveNotificationSettingsRecord(request.body))
}

module.exports = {
  getNotificationSettings,
  updateNotificationSettings,
}
