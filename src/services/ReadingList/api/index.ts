import { db } from "../../../firebase-config";
import {collection,doc,getDocs,addDoc,deleteDoc,serverTimestamp } from "firebase/firestore";
const booksCollectionRef = collection(db, "books");

export const getReadingList = async () => {
    console.log(serverTimestamp ,'timestamp');
     const data = await getDocs(booksCollectionRef);
      return data.docs.map((doc) => ({...doc.data(),id:doc.id}));

    }



export const addBookToReadingList = async (body:any) => {
    console.log(body,'bodydd')
    if(!body?.image){
        body.image='';
    }
    const res = await addDoc(booksCollectionRef, {...body,'timestamp':serverTimestamp()});
    return res;
}

export const deleteBookFromReadingList = async (id:string) => {
    const bookDoc = doc(db, "books", id);
    const res = await deleteDoc(bookDoc);
    return res;
}