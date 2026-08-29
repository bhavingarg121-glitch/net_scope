// =====================================
// NETSCOPE INDIA - FIREBASE ENGINE
// FIXED + REALTIME READY VERSION
// =====================================

// ==========================
// FIREBASE IMPORTS
// ==========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit,
    serverTimestamp,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ==========================
// FIREBASE CONFIG
// ==========================
const firebaseConfig = {
    apiKey: "AIzaSyBG-HUAwA7eJEqQLZUAWJ2KcGSzWjnb-h0",
    authDomain: "netscope-e7974.firebaseapp.com",
    projectId: "netscope-e7974",
    storageBucket: "netscope-e7974.appspot.com",
    messagingSenderId: "813986350854",
    appId: "1:813986350854:web:380209d5fb7f7d274b0087",
    measurementId: "G-LBFVYCPHVM"
};

// ==========================
// INIT APP
// ==========================
const app = initializeApp(firebaseConfig);

// ==========================
// FIRESTORE + AUTH
// ==========================
const db = getFirestore(app);
const auth = getAuth(app);

// ==========================
// ANALYTICS SAFE INIT
// ==========================
let analytics = null;

isSupported().then((yes) => {
    if (yes) {
        analytics = getAnalytics(app);
        console.log("📊 Firebase Analytics Enabled");
    }
});

// ==========================
// SAVE SPEED TEST
// ==========================
async function saveTestResult(data) {
    try {
        await addDoc(collection(db, "speedtests"), {
            ...data,
            createdAt: serverTimestamp()
        });

        console.log("✅ Speed test saved");
    } catch (err) {
        console.error("❌ saveTestResult error:", err);
    }
}

// ==========================
// SAVE AI INSIGHT
// ==========================
async function saveAIInsight(message) {
    try {
        await addDoc(collection(db, "aiInsights"), {
            message,
            createdAt: serverTimestamp()
        });

        console.log("✅ AI insight saved");
    } catch (err) {
        console.error("❌ saveAIInsight error:", err);
    }
}

// ==========================
// SAVE ACTIVITY
// ==========================
async function saveActivity(activity) {
    try {
        await addDoc(collection(db, "activities"), {
            activity,
            createdAt: serverTimestamp()
        });

        console.log("✅ Activity saved");
    } catch (err) {
        console.error("❌ saveActivity error:", err);
    }
}

// ==========================
// GET LATEST TESTS
// ==========================
async function getLatestTests() {
    try {
        const q = query(
            collection(db, "speedtests"),
            orderBy("createdAt", "desc"),
            limit(10)
        );

        const snap = await getDocs(q);

        return snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));

    } catch (err) {
        console.error("❌ getLatestTests error:", err);
        return [];
    }
}

// ==========================
// REALTIME SPEED TEST LISTENER
// ==========================
function listenSpeedTests(callback) {
    return onSnapshot(collection(db, "speedtests"), (snap) => {
        const data = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));

        callback(data);
    });
}

// ==========================
// GET AI INSIGHTS
// ==========================
async function getAIInsights() {
    try {
        const q = query(
            collection(db, "aiInsights"),
            orderBy("createdAt", "desc"),
            limit(5)
        );

        const snap = await getDocs(q);

        return snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));

    } catch (err) {
        console.error("❌ getAIInsights error:", err);
        return [];
    }
}

// ==========================
// GET ACTIVITIES
// ==========================
async function getActivities() {
    try {
        const q = query(
            collection(db, "activities"),
            orderBy("createdAt", "desc"),
            limit(10)
        );

        const snap = await getDocs(q);

        return snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));

    } catch (err) {
        console.error("❌ getActivities error:", err);
        return [];
    }
}

// ==========================
// ADMIN LOGIN (CONTROL CENTER)
// ==========================
async function loginAdmin(email, password) {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error("❌ login error:", err);
    }
}

// ==========================
// AUTH STATE MONITOR
// ==========================
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("🟢 Admin logged in:", user.email);
    } else {
        console.log("🔴 Admin logged out");
    }
});

// ==========================
// ONLINE/OFFLINE STATUS
// ==========================
window.addEventListener("online", () => {
    console.log("🟢 Internet Connected");
});

window.addEventListener("offline", () => {
    console.log("🔴 Internet Disconnected");
});

// ==========================
// EXPORT TO WINDOW (IMPORTANT FOR app.js)
// ==========================
window.db = db;

window.saveTestResult = saveTestResult;
window.saveAIInsight = saveAIInsight;
window.saveActivity = saveActivity;

window.getLatestTests = getLatestTests;
window.getAIInsights = getAIInsights;
window.getActivities = getActivities;

window.listenSpeedTests = listenSpeedTests;

window.loginAdmin = loginAdmin;

// ==========================
// READY
// ==========================
console.log("🚀 NetScope Firebase Engine Ready (FIXED)");
