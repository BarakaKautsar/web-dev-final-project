import { fetchProductbyId } from "./firestore.js";

document.getElementById("emailButton").addEventListener("click", function () {
  window.location.href = "mailto:barakakautsar@gmail.com";
});

document.getElementById("textButton").addEventListener("click", function () {
  window.location.href = "sms:13474630857";
});

document
  .getElementById("instagramButton")
  .addEventListener("click", function () {
    // Redirect to your Instagram page (replace 'your_instagram_username' with your username)
    window.location.href = "https://www.instagram.com/barakakautsar/";
  });

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  console.log("url:", url);
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get the product IDs from the URL parameters
const productIdsParam = getParameterByName(
  "products"
  //   "order.html?products=djrCwHijh10wfTgLO0Lx,Cb84ZSK2HZNfVIQ9PM3K"
);

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

//Display the product details on the page
const displayProductDetails = (productDetails) => {
  const productContainer = document.getElementById("order-list");
  console.log("Displaying product details...");
  productContainer.innerHTML = "";
  productDetails.forEach((product) => {
    console.log("Displaying product with ID:", product.id);

    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
      `;
    productContainer.appendChild(productElement);
  });
};

const calculateTotalPrice = (productDetails) => {
  return productDetails.reduce((total, product) => {
    return total + (product.price || 0); // Ensure product.price is a number
  }, 0);
};

console.log("current url: ", window.location.href);
// Call the function to fetch product details
// console.log("productIds:", productIds);
fetchProductDetails();

var urlParams = new URLSearchParams(window.location.search);
console.log("urlParams: " + urlParams);

// Get the value of the 'products' parameter
var products = urlParams.get("products");

// Log the products to the console (for demonstration purposes)
console.log(products);
