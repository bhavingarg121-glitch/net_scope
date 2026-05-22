// ==========================
// NETSCOPE INDIA
// firebase.js
// ==========================

// FIREBASE IMPORTS
import {

    initializeApp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getAnalytics

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

import {

    getFirestore,

    collection,

    addDoc,

    serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================
// FIREBASE CONFIG
// ==========================

const firebaseConfig = {

    apiKey:
    "AIzaSyBG-HUAwA7eJEqQLZUAWJ2KcGSzWjnb-h0",

    authDomain:
    "netscope-e7974.firebaseapp.com",

    projectId:
    "netscope-e7974",

    storageBucket:
    "netscope-e7974.firebasestorage.app",

    messagingSenderId:
    "813986350854",

    appId:
    "1:813986350854:web:380209d5fb7f7d274b0087",

    measurementId:
    "G-LBFVYCPHVM"

};

// ==========================
// INITIALIZE FIREBASE
// ==========================

const app =
initializeApp(firebaseConfig);

// ANALYTICS
const analytics =
getAnalytics(app);

// FIRESTORE DATABASE
const db =
getFirestore(app);

// ==========================
// SAVE SPEED TEST
// ==========================

async function saveTestResult(data){

    try{

        await addDoc(

            collection(
                db,
                "speedtests"
            ),

            {

                ...data,

                createdAt:
                serverTimestamp()

            }

        );

        console.log(
            "✅ Speed Test Saved"
        );

    }

    catch(error){

        console.error(
            "❌ Firebase Error:",
            error
        );

    }

}

// ==========================
// SAVE AI INSIGHTS
// ==========================

async function saveAIInsight(insight){

    try{

        await addDoc(

            collection(
                db,
                "aiInsights"
            ),

            {

                message:
                insight,

                createdAt:
                serverTimestamp()

            }

        );

        console.log(
            "✅ AI Insight Saved"
        );

    }

    catch(error){

        console.error(
            "❌ AI Error:",
            error
        );

    }

}

// ==========================
// SAVE LIVE ACTIVITY
// ==========================

async function saveActivity(activity){

    try{

        await addDoc(

            collection(
                db,
                "activities"
            ),

            {

                activity:
                activity,

                createdAt:
                serverTimestamp()

            }

        );

        console.log(
            "✅ Activity Saved"
        );

    }

    catch(error){

        console.error(
            "❌ Activity Error:",
            error
        );

    }

}

// ==========================
// EXPORT FUNCTIONS
// ==========================

window.saveTestResult =
saveTestResult;

window.saveAIInsight =
saveAIInsight;

window.saveActivity =
saveActivity;

window.db = db;
