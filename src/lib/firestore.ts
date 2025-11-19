import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface ContactFormData {
  name: string;
  email: string;
  scope: string;
  message: string;
}

export interface OracleQuery {
  query: string;
  domain: string;
  insight: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      timestamp: serverTimestamp(),
      status: 'new'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error };
  }
};

export const logOracleQuery = async (data: OracleQuery) => {
  try {
    await addDoc(collection(db, 'oracle_queries'), {
      ...data,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error logging oracle query:', error);
  }
};
