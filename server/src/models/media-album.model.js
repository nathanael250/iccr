const mongoose = require('mongoose')

const { normalizeDocument } = require('../utils/normalize-document')

const mediaImageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    sizeKb: { type: Number, required: true, min: 0 },
    uploadedAt: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const mediaAlbumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    coverImage: { type: String, default: '', trim: true },
    images: { type: [mediaImageSchema], default: [] },
  },
  { timestamps: true },
)

const MediaAlbum = mongoose.models.MediaAlbum || mongoose.model('MediaAlbum', mediaAlbumSchema)

async function listMediaAlbums() {
  const records = await MediaAlbum.find().sort({ createdAt: -1 })
  return records.map(normalizeDocument)
}

async function createMediaAlbumRecord(payload) {
  return normalizeDocument(
    await MediaAlbum.create({
      ...payload,
      images: [],
    }),
  )
}

async function addImagesToAlbumRecord(albumId, images) {
  return normalizeDocument(
    await MediaAlbum.findByIdAndUpdate(
      albumId,
      {
        $push: {
          images: {
            $each: images,
            $position: 0,
          },
        },
      },
      { new: true, runValidators: true },
    ),
  )
}

module.exports = {
  MediaAlbum,
  listMediaAlbums,
  createMediaAlbumRecord,
  addImagesToAlbumRecord,
}
