import { app } from "./firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { fetchUsers, updateUser, addUser } from "./firestore";
export const auth = getAuth(app);

//sign up
const signUpButton = document.getElementById("sign-up");
if (signUpButton) {
  signUpButton.addEventListener("click", signUp);
}

// login
const loginButton = document.getElementById("login");
if (loginButton) {
  loginButton.addEventListener("click", login);
}

// logout
const logoutButton = document.getElementById("logout");
if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}

// sign up
async function signUp(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password === confirmPassword) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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

      await addUser(newUser);
      window.location.href = "user.html";
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      displayErrorMessage(errorMessage);
    }
  } else {
    console.log("passwords don't match");
    displayErrorMessage("Passwords don't match");
  }
}
// login
function login(event) {
  event.preventDefault();
  if (auth.currentUser) {
    console.log("user is already logged in");
    window.location.href = "user.html";
    return;
  } else {
    console.log("login");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        window.location.href = "user.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        displayErrorMessage(errorMessage);
      });
  }
}
// logout
function logout(event) {
  event.preventDefault();
  signOut(auth)
    .then(() => {
      window.location.href = "landing.html";
      console.log("logout");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

// display error message
function displayErrorMessage(message) {
  const errorMessageContainer = document.getElementById("error-message");
  console.log("Displaying error message:", message);

  // Create a div element for the error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  // Append the error message to the container
  errorMessageContainer.innerHTML = ""; // Clear previous messages
  errorMessageContainer.appendChild(errorDiv);
}

// display user info
const userInfoContainer = document.getElementById("user-info");
if (userInfoContainer) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      console.log("current user:" + auth.currentUser);
      userInfoContainer.innerHTML = `
        <p>Welcome ${user.email}</p>
        <p>User ID: ${user.uid}</p>
      `;
    } else {
      console.log("user is signed out");
      userInfoContainer.innerHTML = "";
      window.location.href = "landing.html";
    }
  });
}

const accountButton = document.getElementsByClassName("fa-user")[0];
if (accountButton) {
  accountButton.addEventListener("click", () => {
    if (!auth.currentUser) {
      window.location.href = "landing.html";
      return;
    } else {
      window.location.href = "user.html";
    }
  });
}

export const getUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        // console.log("current user: " + user.uid);
        resolve(user);
      } else {
        console.log("user is signed out");
        resolve(null);
      }
      // Ensure the observer is unsubscribed
      unsubscribe();
    });
  });
};
