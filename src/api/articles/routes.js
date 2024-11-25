const { articleAuthMiddleware } = require('../middleware/Firebaseauthmiddleware');
const {
  addArticleHandler,
  getAllArticlesHandler,
  getArticleByIdHandler,
  updateArticleHandler,
  deleteArticleHandler
} = require('./handler');

const articleRoutes = [
  {
    method: 'POST',
    path: '/articles',
    options: {
      pre: [
        { method: articleAuthMiddleware }
      ],
      handler: addArticleHandler,
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
    path: '/articles',
    handler: getAllArticlesHandler,
  },
  {
    method: 'GET',
    path: '/articles/{id}',
    handler: getArticleByIdHandler,
  },
  {
    method: 'PUT',
    path: '/articles/{id}',
    handler: updateArticleHandler,
    options: {
      pre: [
        { method: articleAuthMiddleware }
      ],
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
    path: '/articles/{id}',
    handler: deleteArticleHandler,
    options: {
      pre: [
        { method: articleAuthMiddleware }
      ],
    },
  },
];

module.exports = articleRoutes;