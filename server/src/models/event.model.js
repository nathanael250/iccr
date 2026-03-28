const mongoose = require('mongoose')

const { normalizeDocument } = require('../utils/normalize-document')

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    host: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    timeAlt: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    meetLink: { type: String, required: true, trim: true },
    flyerImage: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema)

async function listEvents() {
  const records = await Event.find().sort({ updatedAt: -1 })
  return records.map(normalizeDocument)
}

async function getEventById(eventId) {
  return normalizeDocument(await Event.findById(eventId))
}

async function createEventRecord(payload) {
  return normalizeDocument(await Event.create(payload))
}

async function updateEventRecord(eventId, payload) {
  return normalizeDocument(
    await Event.findByIdAndUpdate(eventId, payload, {
      new: true,
      runValidators: true,
    }),
  )
}

module.exports = {
  Event,
  listEvents,
  getEventById,
  createEventRecord,
  updateEventRecord,
}
