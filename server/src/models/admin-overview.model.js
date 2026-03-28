const { GivingRecord } = require('./giving-record.model')
const { MemberRequest } = require('./member-request.model')
const { PartnerRequest } = require('./partner-request.model')

function valueInRwf(record) {
  if (record.currency === 'USD') return record.amount * 1400
  if (record.currency === 'EUR') return record.amount * 1500
  return record.amount
}

async function getAdminOverview() {
  const [givingRecords, membershipRequestCount, partnershipRequestCount] = await Promise.all([
    GivingRecord.find().select('amount currency'),
    MemberRequest.countDocuments(),
    PartnerRequest.countDocuments(),
  ])

  return {
    totalGivingCount: givingRecords.length,
    totalGivingValue: givingRecords.reduce((sum, record) => sum + valueInRwf(record), 0),
    membershipRequestCount,
    partnershipRequestCount,
  }
}

module.exports = {
  getAdminOverview,
}
