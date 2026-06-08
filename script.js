import { products } from "./data/products.js";
import { users } from "./data/users.js";
import { blogposts } from "./data/posts.js";
import {
  generateHTML,
  generateTestimony,
  generatePost,
  loadCartProducts,
  openMenu,
  closeMenu,
  openCartFunc,
  closeCartFunc,
  toLocalStorage,
  fromLocalStorage,
  addItemToCart,
  generateCart,
  incrementProduct,
  decrementProduct,
  deleteProduct,
  totalPrice,
  formatCurrency,
  addItemToWishlist,
} from "./exports/components.js";

const mobileMenu = document.getElementById("mobileMenu");
const menuPanel = document.getElementById("menuPanel");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");

const cart = document.getElementById("cart");
const cartPanel = document.getElementById("cartPanel");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("cartOverlay");
const cartList = document.querySelector(".cartList");
const totalCost = document.querySelector(".totalCost");

const main = document.querySelector(".main");

let productsList = document.querySelector(".productsList");
let totalItemsInCart = document.querySelector(".totalItemsInCart");
let totalItemsInWishlist = document.querySelector(".totalItemsInWishlist");
const featuredProducts = document.querySelector(".featuredProducts");
const testimonials = document.querySelector(".testimonials");
const posts = document.querySelector(".posts");

//Cart list
window.addEventListener("DOMContentLoaded", renderCart);

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

//ITEMS IN CART
function cartFunc(e) {
  const button = e.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (!id) return;

  if (button.classList.contains("wishBtn")) {
    addItemToWishlist(id);
  }

  if (button.classList.contains("addToCart")) {
    addItemToCart(id);
  }

  renderCart();
}

//handle Cart
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

//Menu
openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenu();
});

main.addEventListener("click", cartFunc);
openCart.addEventListener("click", openCartFunc);
closeCart.addEventListener("click", closeCartFunc);
overlay.addEventListener("click", closeCartFunc);

//listens to increment, decrement and delete actions within the Cart
cartList.addEventListener("click", handleCart);
//OUR PRODUCTS
productsList.innerHTML = products.slice(0, 8).map(generateHTML).join("");
//Featured Products
featuredProducts.innerHTML = products.slice(6, 10).map(generateHTML).join("");
//Testimonials
testimonials.innerHTML = users.map(generateTestimony).join("");
//Blog posts
posts.innerHTML = blogposts.map(generatePost).join("");
