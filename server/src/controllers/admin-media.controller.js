const {
  addImagesToAlbumRecord,
  createMediaAlbumRecord,
  listMediaAlbums,
} = require('../models/media-album.model')
const {
  getMediaSettingsRecord,
  saveMediaSettingsRecord,
} = require('../models/media-settings.model')

async function getMediaSettings(request, response) {
  response.json(await getMediaSettingsRecord())
}

async function updateMediaSettings(request, response) {
  response.json(await saveMediaSettingsRecord(request.body))
}

async function getMediaAlbums(request, response) {
  response.json(await listMediaAlbums())
}

async function createMediaAlbum(request, response) {
  response.status(201).json(await createMediaAlbumRecord(request.body))
}

async function addAlbumImages(request, response) {
  const album = await addImagesToAlbumRecord(request.params.albumId, request.body)

  if (!album) {
    response.status(404).json({ message: 'Album not found' })
    return
  }

  response.json(album)
}

module.exports = {
  getMediaSettings,
  updateMediaSettings,
  getMediaAlbums,
  createMediaAlbum,
  addAlbumImages,
}
