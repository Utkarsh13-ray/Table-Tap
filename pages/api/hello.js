// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function getData(url) {
  const data = await getDocs(collection(db, url))
  console.log(data.docs[0])
  return data.docs.map((doc)=>({id: doc.id, ...doc.data()}))
}
