const jwt = require('jsonwebtoken');
const admin = require('../../services/firebaseService').admin;

const profileAuthMiddleware = async (request, h) => {
  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return h.response({ status: 'fail', message: 'Token tidak ditemukan' }).code(401);
    }

    const token = authorizationHeader.split(' ')[1];

    const decodedToken = jwt.decode(token, { complete: true });

    const publicKey = await admin.auth().getPublicKey(decodedToken.payload.uid);

    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        return h.response({ status: 'fail', message: 'Token tidak valid' }).code(401);
      }

      request.auth.credentials = { uid: decoded.uid };

      return h.continue;
    });

  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Autentikasi gagal' }).code(401);
  }
};

const articleAuthMiddleware = async (request, h) => {
  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return h.response({ status: 'fail', message: 'Token tidak ditemukan' }).code(401);
    }

    const token = authorizationHeader.split(' ')[1];

    const decodedToken = jwt.decode(token, { complete: true });

    const publicKey = await admin.auth().getPublicKey(decodedToken.payload.uid);

    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        return h.response({ status: 'fail', message: 'Token tidak valid' }).code(401);
      }

      if (decoded.role !== 'admin') {
        return h.response({ status: 'fail', message: 'Tidak diizinkan' }).code(403);
      }

      request.auth.credentials = { uid: decoded.uid };

      return h.continue;
    });

  } catch (error) {
    console.error(error);
    return h.response({ message: 'Unauthorized' }).code(401);
  }
};

module.exports = { articleAuthMiddleware, profileAuthMiddleware };