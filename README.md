# BACK2BANDUNG Site Read Me

## Project Overview

This website is developed as a final project for the NYU IDM Intro to Web Development course. This website is meant to be used as a catalog for the things I’m going to sell because I’m moving back to Indonesia in January 2024. Here, the user can view all the things I’m selling including the photos, descriptions, and price. The user can use the cart functionality to order multiple items at once after signing up to the website using their email address. However, the website does not currently handle transactions and therefore the user is directed to contact me directly, either through email; text; or social media, in order to make a purchase.

### Site URL

[BACK2BANDUNG Site](web-dev-final-project-49g3-barakakautsars-projects.vercel.app)

## Functionality

### Pages Overview

1. **Main Page:** Displays categorized products for sale.
2. **Product Modal:** Provides detailed information about a product on click.
3. **Authentication Pages:** Handles sign up, login, and user account information.
4. **User Info Page:** Displays logged-in user information and allows log out.
5. **Cart Page:** Shows products added to the cart and enables order placement.
6. **Order Page:** Allows users to review selected products and contact for purchase.
7. **FAQ Page:** Provides answers to frequently asked questions and contact links.

### Tools and Frameworks Used

- **Backend:** Firebase for authentication and Firestore for storing user and product data.
- **Deployment:** Vercel for hosting and continuous deployment from a Git repository. (special thanks to @bachdumpling for helping with this :D )

### JavaScript Files Overview

1. **Firebase-config.js:** Firebase configuration settings for the web app.

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCbNF8RlkhrSTBmGub6mWMtCfJIBE23PPw",
  authDomain: "back2bandung.firebaseapp.com",
  databaseURL: "https://back2bandung-default-rtdb.firebaseio.com",
  projectId: "back2bandung",
  storageBucket: "back2bandung.appspot.com",
  messagingSenderId: "1055417846854",
  appId: "1:1055417846854:web:f80aace8996beb4fcf0e47",
  measurementId: "G-9TZPBMY2S6",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
```

2. **Firestore.js:** Manages CRUD operations for user and product data in Firestore.

```javascript
import { app } from "./firebase-config";

const db = getFirestore(app);
const productsRef = collection(db, "products");
const usersRef = collection(db, "users");

export const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    try {
      const products = [];
      onSnapshot(productsRef, (snapshot) => {
        snapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        // console.log(products);
        resolve(products); // Resolve the promise with the fetched products
      });
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
      reject(error); // Reject the promise if there's an error
    }
  });
};
```

3. **Auth.js:** Handles user authentication functions (sign up, log in, log out).

```javascript
import { app } from "./firebase-config";
export const auth = getAuth(app);
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
```

4. **Products.js:** Controls functionality on the main index page.

```javascript
import { fetchProducts, addToCart, fetchUserCart } from "./firestore";
import { getUser } from "./auth";
let products = [];

const initProductPage = async () => {
  try {
    products = await fetchProducts();
    console.log("Products:", products);
    updateProducts();
  } catch (error) {
    console.error("Error initializing product page:", error);
  }
};
```

5. **Cart.js:** Manages functionality for the user cart page.

```javascript
import { fetchUserCart, removeProductFromCart } from "./firestore";
import { getUser } from "./auth";
const initCart = async () => {
  try {
    const userCart = await fetchUserCart(user);
    products = userCart;
    updateCart();
  } catch (error) {
    console.error("Error initializing cart:", error);
  }
};
```

6. **Order.js:** Handles the functionality for the order page, fetching and displaying product details.

```javascript
import { fetchProductbyId } from "./firestore.js";
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Get the product IDs from the URL parameters
const productIdsParam = getParameterByName("products");

// Split the comma-separated product IDs into an array
const productIds = productIdsParam ? productIdsParam.split(",") : [];

// Fetch product details for each product ID
const fetchProductDetails = async () => {
  try {
    const productDetails = await Promise.all(productIds.map(fetchProductbyId));
    displayProductDetails(productDetails);
    const totalPrice = calculateTotalPrice(productDetails);
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};
```

## How to Use

1. **Clone the Repository:** Use `git clone [repository_url]` in your terminal.
2. **Open the Files:** Explore and review the code files.
3. **Run the Website Locally:** Use a local server or development environment to view the website.

## To-Do List & Improvements

- Ensure mobile responsiveness and enhance the site's visual appeal on mobile devices.
- Expand the range of items available for sale.
- Implement multiple images for each product.
- Include a feature to display sold items.
- Allow users to modify their account details and delete their accounts.
- Develop an admin page to manage data more efficiently through an interface.
