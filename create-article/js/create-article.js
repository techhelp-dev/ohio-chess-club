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

  import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
  import { onAuthStateChanged, getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
  const auth = getAuth();
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



  const db = getDatabase();

  var dbRef = ref(db, '/posts');
  let boardnumber = 0;
  let postsMade = 0;
  let postNumber = 0;
  
  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      postsMade = postsMade + 1;
      console.log("Amount of posts: " + postsMade);
      postNumber = postsMade + 1;
    });
    document.getElementById('post-post').addEventListener('click', function(){
      finish(postNumber);
      console.log('Connected')
    })
  });
  
  let boards = {}; // create an object to hold all the boards
  
  function createBoard() {
    let boardposition = prompt('Please enter your FEN:');
    if (boardposition) {
      let boardid = Object.keys(boards).length + 1; // generate a unique board ID
      boards[boardid] = boardposition; // add the new board to the boards object
      alert('Please add this code where you want the board: ' + ` <div id="${boardid}" style="width: 400px"></div>`);
    }
  }
  
  document.getElementById('createboard-trigger').addEventListener('click', function(){
    createBoard();
  })
  
  function finish(postNumber) {
    var description = document.getElementById('description-field').value;
    var name = document.getElementById('name-field').value;
    var postData = {
      name,
      description,
      content: document.getElementById('post-content-enter1').value + `*` + document.getElementById('post-content-enter2').value + `*` + document.getElementById('post-content-enter3').value,
    };
    postData.boards = boards; // add the boards object to the postData object
    set(ref(db, 'posts/' + postNumber), postData);
    console.log('Post successful.');
    document.body.innerHTML = "Posted Successfully. Please reload to make another post.";
  }