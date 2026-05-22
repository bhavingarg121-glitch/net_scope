// ==========================
// NETSCOPE INDIA ULTRA PRO
// firebase.js
// ==========================

// ==========================
// FIREBASE IMPORTS
// ==========================

import {

    initializeApp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getAnalytics,
    isSupported

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

import {

    getFirestore,

    collection,

    addDoc,

    getDocs,

    query,

    orderBy,

    limit,

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
    "netscope-e7974.appspot.com",

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

// ==========================
// ANALYTICS SAFE INIT
// ==========================

let analytics = null;

isSupported().then((yes)=>{

    if(yes){

        analytics =
        getAnalytics(app);

        console.log(
            "✅ Firebase Analytics Enabled"
        );

    }

});

// ==========================
// FIRESTORE DATABASE
// ==========================

const db =
getFirestore(app);

console.log(
    "✅ Firestore Connected"
);

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
// SAVE AI INSIGHT
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
            "❌ AI Insight Error:",
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
// GET LATEST TESTS
// ==========================

async function getLatestTests(){

    try{

        const q = query(

            collection(
                db,
                "speedtests"
            ),

            orderBy(
                "createdAt",
                "desc"
            ),

            limit(10)

        );

        const snapshot =
        await getDocs(q);

        const tests = [];

        snapshot.forEach((doc)=>{

            tests.push({

                id:doc.id,

                ...doc.data()

            });

        });

        return tests;

    }

    catch(error){

        console.error(
            "❌ Fetch Error:",
            error
        );

        return [];

    }

}

// ==========================
// GET AI INSIGHTS
// ==========================

async function getAIInsights(){

    try{

        const q = query(

            collection(
                db,
                "aiInsights"
            ),

            orderBy(
                "createdAt",
                "desc"
            ),

            limit(5)

        );

        const snapshot =
        await getDocs(q);

        const insights = [];

        snapshot.forEach((doc)=>{

            insights.push({

                id:doc.id,

                ...doc.data()

            });

        });

        return insights;

    }

    catch(error){

        console.error(
            "❌ AI Fetch Error:",
            error
        );

        return [];

    }

}

// ==========================
// GET ACTIVITIES
// ==========================

async function getActivities(){

    try{

        const q = query(

            collection(
                db,
                "activities"
            ),

            orderBy(
                "createdAt",
                "desc"
            ),

            limit(10)

        );

        const snapshot =
        await getDocs(q);

        const activities = [];

        snapshot.forEach((doc)=>{

            activities.push({

                id:doc.id,

                ...doc.data()

            });

        });

        return activities;

    }

    catch(error){

        console.error(
            "❌ Activity Fetch Error:",
            error
        );

        return [];

    }

}

// ==========================
// NETWORK STATUS LOGGER
// ==========================

function logConnectionStatus(){

    window.addEventListener(

        "online",

        ()=>{

            console.log(
                "🟢 Internet Connected"
            );

        }

    );

    window.addEventListener(

        "offline",

        ()=>{

            console.log(
                "🔴 Internet Disconnected"
            );

        }

    );

}

logConnectionStatus();

// ==========================
// EXPORT FUNCTIONS
// ==========================

window.saveTestResult =
saveTestResult;

window.saveAIInsight =
saveAIInsight;

window.saveActivity =
saveActivity;

window.getLatestTests =
getLatestTests;

window.getAIInsights =
getAIInsights;

window.getActivities =
getActivities;

window.db = db;

// ==========================
// READY MESSAGE
// ==========================

console.log(
    "🚀 NetScope Firebase Ready"
);
