const express = require('express')
const cors = require('cors')

const { clientOrigin } = require('./config/env')
const { errorHandler } = require('./middleware/error-handler')
const { adminRouter } = require('./routes/admin.routes')
const { publicRouter } = require('./routes/public.routes')

const app = express()

app.use(
  cors({
    origin: clientOrigin,
  }),
)

app.use(express.json({ limit: '25mb' }))

app.get('/health', (request, response) => {
  response.json({ status: 'ok' })
})

app.use('/admin', adminRouter)
app.use('/', publicRouter)
app.use(errorHandler)

module.exports = {
  app,
}
