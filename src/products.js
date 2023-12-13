import { fetchProducts, addToCart, fetchUserCart } from "./firestore";
import { getUser } from "./auth";
let products = [];
let userCart = [];

const updateProducts = () => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((product) => {
    if (product.category !== categories.indexOf(activeCategory)) return;
    else {
      const card = document.createElement("div");
      card.className = "product-card";
      card.onclick = function () {
        showModal(product);
      };
      card.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
      `;
      productList.appendChild(card);
    }
  });
};

const initProductPage = async () => {
  try {
    products = await fetchProducts();
    console.log("Products:", products);
    updateProducts();
  } catch (error) {
    console.error("Error initializing product page:", error);
  }
};

initProductPage();
const productCategories = document.querySelector(".product-categories");
const categories = Array.from(productCategories.children);
let activeCategory = document.querySelector(".active-category");
const productList = document.getElementById("product-list");

function updateCategory(category) {
  activeCategory.classList.remove("active-category");
  category.classList.add("active-category");
  activeCategory = category;
}

productCategories.addEventListener("click", (e) => {
  const targetCategory = e.target.closest("li");
  if (!targetCategory) return;

  updateCategory(targetCategory);
  updateProducts();
});

const openOrderPage = (productId) => {
  console.log("Ordering product");

  // Validate if productId is not empty or undefined
  if (!productId) {
    console.error("Product ID is empty or undefined.");
    return;
  }
  const encodedProductId = encodeURIComponent(productId);
  const url = `order.html?product=${encodedProductId}`;
  window.location.href = url;

  // Delay the page reload to ensure navigation has completed
  setTimeout(() => {
    window.location.reload(true);
  }, 500); // Adjust the timeout as needed
};

function showModal(product) {
  console.log(product);
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>$${product.price.toFixed(2)}</p>
       <p>${product.desc}</p>
    `;
  const addToCartButton = document.createElement("button");
  addToCartButton.className = "add-to-cart-button";
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.onclick = async function () {
    try {
      const user = await getUser();

      if (user) {
        const productId = product.id;
        // Check if the product is already in the cart
        const userCart = await fetchUserCart(user);
        const isInCart = userCart.some(
          (cartProduct) => cartProduct.id === productId
        );

        if (isInCart) {
          // If the product is already in the cart, update the button text and disable the button
          addToCartButton.textContent = "Added to Cart";
          addToCartButton.disabled = true;
          return;
        }
        await addToCart(user, productId).then(() => {
          console.log("Product added to cart!");
          closeModal();
        });
      } else {
        console.log("User not logged in");
        window.location.href = "landing.html";
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle the error as needed
    }
  };
  modalContent.appendChild(addToCartButton);

  const orderButton = document.createElement("button");
  orderButton.className = "add-to-cart-button";
  orderButton.textContent = "Place Order";
  orderButton.onclick = function () {
    openOrderPage(product.id);
  };
  modalContent.appendChild(orderButton);

  const modal = document.getElementById("product-modal");
  modal.style.display = "block";
}

// Function to close the modal
window.closeModal = function () {
  const modal = document.getElementById("product-modal");
  modal.style.display = "none";
};

updateProducts();
