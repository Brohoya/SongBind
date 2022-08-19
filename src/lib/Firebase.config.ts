import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { DocumentSnapshot } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// console.log(getApps.length);
if(!getApps.length) {
  const app = initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    if("measurementId" in firebaseConfig) {
      const analytics = getAnalytics()
    }
  }
}
  
/**
 * Convert a firestore document to JSON
 */
  
export function postToJSON(doc: DocumentSnapshot) {
  const data = doc.data();
  return {
      ...data,
      // Firestore timestamp not serializable to JSON
      createdAt: data?.createdAt.toMillis(),
      updatedAt: data?.updatedAt.toMillis(),
  }
}


  

