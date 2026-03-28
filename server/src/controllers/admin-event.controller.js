const {
  createEventRecord,
  getEventById,
  listEvents,
  updateEventRecord,
} = require('../models/event.model')

async function getEvents(request, response) {
  response.json(await listEvents())
}

async function getEvent(request, response) {
  const event = await getEventById(request.params.eventId)

  if (!event) {
    response.status(404).json({ message: 'Event not found' })
    return
  }

  response.json(event)
}

async function createEvent(request, response) {
  response.status(201).json(await createEventRecord(request.body))
}

async function updateEvent(request, response) {
  const event = await updateEventRecord(request.params.eventId, request.body)

  if (!event) {
    response.status(404).json({ message: 'Event not found' })
    return
  }

  response.json(event)
}

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
}
