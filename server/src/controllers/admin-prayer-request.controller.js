const { listPrayerRequests } = require('../models/prayer-request.model')

async function getPrayerRequests(request, response) {
  response.json(await listPrayerRequests())
}

module.exports = {
  getPrayerRequests,
}
