// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: `${process.env.NEXT_LOCAL_FIREBASE_KEY}`,
	authDomain: 'e-commerce-a52d3.firebaseapp.com',
	projectId: 'e-commerce-a52d3',
	storageBucket: 'e-commerce-a52d3.appspot.com',
	messagingSenderId: '32941231164',
	appId: '1:32941231164:web:1ff2b02b88fd01d8178739',
	measurementId: 'G-KWBRS9PEXK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
