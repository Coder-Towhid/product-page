const STORE_KEY = "softnio_towhid_state";

document.addEventListener("DOMContentLoaded", (event) => {
  handleColorSelection();
  handleSizeSelection();
  handleAddToCart();
  updateCartCount();
});

function handleColorSelection() {
  const colorBtnElements = document.querySelectorAll(".color");

  colorBtnElements.forEach((colorBtnElement) => {
    colorBtnElement.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const item = e.currentTarget;
      const color = item.dataset.color;
      const activeColorElement = document.querySelector(".color_active");

      if (activeColorElement) {
        activeColorElement.classList.remove("color_active");
        item.classList.add("color_active");
      }

      if (color) {
        const productImgElement = document.querySelector("#product-image");
        const circleElement = item.querySelector("circle");
        const colorCode = circleElement.getAttribute("fill");
        const root = document.querySelector(":root");

        productImgElement.setAttribute("src", `/img/${color}_watch.jpg`);
        root.style.setProperty("--color-btn-border", colorCode);
        updateProductCounterFromState();
      }
    });
  });
}

function handleSizeSelection() {
  const sizeBtnsElement = document.querySelector(".size_buttons");
  const sizeBtnElements = sizeBtnsElement.querySelectorAll(".size_button");

  sizeBtnElements.forEach((sizeBtnElement) => {
    sizeBtnElement.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const item = e.currentTarget;
      const size = item.dataset.size;
      const price = item.dataset.price;
      const currentSizeElement = document.querySelector(".size_button_active");

      if (currentSizeElement) {
        currentSizeElement.classList.remove("size_button_active");
        item.classList.add("size_button_active");
      }

      if (size) {
        sizeBtnsElement.setAttribute("data-selected-size", item.dataset.size);
        console.log(item.dataset.size);
      }

      if (price) {
        sizeBtnsElement.setAttribute("data-selected-price", item.dataset.price);
        console.log(item.dataset.size);
      }
      updateProductCounterFromState();
    });
  });
}

function handleAddToCart() {
  const addToCart = document.querySelector(".buy_btn");
  if (!addToCart) {
    return;
  }
  addToCart.addEventListener("click", () => {
    const data = prepareProductData();
    const parsedState = getState();
    const id = defineStateId(data);

    parsedState[id] = data;
    localStorage.setItem(STORE_KEY, JSON.stringify(parsedState));

    updateCartCount(parsedState);
  });
}

function updateCartCount(state = {}) {
  const parsedState =
    Object.keys(state).length > 0
      ? { ...state }
      : getState();
  const floatingCartCounter = document.querySelector(
    "#floating_cart_btn .checkout_value"
  );
  const totalProductCount = Object.keys(parsedState).reduce(
    (acc, cur) => +parsedState[cur].quantity + acc,
    0
  );

  floatingCartCounter.textContent = totalProductCount;
}
function prepareProductData() {
  const productId = document
    .querySelector(".product_container")
    .getAttribute("data-product-id");
  const title = document.querySelector(".product_title h1").textContent;
  const color = document
    .querySelector(".color_active")
    .getAttribute("data-color");
  const sizeBtnsElement = document.querySelector(".size_buttons");
  const price = sizeBtnsElement.getAttribute("data-selected-price");
  const size = sizeBtnsElement.getAttribute("data-selected-size");
  const quantity = document.querySelector("#quantity").value;
  const imgUrl = `/img/${color}_watch.jpg`;

  return { productId, title, color, price, size, quantity, imgUrl };
}

function updateProductCounterFromState(){
    const quantity = document.querySelector("#quantity");
    const data = prepareProductData();
    const id = defineStateId(data);
    const state = getState();

    quantity.value = state[id] ? state[id].quantity : 0;
    
}

function calculateLineTotal(product){
    if(!product){
        return 0;
    }
    return parseFloat(product.price) * parseInt(product.quantity); 
}

function calculateCartTotal(){
    const state = getState();
    let total = 0;

    Object.keys(state).forEach(id => {
        const product = state[id];
        total += calculateLineTotal(product);
    })

    return total;
}

function defineStateId(product) {
  return `${product.productId}-${product.size}-${product.color}`;
}

function getState(){
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
}


