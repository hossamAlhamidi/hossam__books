import { db } from '../../../firebase-config';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { BookItem } from '../../../types/global';
const booksCollectionRef = collection(db, 'books');

export const getReadingList = async () => {
  const data = await getDocs(booksCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addBookToReadingList = async (body: BookItem) => {
  if (!body?.image) {
    body.image = '';
  }
  const res = await addDoc(booksCollectionRef, {
    ...body,
    timestamp: serverTimestamp(),
  });
  return res;
};

export const deleteBookFromReadingList = async (id: string) => {
  const bookDoc = doc(db, 'books', id);
  const res = await deleteDoc(bookDoc);
  return res;
};
