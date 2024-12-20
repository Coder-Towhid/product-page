// Get elements
const openCartButton = document.getElementById("floating_cart_btn");
const cartModal = document.getElementById("cartModal");

// Open the modal and hide the button
openCartButton.addEventListener("click", () => {
  cartModal.style.display = "flex"; // Show the modal
  openCartButton.style.display = "none"; // Hide the button

  const template = document.querySelector("#modal_cart_item");
  const productTableElement = document.querySelector(".product_table");
  const state = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  const cartTotalEl = document.querySelector("#cart_total");

  Object.keys(state).forEach(id =>{
    const product = state[id];

    if(product){
        const clonedTemplate = template.content.cloneNode(true);
        const imgEl = clonedTemplate.querySelector("img");
        const modalTitleEl = clonedTemplate.querySelector("#template_modal_title");
        const modalColorEl = clonedTemplate.querySelector("#template_modal_color");
        const modalSizeEl = clonedTemplate.querySelector("#template_modal_size");
        const modalQntEl = clonedTemplate.querySelector("#template_modal_qnt");
        const modalPriceEl = clonedTemplate.querySelector("#template_modal_price");

        modalTitleEl.textContent = product.title;
        modalColorEl.textContent = product.color;
        modalSizeEl.textContent = product.size;
        modalQntEl.textContent = product.quantity;
        modalPriceEl.textContent = `\$${calculateLineTotal(product).toFixed(2)}`
        imgEl.setAttribute("src", product.imgUrl);


        // productTableElement.appendChild(clonedTemplate);
        productTableElement.insertBefore(clonedTemplate, cartTotalEl);

    }
    
  })
  

  const total =  calculateCartTotal();
  console.log(total)

  const cartTotalSpanEl = cartTotalEl.querySelector("span");
  cartTotalSpanEl.textContent = `\$${total.toFixed(2)}`

});

// Close modal when clicking outside the content
window.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none"; // Hide the modal
    openCartButton.style.display = "flex"; // Show the button
  }
});
