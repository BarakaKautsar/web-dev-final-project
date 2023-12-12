import {
  doc,
  getFirestore,
  collection,
  onSnapshot,
  setDoc,
  getDoc,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
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

export const fetchProductbyId = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const productRef = doc(productsRef, id);

      const unsubscribe = onSnapshot(productRef, (doc) => {
        if (doc.exists()) {
          const product = { id: doc.id, ...doc.data() };
          // console.log("product:", product);
          resolve(product);
        } else {
          // Document doesn't exist
          console.error("Product not found");
          resolve(null);
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching product from Firestore:", error);
      reject(error);
    }
  });
};

export const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      const users = [];
      onSnapshot(usersRef, (snapshot) => {
        snapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        // console.log(users);
        resolve(users); // Resolve the promise with the fetched products
      });
    } catch (error) {
      console.error("Error fetching users from Firestore:", error);
      reject(error); // Reject the promise if there's an error
    }
  });
};

export const updateUser = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const userRef = doc(usersRef, user.id);
      updateDoc(userRef, user);
      console.log("User updated:", user);
      resolve(user);
    } catch (error) {
      console.error("Error updating user:", error);
      reject(error);
    }
  });
};

export const addUser = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const userRef = doc(usersRef, user.id);
      setDoc(userRef, user);
      console.log("User added:", user);
      resolve(user);
    } catch (error) {
      console.error("Error adding user:", error);
      reject(error);
    }
  });
};

export const fetchUserCart = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = doc(usersRef, user.uid);

      const snapshot = await getDoc(userRef);
      const productIdArray = snapshot.data().cart;

      // Use Promise.all to wait for all product fetch promises to resolve
      const productPromises = productIdArray.map((id) => fetchProductbyId(id));
      const userCart = await Promise.all(productPromises);

      // console.log("user cart:", userCart);
      resolve(userCart);
    } catch (error) {
      console.error("Error fetching user cart:", error);
      reject(error);
    }
  });
};

export const addToCart = async (user, productId) => {
  try {
    const userRef = doc(usersRef, user.uid);
    const snapshot = await getDoc(userRef);
    const productIdArray = snapshot.data().cart;

    const updatedCart = [...productIdArray, productId];

    await updateDoc(userRef, { cart: updatedCart });

    console.log("Added to cart:", productId);

    return updatedCart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error; // Reject the promise with the error
  }
};

export const removeProductFromCart = async (user, productId) => {
  try {
    const userRef = doc(usersRef, user.uid);

    // Remove the productId from the 'cart' array using arrayRemove
    await updateDoc(userRef, {
      cart: arrayRemove(productId),
    });

    console.log(`Product with ID ${productId} removed from the cart.`);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error; // Re-throw the error to handle it where the function is called, if necessary
  }
};
