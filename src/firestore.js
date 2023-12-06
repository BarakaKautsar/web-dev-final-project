import { getFirestore, collection, onSnapshot } from "firebase/firestore";
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
        console.log(products);
        resolve(products); // Resolve the promise with the fetched products
      });
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
      reject(error); // Reject the promise if there's an error
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
        console.log(users);
        resolve(users); // Resolve the promise with the fetched products
      });
    } catch (error) {
      console.error("Error fetching products from Firestore:", error);
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
