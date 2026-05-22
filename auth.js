// ==========================
// NETSCOPE INDIA ULTRA PRO
// auth.js
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

    getAuth,

    GoogleAuthProvider,

    signInWithPopup,

    signOut,

    onAuthStateChanged,

    setPersistence,

    browserLocalPersistence

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
// INITIALIZE APP
// ==========================

const app =
initializeApp(firebaseConfig);

// ==========================
// AUTH
// ==========================

const auth =
getAuth(app);

// ==========================
// GOOGLE PROVIDER
// ==========================

const provider =
new GoogleAuthProvider();

// OPTIONAL EXTRA SCOPES
provider.addScope("profile");
provider.addScope("email");

// CUSTOM PARAMS
provider.setCustomParameters({

    prompt:"select_account"

});

// ==========================
// PERSIST LOGIN
// ==========================

setPersistence(

    auth,

    browserLocalPersistence

)

.then(()=>{

    console.log(
        "✅ Auth Persistence Enabled"
    );

})

.catch((error)=>{

    console.error(
        "❌ Persistence Error:",
        error
    );

});

// ==========================
// LOGIN FUNCTION
// ==========================

async function login(){

    try{

        const result =

        await signInWithPopup(

            auth,
            provider

        );

        const user =
        result.user;

        console.log(
            "✅ Login Success",
            user
        );

        updateUserUI(user);

        showToast(
            "✅ Logged in successfully"
        );

    }

    catch(error){

        console.error(
            "❌ Login Error:",
            error
        );

        showToast(
            "❌ Login Failed"
        );

    }

}

// ==========================
// LOGOUT FUNCTION
// ==========================

async function logout(){

    try{

        await signOut(auth);

        console.log(
            "✅ Logged Out"
        );

        clearUserUI();

        showToast(
            "👋 Logged out"
        );

    }

    catch(error){

        console.error(
            "❌ Logout Error:",
            error
        );

    }

}

// ==========================
// AUTH STATE
// ==========================

onAuthStateChanged(

    auth,

    (user)=>{

        if(user){

            console.log(
                "🟢 User Logged In"
            );

            updateUserUI(user);

        }

        else{

            console.log(
                "🔴 No User"
            );

            clearUserUI();

        }

    }

);

// ==========================
// UPDATE UI
// ==========================

function updateUserUI(user){

    // USER NAME
    const userName =
    document.getElementById(
        "userName"
    );

    if(userName){

        userName.innerText =
        user.displayName || "User";

    }

    // EMAIL
    const userEmail =
    document.getElementById(
        "userEmail"
    );

    if(userEmail){

        userEmail.innerText =
        user.email || "";

    }

    // PHOTO
    const userPhoto =
    document.getElementById(
        "userPhoto"
    );

    if(userPhoto){

        userPhoto.src =
        user.photoURL ||

        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    }

    // LOGIN BTN
    const loginBtn =
    document.getElementById(
        "loginBtn"
    );

    if(loginBtn){

        loginBtn.style.display =
        "none";

    }

    // LOGOUT BTN
    const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

    if(logoutBtn){

        logoutBtn.style.display =
        "block";

    }

    // USER CARD
    const userCard =
    document.getElementById(
        "userCard"
    );

    if(userCard){

        userCard.style.display =
        "flex";

    }

}

// ==========================
// CLEAR UI
// ==========================

function clearUserUI(){

    const userName =
    document.getElementById(
        "userName"
    );

    if(userName){

        userName.innerText =
        "Guest User";

    }

    const userEmail =
    document.getElementById(
        "userEmail"
    );

    if(userEmail){

        userEmail.innerText =
        "Not Logged In";

    }

    const userPhoto =
    document.getElementById(
        "userPhoto"
    );

    if(userPhoto){

        userPhoto.src =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    }

    const loginBtn =
    document.getElementById(
        "loginBtn"
    );

    if(loginBtn){

        loginBtn.style.display =
        "block";

    }

    const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

    if(logoutBtn){

        logoutBtn.style.display =
        "none";

    }

}

// ==========================
// TOAST MESSAGE
// ==========================

function showToast(message){

    const toast =

    document.createElement("div");

    toast.innerText =
    message;

    toast.style.position =
    "fixed";

    toast.style.bottom =
    "20px";

    toast.style.right =
    "20px";

    toast.style.padding =
    "14px 20px";

    toast.style.background =
    "#101935";

    toast.style.color =
    "#ffffff";

    toast.style.borderRadius =
    "14px";

    toast.style.zIndex =
    "99999";

    toast.style.boxShadow =
    "0 0 20px rgba(0,0,0,0.5)";

    toast.style.fontSize =
    "14px";

    document.body.appendChild(
        toast
    );

    setTimeout(()=>{

        toast.remove();

    },3000);

}

// ==========================
// GET CURRENT USER
// ==========================

function getCurrentUser(){

    return auth.currentUser;

}

// ==========================
// EXPORT TO WINDOW
// ==========================

window.login =
login;

window.logout =
logout;

window.getCurrentUser =
getCurrentUser;

window.auth =
auth;

// ==========================
// READY
// ==========================

console.log(
    "🚀 Auth System Ready"
);
