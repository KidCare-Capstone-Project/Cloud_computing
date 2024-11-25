require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

async function uploadImageProfile(userId, imageBuffer, mimeType = 'image/jpeg') {
  try {
    const bucket = storage.bucket(bucketName);
    const filename = `profile/${userId}.jpg`;
    const file = bucket.file(filename);

    await file.save(imageBuffer, {
      metadata: {
        contentType: mimeType,
      },
    });

    return `gs://${bucketName}/${filename}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}
async function uploadImageArticles(file) {
  try {
    const bucket = storage.bucket(bucketName);
    const filename = `articles/${uuidv4()}-${file.hapi.filename}`;
    const fileUpload = bucket.file(filename);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.hapi.headers['content-type']
      }
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        console.error('Error uploading image:', error);
        reject('Gagal mengupload gambar.');
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
        resolve(publicUrl);
      });

      blobStream.end(file._data);

    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

async function uploadImageProfilechildren(file) {
  try {
    const bucket = storage.bucket(bucketName);
    const filename = `profile/${uuidv4()}-${file.hapi.filename}`;
    const fileUpload = bucket.file(filename);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.hapi.headers['content-type']
      }
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        console.error('Error uploading image:', error);
        reject('Gagal mengupload gambar.');
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
        resolve(publicUrl);
      });

      blobStream.end(file._data);

    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

async function uploadImageMpsi(gambar) {
  try {
    if (!gambar) {
      throw new Error('Tidak ada gambar yang diunggah.');
    }

    const bucket = storage.bucket(bucketName);
    const filename = `MPSI/${uuidv4()}-${gambar.hapi.filename}`;
    const fileUpload = bucket.file(filename);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: gambar.hapi.headers['content-type']
      }
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        console.error('Error mengupload gambar:', error);
        reject('Gagal mengupload gambar.');
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
        resolve(publicUrl);
      });

      blobStream.end(gambar._data);
    });
  } catch (error) {
    console.error('Error mengupload gambar:', error);
    throw error;
  }
}

async function deleteImageProfile(userId) {
  try {
    const bucket = storage.bucket(bucketName);
    const filename = `profile/${userId}.jpg`;
    const file = bucket.file(filename);

    await file.delete();
    console.log(`gs://${bucketName}/${filename} deleted.`);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

async function deleteImageArticle(imageUrl) {
  try {
    const bucket = storage.bucket(bucketName);

    const filename = imageUrl.split('/articles/')[1];
    const file = bucket.file(`articles/${filename}`);

    console.log(`Filename received: ${filename}`);

    const [exists] = await file.exists();
    if (!exists) {
      console.error(`File not found: gs://${bucketName}/articles/${filename}`);
      return;
    }

    await file.delete();
    console.log(`gs://${bucketName}/articles/${filename} deleted.`);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

async function deleteImageProfileChildren(filename) {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(`profile/${filename}`);

    await file.delete();
    console.log(`gs://${bucketName}/profile/${filename} deleted.`);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

async function deleteImageMpsi(imageUrl) {
  try {
    if (!imageUrl) {
      throw new Error('URL gambar tidak valid.');
    }

    const filename = imageUrl.split('/').pop();

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filename);

    await file.delete();

    console.log(`Gambar ${filename} berhasil dihapus.`);
  } catch (error) {
    console.error('Error menghapus gambar:', error);
    throw error;
  }
}
module.exports = { uploadImageProfile, uploadImageArticles, uploadImageProfilechildren, uploadImageMpsi, deleteImageProfile, deleteImageArticle, deleteImageProfileChildren, deleteImageMpsi };