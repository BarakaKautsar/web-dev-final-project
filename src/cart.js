import { fetchUserCart, removeProductFromCart } from "./firestore";
import { getUser } from "./auth";

let user = null;
let products = [];
const cart = document.getElementById("cart-list");

const updateCart = () => {
  cart.innerHTML = "";
  products.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        `;
    cart.appendChild(cartItem);
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeProductFromCart(user, product.id).then(() => {
        updateCart();
      });
    };
    cartItem.appendChild(removeButton);
  });
};

const initCart = async () => {
  try {
    const userCart = await fetchUserCart(user);
    products = userCart;
    updateCart();
  } catch (error) {
    console.error("Error initializing cart:", error);
  }
};

const getCurrentUser = async () => {
  try {
    user = await getUser();
    console.log("User:", user);

    if (user) {
      initCart();
    } else {
      console.log("User not logged in");
      window.location.href = "landing.html";
    }
  } catch (error) {
    console.error("Error getting user:", error);
  }
};

// Call getCurrentUser when the DOM is loaded
document.addEventListener("DOMContentLoaded", getCurrentUser);

const openOrderPage = () => {
  console.log("Ordering products");

  // Get an array of product IDs
  const productIds = products.map((product) => product.id);
  console.log(productIds);

  // Encode each product ID
  const encodedProductIds = productIds.map(encodeURIComponent).join(",");
  console.log(encodedProductIds);

  // Construct the URL with encoded product IDs
  const url = `order.html?products=${encodedProductIds}`;

  // console.log(url);
  // Uncomment the line below to navigate to the constructed URL
  window.location.href = url;
  // Delay the page reload to ensure navigation has completed
  setTimeout(() => {
    window.location.reload(true);
  }, 500); // Adjust the timeout as needed
};

const orderButton = document.getElementById("order-button");
orderButton.addEventListener("click", openOrderPage);
