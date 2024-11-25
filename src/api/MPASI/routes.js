const {
  addHandlerMpsi,
  getAllMpsiHandler,
  getMpsiByIdHandler,
  updateMpsiHandler,
  deleteMpsiHandler
} = require('./handler');

const mpsiRoutes = [
  {
    method: 'POST',
    path: '/mpasi',
    handler: addHandlerMpsi,
  },
  {
    method: 'GET',
    path: '/mpasi',
    handler: getAllMpsiHandler,
  },
  {
    method: 'GET',
    path: '/mpasi/{id}',
    handler: getMpsiByIdHandler,
  },
  {
    method: 'PUT',
    path: '/mpasi/{id}',
    handler: updateMpsiHandler,
  },
  {
    method: 'DELETE',
    path: '/mpasi/{id}',
    handler: deleteMpsiHandler,
  },
];

module.exports = mpsiRoutes;