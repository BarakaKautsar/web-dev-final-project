import { fetchProducts } from "./firestore";
let products = [];

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

// function updateProducts() {
//   const productList = document.getElementById("product-list");
//   productList.innerHTML = "";
//   products.forEach((product) => {
//     if (product.category !== categories.indexOf(activeCategory)) return;
//     else {
//       const card = document.createElement("div");
//       card.className = "product-card";
//       card.onclick = function () {
//         showModal(product);
//       };
//       card.innerHTML = `
//         <img src="${product.imageUrl}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <p>$${product.price.toFixed(2)}</p>
//     `;
//       productList.appendChild(card);
//     }
//   });
// }

productCategories.addEventListener("click", (e) => {
  const targetCategory = e.target.closest("li");
  if (!targetCategory) return;

  updateCategory(targetCategory);
  updateProducts();
});

function showModal(product) {
  console.log(product);
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>$${product.price.toFixed(2)}</p>
        <!-- Add more details as needed -->
    `;

  const modal = document.getElementById("product-modal");
  modal.style.display = "block";
}

// Function to close the modal
window.closeModal = function () {
  const modal = document.getElementById("product-modal");
  modal.style.display = "none";
};

updateProducts();
