import { firestore } from '../firebase';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import type { SimulationHistoryItem } from '../types';

const HISTORY_COLLECTION = 'simulations';

type NewHistoryData = Omit<SimulationHistoryItem, 'id'>;

// Get user's simulation history
export const getUserHistory = async (userId: string): Promise<SimulationHistoryItem[]> => {
  const historyRef = collection(firestore, HISTORY_COLLECTION);
  const q = query(
    historyRef,
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(50)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as SimulationHistoryItem[];
};

// Add a new item to history
export const addSimulationToHistory = async (data: NewHistoryData): Promise<string> => {
  const historyRef = collection(firestore, HISTORY_COLLECTION);
  const docRef = await addDoc(historyRef, data);
  return docRef.id;
};

// Delete a single history item
export const deleteHistoryItem = async (itemId: string): Promise<void> => {
  const itemDocRef = doc(firestore, HISTORY_COLLECTION, itemId);
  await deleteDoc(itemDocRef);
};

// Clear all history for a user
export const clearUserHistory = async (userId: string): Promise<void> => {
    const historyRef = collection(firestore, HISTORY_COLLECTION);
    const q = query(historyRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
        return;
    }

    const batch = writeBatch(firestore);
    querySnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
};
