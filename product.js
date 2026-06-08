import { products } from "./data/products.js";
import {
  addItemToCart,
  fromLocalStorage,
  generateHTML,
  generateProduct,
  highRated,
  incrementProduct,
  decrementProduct,
  generateCart,
  openMenu,
  closeMenu,
  openCartFunc,
  closeCartFunc,
  goBack,
  totalPrice,
  addItemToWishlist,
  formatCurrency,
} from "./exports/components.js";

const totalItemsInCart = document.querySelector(".totalItemsInCart");
const totalItemsInWishlist = document.querySelector(".totalItemsInWishlist");
const cartList = document.querySelector(".cartList");
const itemContainer = document.querySelector(".itemContainer");
const tabContainer = document.querySelector(".tabContainer");
const tabBtns = document.querySelectorAll(".tabBtn");
const textTab = document.querySelectorAll(".textTab");
const mostRated = document.querySelector(".mostRated");
const relatedProductsBox = document.querySelector(".relatedProducts");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const totalCost = document.querySelector(".totalCost");

//items in cart
const param = new URLSearchParams(window.location.search);
const id = Number(param.get("id"));
window.addEventListener("DOMContentLoaded", () => {
  renderCart();
  currProduct(id);
  mostRatedProds();
});

//render cart
function renderCart() {
  const cartItems = fromLocalStorage("products");
  const wishlist = fromLocalStorage("wishlist");
  cartList.innerHTML = cartItems.map(generateCart).join("");
  totalItemsInCart.textContent = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  totalItemsInWishlist.textContent = wishlist.length
  totalCost.textContent = formatCurrency(totalPrice());
}

//currently selected product
function currProduct(id) {
  const product = products?.find((product) => product.id === id);

  if (!product) {
    itemContainer.innerHTML = "<p>Product not found.</p>";
    return;
  }

  itemContainer.innerHTML = generateProduct(product);
  relatedProds(product);
}

//3 mostRated products
function mostRatedProds() {
  const threeMostRatedProducts = products
    .slice()
    .sort((a, b) => b.totalRated - a.totalRated)
    .slice(0, 3)
    .map(highRated)
    .join("");

  mostRated.innerHTML = threeMostRatedProducts;
}

// Related Product
function relatedProds(product) {
  const relatedProducts = products?.filter(
    (crop) => crop.type === product.type && crop.id !== product.id,
  );
  relatedProductsBox.innerHTML = relatedProducts.map(generateHTML).join("");
}

//Tab section
function activeTab(e) {
  if (e.target.tagName !== "BUTTON") return;
  const currId = Number(e.target.dataset.id);
  tabBtns.forEach((btn) =>
    btn.classList.remove("border-b", "active:border-red-500"),
  );
  textTab.forEach((text) => text.classList.add("hidden"));

  document
    .querySelector(`.tab--${currId}`)
    .classList.add("border-b", "active:border-red-500");
  document.querySelector(`.text--${currId}`).classList.remove("hidden");
}

function handleCart(e) {
  console.log(e);
  const button = e.target.closest("button");

  if (!button) return;

  const id = Number(button.dataset.id);
  if (!id) return;

  if (button.classList.contains("backBtn")) {
    goBack();
  }

  if (button.classList.contains("incBtn")) {
    incrementProduct(id);
  }

  if (button.classList.contains("decBtn")) {
    decrementProduct(id);
  }

  if (button.classList.contains("addToCart")) {
    addItemToCart(id);
  }
  if (button.classList.contains("wishBtn")) {
    addItemToWishlist(id);
  }

  renderCart();

  //show product quantity
  let product = fromLocalStorage("products").find((p) => p.id === id);
  document.querySelector(".counter").textContent = product?.quantity || 0;
}

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
cartList.addEventListener("click", handleCart);
openCart.addEventListener("click", openCartFunc);
tabContainer.addEventListener("click", activeTab);
closeCart.addEventListener("click", closeCartFunc);
itemContainer.addEventListener("click", handleCart);
relatedProductsBox.addEventListener("click", addItemToCart);
