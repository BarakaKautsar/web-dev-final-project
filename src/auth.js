import { app } from "./firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { fetchUsers, updateUser } from "./firestore";
const auth = getAuth(app);

// auth state change

//sign up
signUpButton = document.getElementById("sign-up");
function signUp() {
  console.log("sign up");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  if (password !== confirmPassword) {
    alert("Password doesn't match");
    return;
  }
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // add user to database
        const newUser = {
          id: user.uid,
          name: user.email,
          email: user.email,
          cart: [],
        };
        updateUser(newUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  }
}
// login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}
// logout
function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("logout");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
