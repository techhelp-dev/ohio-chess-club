  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBCIg7D0HRBQtPNmvoeC8TNqZn5gQDtvww",
    authDomain: "ohiochessclub-7a77c.firebaseapp.com",
    projectId: "ohiochessclub-7a77c",
    storageBucket: "ohiochessclub-7a77c.appspot.com",
    messagingSenderId: "1078907166132",
    appId: "1:1078907166132:web:15c235b401bdf4eb2b26e1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  function GoogleLogin(){
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
  });
  }
  
  document.getElementById('google-trigger').addEventListener('click', function(){
    GoogleLogin();
  })


    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("Sign-in provider: " + user.providerId);
        console.log("Provider-specific UID: " + user.uid);
        console.log("Name: " + user.displayName);
        console.log("Email: " + user.email);
        console.log("Photo URL: " + user.photoURL);
    } else {
        // User is signed out
        // ...
    }
    });

    document.getElementById('signout-trigger').addEventListener('click', function(){
        signOutUser();
    })

 function signOutUser(){
    const auth = getAuth();
    signOut(auth).then(() => {
    console.clear();
    console.log('Successful Logout')
    }).catch((error) => {
    // An error happened.
    });
 }