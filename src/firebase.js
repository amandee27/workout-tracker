import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAUm-nXwD5VOhvjO8ULxZfPWk9L0uGkaSo',
  authDomain: 'workout-tracker-a251d.firebaseapp.com',
  projectId: 'workout-tracker-a251d',
  storageBucket: 'workout-tracker-a251d.firebasestorage.app',
  messagingSenderId: '842687365367',
  appId: '1:842687365367:web:7ef69c256f2a01ce78d3f2',
  measurementId: 'G-LLXVM6J8QP',
};

const app = initializeApp(firebaseConfig);
//Init services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
