# Static HTML Product Page with Vanilla JavaScript

## Description
This project is a simple static product page built with HTML, CSS, and Vanilla JavaScript. It features dynamic product thumbnails, a floating checkout button that displays the total number of items in the cart, and detailed cart functionality.

---

## Features

### 1. Dynamic Product Thumbnails
- The product thumbnail changes based on the selected color.

### 2. Floating Checkout Button
- The floating checkout button displays the total number of products in the cart in real time.
- Clicking on the button will show the cart's contents.

### 3. Add to Cart Functionality
- Clicking the "Add to Cart" button adds the product to the cart with the following details:
  - Selected **quantity**
  - Selected **color**
  - Product **image**
  - Product **price**

---

## Technologies Used
- **HTML**: For the structure of the page.
- **CSS**: For styling and responsiveness.
- **JavaScript**: For dynamic functionality.

---

## How It Works

### 1. Product Thumbnail Update
- **JavaScript Event Listener**:
  - Detects changes in the selected color.
  - Updates the product's main image to match the color selected.

### 2. Floating Checkout Button
- **Floating Button**:
  - Always visible as the user scrolls.
  - Updates dynamically to show the current number of items in the cart.

### 3. Cart Functionality
- **Add to Cart**:
  - Captures the selected product details and updates the cart array.
  - Dynamically displays the total quantity in the floating checkout button.
  - Example cart details:
    ```json
    {
      "quantity": 2,
      "color": "purple",
      "image": "img/to/purple_watch.jpg",
      "price": "$79"
    }
    ```

---

## File Structure
```plaintext
project/
│
├── index.html       # Main HTML file
├── style.css       # Styling for the page
├── script.js           # JavaScript functionality
├── img/          # Folder for product images
├── README.md        # Project documentation
