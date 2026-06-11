import { clearLocalStorage } from "../exports/components.js";

export function payWithPaystack(orderData) {
  const {
    userObj: { email },
    order: { total },
  } = orderData;

  const paystack = new PaystackPop();
  paystack.newTransaction({
    key: "pk_test_fdfc70e07c5c421b2123d253ed5e3a025f4b915f",
    email,
    amount: total * 100,
    currency: "NGN",

    onSuccess: async function (transaction) {
      if (transaction.status === "success") routeToHomePage();
    },

    onCancel: function () {
      console.error("Transaction canceled");
    },

    onError: function (error) {
      console.error("Payment failed:", error);
    },
  });
  paystack.open();
}

function routeToHomePage() {
  let timerId;
  clearLocalStorage("products");
  clearLocalStorage("checkOutData");
  timerId = setTimeout(() => {
    window.location.href = "/index.html";
  }, 3000);

  return () => clearInterval(timerId);
}
