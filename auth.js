import {

    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "XXXXXXXX",

    appId: "YOUR_APP_ID"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

function login(){

    signInWithPopup(auth,provider)

    .then((result)=>{

        const user = result.user;

        document.getElementById("userName")
        .innerText = user.displayName;

    });

}

function logout(){

    signOut(auth);

}

onAuthStateChanged(auth,(user)=>{

    if(user){

        document.getElementById("userName")
        .innerText = user.displayName;

    }

});

window.login = login;
window.logout = logout;
