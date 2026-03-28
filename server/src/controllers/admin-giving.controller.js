const { listGivingRecords } = require('../models/giving-record.model')

async function getGivingRecords(request, response) {
  response.json(await listGivingRecords())
}

module.exports = {
  getGivingRecords,
}
