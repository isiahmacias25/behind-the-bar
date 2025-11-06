// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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

// format road name into valid email
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

  // get form inputs
  const roadName = document.getElementById('roadName').value;
  const password = document.getElementById('password').value;

  // format email
  const email = formatRoadNameToEmail(roadName);

  // sign user in
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // login failed alert
      alert("Login failed: " + error.message);
    });
});

// Auto logout after inactivity or tab close
let inactivityTimer;

// reset inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  }, 15 * 60 * 1000); // 15 min
}

// track activity
['click', 'mousemove', 'keydown', 'scroll'].forEach(evt => {
  window.addEventListener(evt, resetInactivityTimer);
});

// sign out on tab/window close
window.addEventListener('beforeunload', () => {
  signOut(auth);
});

// initialize inactivity timer on page load
resetInactivityTimer();
