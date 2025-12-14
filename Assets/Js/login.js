// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCTIK0ulR0uSHoiPBoK4Fymutw81sM7H_8",
  authDomain: "behindthebar.firebaseapp.com",
  projectId: "behindthebar",
  storageBucket: "behindthebar.firebasestorage.app",
  messagingSenderId: "134727677191",
  appId: "1:134727677191:web:6c15d2e83196abd36b81a2"
};

// Initialize Firebase and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// format road name into valid Firebase email
function formatRoadNameToEmail(roadName) {
  let cleanName = roadName.trim().toLowerCase();
  cleanName = cleanName.replace(/[^a-z0-9]/g, '.');
  cleanName = cleanName.replace(/\.+/g, '.');
  cleanName = cleanName.replace(/^\.|\.$/g, '');
  return `${cleanName}@behindthebar.com`;
}

// handle login form submit
const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const roadName = document.getElementById('roadName').value;
  const password = document.getElementById('password').value;
  const email = formatRoadNameToEmail(roadName);

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "Bartender/dashboard"; // redirect on success
    })
    .catch((error) => {
      alert("Login failed: " + error.message); // show error
    });
});
