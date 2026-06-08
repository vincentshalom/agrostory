import {
  generateTestimony,
  fromLocalStorage,
  openMenu,
  closeMenu,
  openCartFunc,
  closeCartFunc,
  generateCart,
  decrementProduct,
  incrementProduct,
  deleteProduct,
  totalPrice,
} from "./exports/components.js";
import { users } from "./data/users.js";

const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
let totalItemsInCart = document.querySelector(".totalItemsInCart");
let totalItemsInWishlist = document.querySelector(".totalItemsInWishlist");
const testimonials = document.querySelector(".testimonials");
const cartList = document.querySelector(".cartList");
const totalCost = document.querySelector(".totalCost");

//Cart list
window.addEventListener("DOMContentLoaded", renderCart);

//render cart
function renderCart() {
  const cartItems = fromLocalStorage("products");
  cartList.innerHTML = cartItems.map(generateCart).join("");
  totalItemsInWishlist.textContent = cartItems.length;
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

testimonials.innerHTML = users.map(generateTestimony).join("");
