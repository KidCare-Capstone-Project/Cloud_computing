const admin = require('../../services/firebaseService.js').admin;
const {
  addArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
} = require('../../services/firestoreService.js');
const { uploadImageArticles, deleteImageArticle } = require('../../services/googlestorageServices.js');

async function addArticleHandler(request, h) {
  try {
    const { title, topic, content } = request.payload;
    const thumbnail = request.payload.thumbnail;

    if (!title || !topic || !content || !thumbnail) {
      return h.response({
        status: 'fail',
        message: 'Title, topic, content, dan thumbnail harus diisi.'
      }).code(400);
    }

    const thumbnailUrl = await uploadImageArticles(thumbnail);

    const articleData = {
      title,
      topic,
      content,
      thumbnailUrl,
      loveBy: [],
      loveCount: 0,
      viewCount: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const articleId = await addArticle(articleData);

    return h.response({
      status: 'success',
      message: 'Artikel berhasil ditambahkan.',
      data: {
        id: articleId,
        ...articleData,
      },
    }).code(201);

  } catch (error) {
    console.error('Error menambahkan artikel:', error);
    return h.response({
      status: 'error',
      message: 'Gagal menambahkan artikel.'
    }).code(500);
  }
}


async function getAllArticlesHandler(request, h) {
  try {
    const articles = await getAllArticles();
    return h.response({
      status: 'success',
      data: {
        articles,
      },
    });
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Gagal mengambil artikel.',
    }).code(500);
  }
}

async function getArticleByIdHandler(request, h) {
  try {
    const { id } = request.params;
    const article = await getArticleById(id);

    if (!article) {
      return h.response({
        status: 'fail',
        message: 'Artikel tidak ditemukan.',
      }).code(404);
    }

    await updateArticle(id, { viewCount: article.viewCount + 1 });

    return h.response({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Gagal mengambil artikel.',
    }).code(500);
  }
}

async function updateArticleHandler(request, h) {
  try {
    const { id } = request.params;
    const { title, topic, content } = request.payload;
    const thumbnail = request.payload.thumbnail;

    const updatedData = {
      title: title,
      topic: topic,
      content: content,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (thumbnail) {
      const thumbnailUrl = await uploadImageArticles(thumbnail);
      updatedData.thumbnailUrl = thumbnailUrl;
    }

    await updateArticle(id, updatedData);

    return h.response({
      status: 'success',
      message: 'Artikel berhasil diperbarui.',
    });
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Gagal memperbarui artikel.',
    }).code(500);
  }
}

async function deleteArticleHandler(request, h) {
  try {
    const { id } = request.params;

    const article = await getArticleById(id);

    if (!article) {
      return h.response({
        status: 'fail',
        message: 'Artikel tidak ditemukan.'
      }).code(404);
    }

    if (article.thumbnailUrl) {
      await deleteImageArticle(article.thumbnailUrl);
    }

    await deleteArticle(id);

    return h.response({
      status: 'success',
      message: 'Artikel berhasil dihapus.',
    });
  } catch (error) {
    console.error(error);
    return h.response({
      status: 'error',
      message: 'Gagal menghapus artikel.',
    }).code(500);
  }
}

module.exports = {
  addArticleHandler,
  getAllArticlesHandler,
  getArticleByIdHandler,
  updateArticleHandler,
  deleteArticleHandler
};