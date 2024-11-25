const userRoutes = require('./api/user/parents/routes');
const childRoutes = require('./api/user/children/routes');
const articleRoutes = require('./api/articles/routes');
const mpsiRoutes = require('./api/MPASI/routes');

const routes = [
  ...userRoutes,
  ...childRoutes,
  ...articleRoutes,
  ...mpsiRoutes,
];

module.exports = routes;