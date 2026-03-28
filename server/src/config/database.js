const mongoose = require('mongoose')

const { mongodbUri } = require('./env')

async function connectDatabase() {
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is not configured')
  }

  await mongoose.connect(mongodbUri)
}

module.exports = {
  connectDatabase,
}
