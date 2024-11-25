require('dotenv').config();
const { Firestore } = require('@google-cloud/firestore');

async function database() {
  const settings = {
    projectId: process.env.PROJECT_ID,
  };
  return new Firestore(process.env.APP_ENV === 'local' ? settings : undefined);
}

async function getUserByUid(uid) {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return null;
    }
    return { uid: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error('Error getting user by UID:', error);
    throw error;
  }
}

async function updateUser(uid, data) {
  try {
    await db.collection('users').doc(uid).update(data);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function deleteUser(uid) {
  try {
    await db.collection('users').doc(uid).delete();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

async function addArticle(articleData) {
  const db = await database();
  const articleRef = await db.collection('articles').add(articleData);
  return articleRef.id;
}

async function getAllArticles() {
  const db = await database();
  const snapshot = await db.collection('articles').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getArticleById(articleId) {
  const db = await database();
  const doc = await db.collection('articles').doc(articleId).get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...doc.data() };
}

async function updateArticle(articleId, updatedData) {
  const db = await database();
  await db.collection('articles').doc(articleId).update(updatedData);
}

async function deleteArticle(articleId) {
  const db = await database();
  await db.collection('articles').doc(articleId).delete();
}

async function addChildProfile(userId, childProfileData) {
  const db = await database();
  const childProfileRef = await db.collection('users').doc(userId).collection('children').add(childProfileData);
  return childProfileRef.id;
}

async function getChildProfiles(userId) {
  const db = await database();
  const snapshot = await db.collection('users').doc(userId).collection('children').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getChildProfileById(userId, childId) {
  const db = await database();
  const doc = await db.collection('users').doc(userId).collection('children').doc(childId).get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...doc.data() };
}

async function updateChildProfile(userId, childId, updatedData) {
  const db = await database();
  await db.collection('users').doc(userId).collection('children').doc(childId).update(updatedData);
}

async function deleteChildProfile(userId, childId) {
  const db = await database();
  await db.collection('users').doc(userId).collection('children').doc(childId).delete();
}

async function addMpsi(mpsiData) {
  const db = await database();
  const mpsiRef = await db.collection('mpasi').add(mpsiData);
  return mpsiRef.id;
}

async function getAllMpsi() {
  const db = await database();
  const snapshot = await db.collection('mpasi').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getMpsiById(mpsiId) {
  try {
    const db = await database();
    const doc = await db.collection('mpasi').doc(mpsiId).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error mengambil data MPASI:', error);
    throw error;
  }
}

async function updateMpsi(mpsiId, updatedData) {
  try {
    const db = await database();
    await db.collection('mpasi').doc(mpsiId).update(updatedData);
  } catch (error) {
    console.error('Error mengupdate data MPASI:', error);
    throw error;
  }
}

async function deleteMpsi(mpsiId) {
  try {
    const db = await database();
    await db.collection('mpasi').doc(mpsiId).delete();
  } catch (error) {
    console.error('Error menghapus data MPASI:', error);
    throw error;
  }
}
module.exports = {
  getUserByUid,
  updateUser,
  deleteUser,
  addArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  addChildProfile,
  getChildProfiles,
  getChildProfileById,
  updateChildProfile,
  deleteChildProfile,
  addMpsi,
  getAllMpsi,
  getMpsiById,
  updateMpsi,
  deleteMpsi,
};