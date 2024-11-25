const { profileAuthMiddleware } = require('../../middleware/Firebaseauthmiddleware');
const {
  getProfileHandler,
  updateProfileHandler,
  deleteAccountHandler,
} = require('./authhandler');

const userRoutes = [
  {
    method: 'GET',
    path: '/profile/{id}',
    options: {
      pre: [{ method: profileAuthMiddleware }],
      handler: getProfileHandler,
    },
  },
  {
    method: 'PUT',
    path: '/profile/{id}',
    handler: updateProfileHandler,
  },
  {
    method: 'DELETE',
    path: '/profile/{id}',
    handler: deleteAccountHandler,
  },
];

module.exports = userRoutes;