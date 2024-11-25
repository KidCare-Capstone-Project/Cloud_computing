const {
  addChildProfileHandler,
  getChildProfilesHandler,
  getChildProfileByIdHandler,
  updateChildProfileHandler,
  deleteChildProfileHandler
} = require('./handler');

const childRoutes = [
  {
    method: 'POST',
    path: '/children',
    handler: addChildProfileHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 5000000,
      },
    },
  },
  {
    method: 'GET',
    path: '/children',
    handler: getChildProfilesHandler,
  },
  {
    method: 'GET',
    path: '/children/{id}',
    handler: getChildProfileByIdHandler,
  },
  {
    method: 'PUT',
    path: '/children/{id}',
    handler: updateChildProfileHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 5000000,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/children/{id}',
    handler: deleteChildProfileHandler,
  },
];

module.exports = childRoutes;