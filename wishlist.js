import {
  addItemToCart,
  addItemToWishlist,
  closeCartFunc,
  closeMenu,
  deleteProduct,
  formatCurrency,
  fromLocalStorage,
  generateCart,
  generateWishlist,
  openCartFunc,
  openMenu,
  totalPrice,
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
let totalItemsInCart = document.querySelector(".totalItemsInCart");
let totalItemsInWishlist = document.querySelector(".totalItemsInWishlist");
const totalCost = document.querySelector(".totalCost");
const main = document.querySelector(".main");
const wishlistcart = document.querySelector(".wishlistcart");

window.addEventListener("DOMContentLoaded", render);

function render() {
  const cartItems = fromLocalStorage("products");
  const wishlist = fromLocalStorage("wishlist");
  cartList.innerHTML = cartItems.map(generateCart).join("");

  if (!wishlist.length) {
    wishlistcart.innerHTML = `<li class="text-red-400 py-[1000px]">There are no items on your wishlist, click on the ♥ to add items to your wishlist</li>`;
  }
  wishlistcart.innerHTML = wishlist.map(generateWishlist).join("");
  totalItemsInCart.textContent = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  totalItemsInWishlist.textContent = wishlist.length;
  totalCost.textContent = formatCurrency(totalPrice());
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

function wishActions(e) {
  const button = e.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);

  if (!id) return;

  if (button.classList.contains("deleteBtn")) {
    deleteProduct("wishlist", id);
  }

  if (button.classList.contains("addToCart")) {
    if (button.disabled) return;
    addItemToCart(id);
  }

  render();
}

main.addEventListener("click", wishActions);
//listens to increment, decrement and delete actions within the Cart
cartList.addEventListener("click", handleCart);

//Menu
openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenu();
});

// main.addEventListener("click", cartFunc);
openCart.addEventListener("click", openCartFunc);
closeCart.addEventListener("click", closeCartFunc);
overlay.addEventListener("click", closeCartFunc);
