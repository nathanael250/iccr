const mongoose = require('mongoose')

const { normalizeDocument } = require('../utils/normalize-document')

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    status: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    primaryImage: { type: String, required: true, trim: true },
    galleryImages: { type: [String], default: [] },
    location: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    impact: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    details: { type: String, required: true, trim: true },
    highlights: { type: [String], default: [] },
    objectives: { type: [String], default: [] },
    goal: { type: Number, default: 0 },
    raised: { type: Number, default: 0 },
    goalSuffix: { type: String, default: '' },
  },
  { timestamps: true },
)

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)

async function listProjects() {
  const records = await Project.find().sort({ updatedAt: -1 })
  return records.map(normalizeDocument)
}

async function getProjectById(projectId) {
  return normalizeDocument(await Project.findById(projectId))
}

async function createProjectRecord(payload) {
  return normalizeDocument(await Project.create(payload))
}

async function updateProjectRecord(projectId, payload) {
  return normalizeDocument(
    await Project.findByIdAndUpdate(projectId, payload, {
      new: true,
      runValidators: true,
    }),
  )
}

module.exports = {
  Project,
  listProjects,
  getProjectById,
  createProjectRecord,
  updateProjectRecord,
}
