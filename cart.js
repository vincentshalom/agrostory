import {
  fromLocalStorage,
  goBack,
  generateCheckoutCartList,
  openCartFunc,
  closeCartFunc,
  openMenu,
  closeMenu,
  deleteProduct,
  incrementProduct,
  decrementProduct,
  generateCart,
  addItemToCart,
  formatCurrency,
  totalPrice,
  SHIPPING_FEE,
  VAT,
} from "./exports/components.js";

const main = document.querySelector(".main");
const backBtn = document.querySelector(".backBtn");
const cartList = document.querySelector(".cartList");
const cartItemsList = document.querySelector(".cartItemsList");
const totalCost = document.querySelector(".totalCost");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const cart = document.getElementById("cart");
const cartPanel = document.getElementById("cartPanel");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("cartOverlay");
const totalItemsInCart = document.querySelector(".totalItemsInCart");
const totalItemsInWishlist = document.querySelector(".totalItemsInWishlist");
const totalEl = document.querySelector(".total");
const shippingFee = document.querySelector(".shippingFee");
const prodAndShippingFee = document.querySelector(".prodAndShippingFee");
const goToCheckoutPageBtn = document.querySelector(".goToCheckoutPageBtn");

window.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function renderCart() {
  const cartItems = fromLocalStorage("products");
  const wishlist = fromLocalStorage("wishlist");
  cartList.innerHTML = cartItems.map(generateCart).join("");
  totalItemsInCart.textContent = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  totalItemsInWishlist.textContent = wishlist.length;
  cartItemsList.innerHTML = cartItems.map(generateCheckoutCartList).join("");
  totalEl.textContent = formatCurrency(totalPrice());
  shippingFee.textContent = `${SHIPPING_FEE}%`;
  prodAndShippingFee.textContent = formatCurrency(
    totalPrice() + (totalPrice() * SHIPPING_FEE) / 100,
  );
}

//ITEMS IN CART
function cartFunc(e) {
  addItemToCart(e);
  renderCart();
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
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMenu();
});

main.addEventListener("click", cartFunc);
openCart.addEventListener("click", openCartFunc);
closeCart.addEventListener("click", closeCartFunc);
overlay.addEventListener("click", closeCartFunc);
cartItemsList.addEventListener("click", handleCart);
backBtn.addEventListener("click", goBack);

goToCheckoutPageBtn.addEventListener("click", () => {
  const subtotal = fromLocalStorage("products").reduce(
    (acc, curr) => acc + curr.total,
    0,
  );
  const total = (
    subtotal +
    (subtotal * SHIPPING_FEE) / 100 +
    (subtotal * VAT) / 100
  ).toFixed(2);

  const vat = ((subtotal * VAT) / 100).toFixed(2);
  const shippingcost = ((subtotal * SHIPPING_FEE) / 100).toFixed(2);

  const checkOutData = {
    items: fromLocalStorage("products"),
    subtotal,
    shippingcost,
    shippingcostPercentage: SHIPPING_FEE,
    vat,
    vatPercentage: VAT,
    total,
  };

  localStorage.setItem("checkOutData", JSON.stringify(checkOutData));
  window.location.href = "checkout.html";
});
