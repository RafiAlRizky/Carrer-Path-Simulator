import { firestore } from '../firebase';
// Fix: Remove v9 modular imports for firestore.
import type { SimulationHistoryItem } from '../types';

const HISTORY_COLLECTION = 'simulations';

type NewHistoryData = Omit<SimulationHistoryItem, 'id'>;

// Get user's simulation history
export const getUserHistory = async (userId: string): Promise<SimulationHistoryItem[]> => {
  // Fix: Use v8 collection and query syntax.
  const historyRef = firestore.collection(HISTORY_COLLECTION);
  const q = historyRef
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc')
    .limit(50);
  // Fix: Use .get() method on the query.
  const querySnapshot = await q.get();
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as SimulationHistoryItem[];
};

// Add a new item to history
export const addSimulationToHistory = async (data: NewHistoryData): Promise<string> => {
  // Fix: Use v8 collection and add syntax.
  const historyRef = firestore.collection(HISTORY_COLLECTION);
  const docRef = await historyRef.add(data);
  return docRef.id;
};

// Delete a single history item
export const deleteHistoryItem = async (itemId: string): Promise<void> => {
  // Fix: Use v8 document reference and delete syntax.
  const itemDocRef = firestore.collection(HISTORY_COLLECTION).doc(itemId);
  await itemDocRef.delete();
};

// Clear all history for a user
export const clearUserHistory = async (userId: string): Promise<void> => {
    // Fix: Use v8 collection and query syntax.
    const historyRef = firestore.collection(HISTORY_COLLECTION);
    const q = historyRef.where('userId', '==', userId);
    // Fix: Use .get() method on the query.
    const querySnapshot = await q.get();
    
    if (querySnapshot.empty) {
        return;
    }

    // Fix: Use v8 batch syntax.
    const batch = firestore.batch();
    querySnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
};
