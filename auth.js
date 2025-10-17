import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const firebaseConfig = {
  //config of your app
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("signupBtn").onclick = async () => {
  try { await createUserWithEmailAndPassword(auth, email.value, password.value);
    alert("Signup successful!"); window.location = "notes.html";
  } catch (e) { alert(e.message); }
};

document.getElementById("loginBtn").onclick = async () => {
  try { await signInWithEmailAndPassword(auth, email.value, password.value);
    alert("Login successful!"); window.location = "notes.html";
  } catch (e) { alert(e.message); }
};

