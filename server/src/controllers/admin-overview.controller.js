const { getAdminOverview } = require('../models/admin-overview.model')

async function getOverview(request, response) {
  response.json(await getAdminOverview())
}

module.exports = {
  getOverview,
}
