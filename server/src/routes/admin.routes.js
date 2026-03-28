const express = require('express')

const { asyncHandler } = require('../utils/async-handler')
const { getOverview } = require('../controllers/admin-overview.controller')
const {
  createProject,
  getProject,
  getProjects,
  updateProject,
} = require('../controllers/admin-project.controller')
const {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
} = require('../controllers/admin-event.controller')
const {
  addAlbumImages,
  createMediaAlbum,
  getMediaAlbums,
  getMediaSettings,
  updateMediaSettings,
} = require('../controllers/admin-media.controller')
const { getMembers, getMember } = require('../controllers/admin-member.controller')
const { getPartners, getPartner } = require('../controllers/admin-partner.controller')
const { getPrayerRequests } = require('../controllers/admin-prayer-request.controller')
const { getGivingRecords } = require('../controllers/admin-giving.controller')
const {
  getNotificationSettings,
  updateNotificationSettings,
} = require('../controllers/admin-settings.controller')

const adminRouter = express.Router()

adminRouter.get('/overview', asyncHandler(getOverview))

adminRouter.route('/projects').get(asyncHandler(getProjects)).post(asyncHandler(createProject))
adminRouter
  .route('/projects/:projectId')
  .get(asyncHandler(getProject))
  .put(asyncHandler(updateProject))

adminRouter.route('/events').get(asyncHandler(getEvents)).post(asyncHandler(createEvent))
adminRouter.route('/events/:eventId').get(asyncHandler(getEvent)).put(asyncHandler(updateEvent))

adminRouter
  .route('/media/settings')
  .get(asyncHandler(getMediaSettings))
  .put(asyncHandler(updateMediaSettings))
adminRouter
  .route('/media/albums')
  .get(asyncHandler(getMediaAlbums))
  .post(asyncHandler(createMediaAlbum))
adminRouter.route('/media/albums/:albumId/images').post(asyncHandler(addAlbumImages))

adminRouter.route('/members').get(asyncHandler(getMembers))
adminRouter.route('/members/:memberId').get(asyncHandler(getMember))

adminRouter.route('/partners').get(asyncHandler(getPartners))
adminRouter.route('/partners/:partnerId').get(asyncHandler(getPartner))

adminRouter.route('/prayer-requests').get(asyncHandler(getPrayerRequests))
adminRouter.route('/giving').get(asyncHandler(getGivingRecords))

adminRouter
  .route('/settings/notifications')
  .get(asyncHandler(getNotificationSettings))
  .put(asyncHandler(updateNotificationSettings))

module.exports = {
  adminRouter,
}
