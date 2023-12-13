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
- **Deployment:** Vercel for hosting and continuous deployment from a Git repository. (special thanks to [Bach Le](https://github.com/bachdumpling) for helping with this :D )

### JavaScript Files Overview

1. **Firebase-config.js:** Firebase configuration settings for the web app.
2. **Firestore.js:** Manages CRUD operations for user and product data in Firestore.
3. **Auth.js:** Handles user authentication functions (sign up, log in, log out).
4. **Products.js:** Controls functionality on the main index page.
5. **Cart.js:** Manages functionality for the user cart page.
6. **Order.js:** Handles the functionality for the order page, fetching and displaying product details.

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
