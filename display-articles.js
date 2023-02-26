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

import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const db = getDatabase();

const postsRef = ref(db, 'posts');

onValue(postsRef, (snapshot) => {
    const childKeys = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      childKeys.push(childKey);
    });
    // Sort childKeys in descending order
    childKeys.sort((a, b) => b - a);
    childKeys.forEach((childKey) => {
      const childData = snapshot.child(childKey).val();
      console.log(childKey);
      console.log(childData);
      console.log(childData.description);
      var title = document.createElement("h1");
      title.textContent = childData.name;
      var description = document.createElement("h3");
      description.textContent = childData.description;
      var div = document.createElement("div");
      div.appendChild(title);
      div.appendChild(description);
      var styles = document.createElement("style");
      styles.innerHTML = `h1{font-size: 20px} h3{font-size: 15px} *{text-align: center;} button{background: #00001D; color: white; border-radius: 20px}`;
      div.appendChild(styles);
      var button = document.createElement('button');
    button.textContent = 'Read this post.';
    button.onclick = function() {
    location.href = `/post/?${childKey}`;
    };
    div.appendChild(button);
      document.body.appendChild(div);
    });
  }, {
    onlyOnce: true
  });
  