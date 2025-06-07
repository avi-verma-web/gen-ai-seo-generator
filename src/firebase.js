import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAYNXIMZrsDaquIE_isKyMoRLbbREXBIpE",
	authDomain: "avi-gen-ai-seo-generator.firebaseapp.com",
	projectId: "avi-gen-ai-seo-generator",
	storageBucket: "avi-gen-ai-seo-generator.firebasestorage.app",
	messagingSenderId: "331999023252",
	appId: "1:331999023252:web:b33cc1fd115356169aa481",
	measurementId: "G-GXE6L9B3F1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
