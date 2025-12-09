// Import Firebase app initializer
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// Import Firebase auth + signOut
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCTIK0ulR0uSHoiPBoK4Fymutw81sM7H_8",
  authDomain: "behindthebar.firebaseapp.com",
  projectId: "behindthebar",
  storageBucket: "behindthebar.firebasestorage.app",
  messagingSenderId: "134727677191",
  appId: "1:134727677191:web:6c15d2e83196abd36b81a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth instance
const auth = getAuth(app);

// Get logout button
const logoutBtn = document.getElementById("logoutBtn");

// Listen for click on logout button
logoutBtn.addEventListener("click", () => {
  
  // Sign the user out
  signOut(auth)
    .then(() => {
      
      // Redirect to login page after logout
      window.location.href = "index.html";
    })
    .catch((error) => {
      
      // Show why logout failed (rare)
      alert("Logout failed: " + error.message);
    });
});
