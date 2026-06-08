import { products } from "./data/products.js";
import {
  generateHTML,
  fromLocalStorage,
  addItemToCart,
  openMenu,
  closeMenu,
  openCartFunc,
  closeCartFunc,
  generateCart,
  incrementProduct,
  decrementProduct,
  deleteProduct,
  totalPrice,
  addItemToWishlist,
  formatCurrency,
} from "./exports/components.js";

const ProductsContainer = document.querySelector(".allProductsContainer");
const allProductList = document.querySelector(".allProductsList");
let totalItemsInCart = document.querySelector(".totalItemsInCart");
let totalItemsInWishlist = document.querySelector(".totalItemsInWishlist");
const main = document.querySelector(".main");
const productFilter = document.querySelector(".productFilter");

const cartList = document.querySelector(".cartList");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
const startPageEl = document.querySelector(".startPage");
const endPageEl = document.querySelector(".endPage");
const showTotalProducts = document.querySelector(".showTotalProducts");
const totalCost = document.querySelector(".totalCost");

//PAGINATION
let itemPerPage = 8;
let currPage = 1;
const totalPages = Math.ceil(products.length / itemPerPage);

window.addEventListener("DOMContentLoaded", () => {
  renderCart();
  pagination(currPage);
});

//pagination
function pagination(page) {
  const startPage = (page - 1) * itemPerPage;
  const endPage = startPage + itemPerPage;
  allProductList.innerHTML = products
    .slice(startPage, endPage)
    .map(generateHTML)
    .join("");

  startPageEl.textContent = currPage;
  endPageEl.textContent = totalPages;
  showTotalProducts.textContent = `Showing ${startPage + 1} – ${endPage} of ${products.length} results`;
}

//pagination next page
export function nextPage() {
  if (currPage < totalPages) {
    currPage++;
    pagination(currPage);
  }
}

export function previousPage() {
  if (currPage > 1) {
    currPage--;
    pagination(currPage);
  }
}

//render cart
function renderCart() {
  const cartItems = fromLocalStorage("products");
  const wishlist = fromLocalStorage("wishlist");
  if (!cartItems.length) {
    cartList.innerHTML = `<p class="text-center text-sm text-shadow-md">Cart is empty, click on add button to add new items to cart</p>`;
    /*  <ul class="cartList flex flex-col gap-3 "></ul> */
    cartList.classList.remove("flex-col");
    cartList.classList.add(
      "flex-row",
      "justify-center",
      "items-center",
      "pt-30",
    );
    return;
  }
  cartList.innerHTML = cartItems.map(generateCart).join("");
  totalItemsInCart.textContent = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  totalItemsInWishlist.textContent = wishlist.length;
  totalCost.textContent = formatCurrency(totalPrice());
}

//display all products
function renderSortedProducts(productsToRender) {
  allProductList.innerHTML = productsToRender.map(generateHTML).join("");
}

renderSortedProducts(products);

//Add items to cart
main.addEventListener("click", (e) => {
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
});

//Sort products
function sortProducts(e) {
  const value = e.target.value.toLowerCase().trim();
  let sorted =
    value === ""
      ? products
      : products.filter(
          (product) => product.type.toLowerCase().trim() === value,
        );
  renderSortedProducts(sorted);
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

nextBtn.addEventListener("click", nextPage);
openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
cartList.addEventListener("click", handleCart);
prevBtn.addEventListener("click", previousPage);
openCart.addEventListener("click", openCartFunc);
closeCart.addEventListener("click", closeCartFunc);
productFilter.addEventListener("change", sortProducts);
