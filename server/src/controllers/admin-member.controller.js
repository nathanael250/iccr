const {
  getMemberRequestById,
  listMemberRequests,
} = require('../models/member-request.model')

async function getMembers(request, response) {
  response.json(await listMemberRequests())
}

async function getMember(request, response) {
  const member = await getMemberRequestById(request.params.memberId)

  if (!member) {
    response.status(404).json({ message: 'Member request not found' })
    return
  }

  response.json(member)
}

module.exports = {
  getMembers,
  getMember,
}
