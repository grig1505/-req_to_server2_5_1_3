import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyD0dWOEPfplcKbv4uwSGkc4LwyEIuBbb1o",
	authDomain: "productsproject-7a9cb.firebaseapp.com",
	projectId: "productsproject-7a9cb",
	storageBucket: "productsproject-7a9cb.firebasestorage.app",
	messagingSenderId: "344135000673",
	appId: "1:344135000673:web:3064f391e945cfffe00020",
	databaseURL: "https://productsproject-7a9cb-default-rtdb.firebaseio.com/",
};


const app = initializeApp(firebaseConfig);


export const db = getDatabase(app);
