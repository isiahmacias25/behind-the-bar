// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTIK0ulR0uSHoiPBoK4Fymutw81sM7H_8",
  authDomain: "behindthebar.firebaseapp.com",
  projectId: "behindthebar",
  storageBucket: "behindthebar.firebasestorage.app",
  messagingSenderId: "134727677191",
  appId: "1:134727677191:web:6c15d2e83196abd36b81a2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Form Handling
const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get Input Values
  const roadName = document.getElementById('roadName').value;
  const password = document.getElementById('password').value;

  // Map Road Name to Firebase Email
  const email = `${roadName}@behindthebar.com`;

  // Sign In User
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Redirect on Successful Login
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Show Error if Login Fails
      alert("Login failed: " + error.message);
    });
});
