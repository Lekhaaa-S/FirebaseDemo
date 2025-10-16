// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCw21BOkaW1Zlemc8j40WcRCXg4pqRzv_U",
  authDomain: "fir-a4f20.firebaseapp.com",
  projectId: "fir-a4f20",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const titleInput = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const notesDiv = document.getElementById("notes");
const logoutBtn = document.getElementById("logoutBtn");
const saveBtn = document.getElementById("saveNoteBtn");

// Logout
logoutBtn.onclick = () => signOut(auth).then(() => window.location = "index.html");

// Save note under user's subcollection
saveBtn.onclick = async () => {
  const user = auth.currentUser;
  if (!user) return alert("Please log in first!");

  const userNotesRef = collection(db, "users", user.uid, "notes");
  await addDoc(userNotesRef, {
    title: titleInput.value,
    text: noteText.value,
    createdAt: Date.now()
  });

  titleInput.value = "";
  noteText.value = "";
  loadNotes();
};

// Load user's notes
async function loadNotes() {
  const user = auth.currentUser;
  if (!user) return;

  const userNotesRef = collection(db, "users", user.uid, "notes");
  const snapshot = await getDocs(userNotesRef);

  notesDiv.innerHTML = snapshot.docs
    .map(doc => {
      const data = doc.data();
      return `
        <div class="note">
          <h4>${data.title}</h4>
          <p>${data.text}</p>
        </div>
      `;
    })
    .join("");
}

// Monitor login state
onAuthStateChanged(auth, (user) => {
  if (user) loadNotes();
  else window.location = "index.html";
});
