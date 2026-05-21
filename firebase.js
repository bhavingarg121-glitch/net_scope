// ==========================
// FIREBASE CONFIG
// firebase.js
// ==========================

// IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// YOUR FIREBASE CONFIG
// Replace with your Firebase project config

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "123456789",

    appId: "YOUR_APP_ID"

};


// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

// FIRESTORE DATABASE
const db = getFirestore(app);


// SAVE TEST FUNCTION
async function saveTestResult(data) {

    try {

        // ADD TO COLLECTION
        await addDoc(collection(db, "speedtests"), data);

        console.log("✅ Data saved to Firebase");

    }
    catch (error) {

        console.error("❌ Firebase Error:", error);

    }

}


// EXPORT
window.saveTestResult = saveTestResult;
