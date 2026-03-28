const {
  createProjectRecord,
  getProjectById,
  listProjects,
  updateProjectRecord,
} = require('../models/project.model')

async function getProjects(request, response) {
  response.json(await listProjects())
}

async function getProject(request, response) {
  const project = await getProjectById(request.params.projectId)

  if (!project) {
    response.status(404).json({ message: 'Project not found' })
    return
  }

  response.json(project)
}

async function createProject(request, response) {
  response.status(201).json(await createProjectRecord(request.body))
}

async function updateProject(request, response) {
  const project = await updateProjectRecord(request.params.projectId, request.body)

  if (!project) {
    response.status(404).json({ message: 'Project not found' })
    return
  }

  response.json(project)
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
}
