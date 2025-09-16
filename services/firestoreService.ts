
// FIX: Refactored to use the Firebase v8 namespaced API for Firestore operations to align with auth API changes.
import { firestore } from '../firebase';
import type { SimulationHistoryItem } from '../types';

const HISTORY_COLLECTION = 'simulations';

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
export const addSimulationToHistory = async (data: NewHistoryData): Promise<string> => {
  const historyCollection = firestore.collection(HISTORY_COLLECTION);
  const docRef = await historyCollection.add(data);
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
