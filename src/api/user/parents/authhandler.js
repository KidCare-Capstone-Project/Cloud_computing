const admin = require('../../../services/firebaseService.js').admin;
const { getUserByUid, updateUser, deleteUser } = require('../../../services/firestoreService.js');
const { uploadImageProfile } = require('../../../services/googlestorageServices.js');
const bcrypt = require('bcrypt');


async function getProfileHandler(request, h) {
  try {
    const { uid } = request.auth.credentials;

    const userData = await getUserByUid(uid);

    if (!userData) {
      return h.response({
        status: 'fail',
        message: 'User tidak ditemukan'
      }).code(404);
    }

    const profileData = {
      uid: userData.uid,
      nama: userData.nama,
      email: userData.email,
    };

    return h.response({
      status: 'success',
      message: 'Profil berhasil diambil',
      data: profileData
    }).code(200);

  } catch (error) {
    console.error('Error mengambil profil:', error);
    return h.response({
      status: 'error',
      message: 'Gagal mengambil profil.'
    }).code(500);
  }
}

async function updateProfileHandler(request, h) {
  try {
    const { uid } = request.auth.credentials;
    const { nama, password, profilePicture } = request.payload;

    const updatedData = {};

    if (nama) {
      updatedData.nama = nama;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;

      try {
        await admin.auth().updateUser(uid, { password: hashedPassword });
      } catch (authError) {
        console.error('Error updating password in Firebase Authentication:', authError);
      }
    }

    if (profilePicture) {
      const newProfilePictureUrl = await uploadImageProfile(uid, profilePicture);
      updatedData.profilePicture = newProfilePictureUrl;
    }

    if (Object.keys(updatedData).length === 0) {
      return h.response({ status: 'fail', message: 'Tidak ada data yang diperbarui.' }).code(400);
    }

    await updateUser(uid, updatedData);

    return h.response({
      status: 'success',
      message: 'Profil berhasil diperbarui',
    }).code(200);

  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Gagal memperbarui profil.' }).code(500);
  }
}

async function deleteAccountHandler(request, h) {
  try {
    const { uid } = request.auth.credentials;


    await deleteUser(uid);

    await admin.auth().deleteUser(uid);

    return h.response({
      status: 'success',
      message: 'Akun berhasil dihapus',
    }).code(200);

  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Gagal menghapus akun.' }).code(500);
  }
}

module.exports = {
  getProfileHandler,
  updateProfileHandler,
  deleteAccountHandler  };