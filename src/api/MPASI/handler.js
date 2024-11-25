const admin = require('../../services/firebaseService.js').admin;
const {
  addMpsi,
  getAllMpsi,
  getMpsiById,
  updateMpsi,
  deleteMpsi
} = require('../../services/firestoreService.js');
const { uploadImageMpsi, deleteImageMpsi } = require('../../services/googlestorageServices.js');

const addHandlerMpsi = async (request, h) => {
  try {
    const {
      judul,
      kategori,
      usia,
      porsi,
      bahan,
      bumbuHalus,
      caraMembuat
    } = request.payload;

    const gambar = request.payload.gambar;
    if (!gambar || !gambar.hapi) {
      return h.response({ status: 'fail', message: 'Gambar tidak valid' }).code(400);
    }

    if (!judul || !kategori || !usia || !porsi || !bahan || !bumbuHalus || !caraMembuat || !gambar) {
      return h.response({ status: 'fail', message: 'Data MPASI tidak lengkap' }).code(400);
    }
    if (isNaN(usia) || isNaN(porsi)) {
      return h.response({ status: 'fail', message: 'Usia dan porsi harus berupa angka' }).code(400);
    }

    let gambarUrl;
    try {
      gambarUrl = await uploadImageMpsi(gambar, 'mpasi');
    } catch (uploadError) {
      console.error('Error mengupload gambar:', uploadError);
      return h.response({ status: 'error', message: 'Gagal mengupload gambar' }).code(500);
    }

    const mpsiData = {
      judul,
      kategori,
      usia,
      porsi,
      bahan,
      bumbuHalus,
      caraMembuat,
      gambar: gambarUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const mpsiId = await addMpsi(mpsiData);

    return h.response({
      status: 'success',
      message: 'MPASI berhasil ditambahkan',
      data: {
        id: mpsiId,

      }
    }).code(201);

  } catch (error) {
    console.error('Error menambahkan MPASI:', error);
    return h.response({ status: 'error', message: 'Gagal menambahkan MPASI' }).code(500);
  }
};

const getAllMpsiHandler = async (request, h) => {
  try {
    const { bulan } = request.query;

    const mpsiList = await getAllMpsi(bulan);

    return h.response({
      status: 'success',
      data: mpsiList,
    });

  } catch (error) {
    console.error('Error mengambil data MPASI:', error);
    return h.response({ status: 'error', message: 'Gagal mengambil data MPASI' }).code(500);
  }
};

const getMpsiByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;

    const mpsi = await getMpsiById(id);

    if (!mpsi) {
      return h.response({ status: 'fail', message: 'MPASI tidak ditemukan' }).code(404);
    }

    return h.response({
      status: 'success',
      data: mpsi,
    });

  } catch (error) {
    console.error('Error mengambil data MPASI:', error);
    return h.response({ status: 'error', message: 'Gagal mengambil data MPASI' }).code(500);
  }
};

const updateMpsiHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const {
      judul,
      kategori,
      usia,
      porsi,
      bahan,
      bumbuHalus,
      caraMembuat,
    } = request.payload;

    const gambar = request.payload.gambar;

    if (!judul && !kategori && !usia && !porsi && !bahan && !bumbuHalus && !caraMembuat && !gambar) {
      return h.response({ status: 'fail', message: 'Tidak ada data yang diperbarui' }).code(400);
    }

    const updatedData = {};
    if (judul) updatedData.judul = judul;
    if (kategori) updatedData.kategori = kategori;
    if (usia) updatedData.usia = usia;
    if (porsi) updatedData.porsi = porsi;
    if (bahan) updatedData.bahan = bahan;
    if (bumbuHalus) updatedData.bumbuHalus = bumbuHalus;
    if (caraMembuat) updatedData.caraMembuat = caraMembuat;

    if (gambar) {

      const mpsi = await getMpsiById(id);
      if (mpsi.gambar) {
        await deleteImageMpsi(mpsi.gambar);
      }

      updatedData.gambar = await uploadImageMpsi(gambar, 'mpasi');
    }

    await updateMpsi(id, {
      ...updatedData,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return h.response({
      status: 'success',
      message: 'MPASI berhasil diperbarui',
    });

  } catch (error) {
    console.error('Error mengupdate MPASI:', error);
    return h.response({ status: 'error', message: 'Gagal mengupdate MPASI' }).code(500);
  }
};

const deleteMpsiHandler = async (request, h) => {
  try {
    const { id } = request.params;

    const mpsi = await getMpsiById(id);
    if (mpsi.gambar) {
      await deleteImageMpsi(mpsi.gambar);
    }

    await deleteMpsi(id);

    return h.response({
      status: 'success',
      message: 'MPASI berhasil dihapus',
    });

  } catch (error) {
    console.error('Error menghapus MPASI:', error);
    return h.response({ status: 'error', message: 'Gagal menghapus MPASI' }).code(500);
  }
};

module.exports = { addHandlerMpsi, getAllMpsiHandler, getMpsiByIdHandler, updateMpsiHandler, deleteMpsiHandler };