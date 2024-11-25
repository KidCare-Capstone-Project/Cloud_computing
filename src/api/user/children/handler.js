const { uploadImageProfilechildren } = require('../../../services/googlestorageServices.js');
const admin = require('../../../services/firebaseService.js').admin;
const {
  addChildProfile,
  getChildProfiles,
  getChildProfileById,
  updateChildProfile,
  deleteChildProfile,
} = require('../../../services/firestoreService.js');

async function addChildProfileHandler(request, h) {
  try {
    const { nama, tanggalLahir, jenisKelamin, beratLahir, tinggiLahir, tinggiBadan, beratBadan } = request.payload;
    const fotoProfil = request.payload.fotoProfil;

    if (!nama || !tanggalLahir || !jenisKelamin || !beratLahir || !tinggiLahir || !tinggiBadan || !beratBadan || !fotoProfil) {
      return h.response({
        status: 'fail',
        message: 'Pastikan Untuk Mengisi Data Anaknya ya papah & Bunda.'
      }).code(400);
    }

    const fotoProfilUrl = await uploadImageProfilechildren(fotoProfil);

    const childProfileData = {
      nama,
      tanggalLahir,
      jenisKelamin,
      beratLahir,
      tinggiLahir,
      beratBadan,
      tinggiBadan,
      fotoProfilUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const userId = request.auth.credentials.uid;
    const childId = await addChildProfile(userId, childProfileData);

    return h.response({
      status: 'success',
      message: 'Profil anak berhasil ditambahkan.',
      data: {
        id: childId,
        ...childProfileData
      },
    }).code(201);

  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Gagal menambahkan profil anak.'
    }).code(500);
  }
}

async function getChildProfilesHandler(request, h) {
  try {

    const childProfiles = await getChildProfiles();

    return h.response({
      status: 'success',
      data: {
        childProfiles,
      },
    });
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Gagal mengambil profil anak.',
    }).code(500);
  }
}

async function getChildProfileByIdHandler(request, h) {
  try {
    const { id } = request.params;


    const childProfile = await getChildProfileById(id);

    if (!childProfile) {
      return h.response({
        status: 'fail',
        message: 'Profil anak tidak ditemukan.',
      }).code(404);
    }

    return h.response({
      status: 'success',
      data: {
        childProfile,
      },
    });
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Gagal mengambil profil anak.',
    }).code(500);
  }
}

async function updateChildProfileHandler(request, h) {
  try {
    const { id } = request.params;
    const { nama, tanggalLahir, jenisKelamin, beratLahir, tinggiLahir, tinggiBadan, beratBadan } = request.payload;
    const fotoProfil = request.payload.fotoProfil;

    let fotoProfilUrl = null;
    if (fotoProfil) {
      fotoProfilUrl = await uploadImageProfilechildren(fotoProfil);
    }

    const updatedData = {
      nama,
      tanggalLahir,
      jenisKelamin,
      beratLahir,
      tinggiLahir,
      tinggiBadan,
      beratBadan,
      fotoProfilUrl,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };


    await updateChildProfile(id, updatedData);

    return h.response({
      status: 'success',
      message: 'Profil anak berhasil diperbarui.',
    });
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Gagal memperbarui profil anak.',
    }).code(500);
  }
}

async function deleteChildProfileHandler(request, h) {
  try {
    const { id } = request.params;

    await deleteChildProfile(id);

    return h.response({
      status: 'success',
      message: 'Profil anak berhasil dihapus.',
    });
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Gagal menghapus profil anak.',
    }).code(500);
  }
}

module.exports = {
  addChildProfileHandler,
  getChildProfilesHandler,
  getChildProfileByIdHandler,
  updateChildProfileHandler,
  deleteChildProfileHandler
};