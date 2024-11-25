require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

(async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT || 8080,
    host: process.env.APP_HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server Berjalan pada: ${server.info.uri}`);
})();