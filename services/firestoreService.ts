
// FIX: Refactored to use the Firebase v8 namespaced API for Firestore operations to align with auth API changes.
import { firestore } from '../firebase';
import type { SimulationHistoryItem } from '../types';

const HISTORY_COLLECTION = 'simulations';
const USERS_COLLECTION = 'users';

type NewHistoryData = Omit<SimulationHistoryItem, 'id'>;

// Get user's simulation history
export const getUserHistory = async (userId: string): Promise<SimulationHistoryItem[]> => {
  const historyCollection = firestore.collection(HISTORY_COLLECTION);
  const q = historyCollection
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .limit(50);
  const querySnapshot = await q.get();
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as SimulationHistoryItem[];
};

// Add a new item to history
export const addSimulationToHistory = async (userId: string, data: NewHistoryData): Promise<string> => {
  const historyCollection = firestore.collection(HISTORY_COLLECTION);
  const docRef = await historyCollection.add({
    ...data,
    userId: userId, // Associate the record with the user
  });
  return docRef.id;
};

// Delete a single history item
export const deleteHistoryItem = async (itemId: string): Promise<void> => {
  const itemDocRef = firestore.collection(HISTORY_COLLECTION).doc(itemId);
  await itemDocRef.delete();
};

// Clear all history for a user
export const clearUserHistory = async (userId: string): Promise<void> => {
    const historyCollection = firestore.collection(HISTORY_COLLECTION);
    const q = historyCollection.where('userId', '==', userId);
    const querySnapshot = await q.get();
    
    if (querySnapshot.empty) {
        return;
    }

    const batch = firestore.batch();
    querySnapshot.docs.forEach(docSnapshot => {
        batch.delete(docSnapshot.ref);
    });
    
    await batch.commit();
};

// Get user's endorsed skills
export const getEndorsedSkills = async (userId: string): Promise<string[]> => {
  const userDocRef = firestore.collection(USERS_COLLECTION).doc(userId);
  const doc = await userDocRef.get();
  if (doc.exists) {
    const data = doc.data();
    if (data && Array.isArray(data.endorsedSkills)) {
      return data.endorsedSkills;
    }
  }
  return [];
};

// Update user's endorsed skills
export const updateEndorsedSkills = async (userId: string, skills: string[]): Promise<void> => {
  const userDocRef = firestore.collection(USERS_COLLECTION).doc(userId);
  await userDocRef.set({ endorsedSkills: skills }, { merge: true });
};
