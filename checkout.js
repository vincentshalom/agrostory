import {
  formatCurrency,
  fromLocalStorage,
  generateCheckOut,
  clearLocalStorage,
} from "./exports/components.js";
import { payWithPaystack } from "./services/payment.js";

const main = document.querySelector(".main");
const submitBtn = document.querySelector(".submitBtn");
const checkList = document.querySelector(".checkList");
const subtotalEl = document.querySelector(".subtotalEl");
const shippingCostEl = document.querySelector(".shippingCostEl");
const vatEl = document.querySelector(".vatEl");
const totalEl = document.querySelector(".totalEl");
const shipPercentageEl = document.querySelector(".shipPercentageEl");
const vatPercentageEl = document.querySelector(".vatPercentageEl");
const user = main.querySelector(".userDetails");
const payment = main.querySelector(".paymentMethod");

window.addEventListener("DOMContentLoaded", render);

function render() {
  const {
    items,
    subtotal,
    vat,
    total,
    shippingcostPercentage,
    shippingcost,
    vatPercentage,
  } = fromLocalStorage("checkOutData");

  checkList.innerHTML = items.map(generateCheckOut).join("");
  subtotalEl.textContent = formatCurrency(subtotal);
  shippingCostEl.textContent = formatCurrency(shippingcost);

  vatEl.textContent = formatCurrency(vat);
  shipPercentageEl.textContent = `(${shippingcostPercentage}%)`;
  vatPercentageEl.textContent = `(${vatPercentage}%)`;
  totalEl.textContent = formatCurrency(total);
}

payment.addEventListener("submit", (e) => {
  e.preventDefault();

  const userForm = new FormData(user);
  const paymentForm = new FormData(payment);
  const userObj = Object.fromEntries(userForm.entries());
  const paymentObj = Object.fromEntries(paymentForm.entries());

  const error = {};

  for (const [key, value] of userForm.entries()) {
    if (value.trim() === "") error[key] = `${key} is required`;
  }
  if (!userForm.has("terms")) error.terms = "You must accept terms";

  if (Object.keys(error).length > 0) {
    console.error(`Validation error:`, error);
    return;
  }

  const { items, total } = fromLocalStorage("checkOutData");

  const orderData = {
    id: crypto.randomUUID(),
    userObj,
    paymentObj,
    order: { items, total },
  };
  console.log(`Order, submitted:`, orderData);
  payWithPaystack(orderData);
});
