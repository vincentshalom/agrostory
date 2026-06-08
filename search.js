import { products } from "./data/products.js";
import {
  closeCartFunc,
  closeMenu,
  fromLocalStorage,
  generateCart,
  generateHTML,
  openCartFunc,
  openMenu,
  totalPrice,
  addItemToCart,
  deleteProduct,
  incrementProduct,
  decrementProduct,
  formatCurrency,
} from "./exports/components.js";
const searchList = document.querySelector(".searchList");
const itemNotFound = document.querySelector(".itemNotFound");

const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartList = document.querySelector(".cartList");
const totalItemsInCart = document.querySelector(".totalItemsInCart");
const totalItemsInWishlist = document.querySelector(".totalItemsInWishlist");
const totalCost = document.querySelector(".totalCost");

window.addEventListener("DOMContentLoaded", renderCart);

const query = new URLSearchParams(window.location.search);
const searchTerm = query.get("q").toLowerCase();

const productSort = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm),
);

if (!productSort.length) {
  itemNotFound.classList.toggle("hidden");
}

//render cart
function renderCart() {
  const cartItems = fromLocalStorage("products");
  const wishlist = fromLocalStorage("wishlist");
  cartList.innerHTML = cartItems.map(generateCart).join("");
  totalItemsInCart.textContent = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  totalItemsInWishlist.textContent = wishlist.length;
  totalCost.textContent = formatCurrency(totalPrice());
}

function handleCart(e) {
  const button = e.target.closest("button");

  if (!button) return;

  const id = Number(button.dataset.id);
  if (!id) return;

  if (button.classList.contains("deleteBtn")) {
    deleteProduct(id);
  }

  if (button.classList.contains("incBtn")) {
    incrementProduct(id);
  }

  if (button.classList.contains("decBtn")) {
    decrementProduct(id);
  }

  renderCart();
}

searchList.innerHTML = productSort.map(generateHTML).join("");

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
cartList.addEventListener("click", handleCart);
openCart.addEventListener("click", openCartFunc);
closeCart.addEventListener("click", closeCartFunc);
searchList.addEventListener("click", (e) => {
  addItemToCart(e);
  renderCart();
});
