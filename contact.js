import {
  closeCartFunc,
  closeMenu,
  decrementProduct,
  deleteProduct,
  fromLocalStorage,
  generateCart,
  incrementProduct,
  openCartFunc,
  openMenu,
  totalPrice,
} from "./exports/components.js";
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartList = document.querySelector(".cartList");
const totalItemsInCart = document.querySelector(".totalItemsInCart");
const totalItemsInWishlist = document.querySelector(".totalItemsInWishlist");
const totalCost = document.querySelector(".totalCost");

window.addEventListener("DOMContentLoaded", renderCart);

//render cart
function renderCart() {
  const cartItems = fromLocalStorage("products");
  const wishlist = fromLocalStorage("wishlist");

  cartList.innerHTML = cartItems.map(generateCart).join("");
  totalItemsInWishlist.textContent = wishlist.length;
  totalItemsInCart.textContent = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  totalCost.textContent = `$${totalPrice()}`;
}

function handleCart(e) {
  const button = e.target.closest("button");

  if (!button) return;

  const id = Number(button.dataset.id);
  if (!id) return;

  if (button.classList.contains("deleteBtn")) {
    deleteProduct("products", id);
  }

  if (button.classList.contains("incBtn")) {
    incrementProduct(id);
  }

  if (button.classList.contains("decBtn")) {
    decrementProduct(id);
  }

  renderCart();
}

cartList.addEventListener("click", handleCart);

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
openCart.addEventListener("click", openCartFunc);
closeCart.addEventListener("click", closeCartFunc);
