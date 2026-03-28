const { app } = require('./app')
const { connectDatabase } = require('./config/database')
const { port } = require('./config/env')

async function startServer() {
  await connectDatabase()

  app.listen(port, () => {
    console.log(`ICCR admin API running on port ${port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start ICCR admin API')
  console.error(error)
  process.exit(1)
})
