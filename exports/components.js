import { products } from "../data/products.js";

export const SHIPPING_FEE = 5;
export const VAT = 1.5;

export function generateHTML(product) {
  const badge =
    typeof product.badge === "string" ? product.badge : product.badge + "%";
  return `
   <li class="min-w-[220px] flex-shrink-0">
    <article class="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
    <div class="relative bg-[#f9f9f9]">
    <button data-id="${product.id}" class="wishBtn absolute top-4 left-4 z-50">
     <ion-icon name="heart-outline" class="text-xl cursor-pointer hover:text-red-500"></ion-icon>
    </button>
    
    <a href="product.html?id=${product.id}" class="block">
        <div class="h-50 w-full overflow-hidden">
          <img 
            src="images/${product.img}" 
            alt="${product.name}"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          >
          <span class="${badge === "" ? "hidden" : "absolute top-6 right-6 w-fit font-semibold text-white uppercase bg-[#80b500] py-1 px-2 rounded-tl-[15px] rounded-br-[15px] text-xs"}">${badge}</span>
        </div>
      </a>
      </div>
      <header class="py-1 px-2 flex justify-between items-center">
        <h3 class="font-semibold text-md line-clamp-2">
          ${product.name}
        </h3>
      </header>

      <div class="px-2 pb-2 flex flex-col gap-1 grow">
        <p class="text-sm text-gray-600 line-clamp-2">
         ${product.description}
        </p>
        <div class="text-sm text-yellow-500">
          ${Array.from({ length: product.maxRating })
            .map((_, i) => (i < product.ratings ? "★" : "☆"))
            .join(
              "",
            )} <span class="text-gray-500">(${product.totalRated})</span>
        </div>
        <div class="flex items-center justify-between mt-auto">
          <p class="text-[#80b500] font-semibold text-md w-full">
            <ins class="no-underline">${formatCurrency(product.price)}</ins>
            <del class="ml-2 text-sm text-gray-400">${formatCurrency(product.initialPrice)}</del>
          </p>
        </div>
        <!-- CTA -->
        <button data-id="${product.id}" class="addToCart mt-1 bg-[#80b500] text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer">
          Add to Cart
        </button>

      </div>
    </article>
  </li>`;
}

export function generateProduct(product) {
  return ` <article class="flex flex-col lg:flex-row gap-3 w-full">
  <aside class="w-[400px] w-full relative">
  <button class="backBtn absolute top-4 left-4 rounded-full w-12 h-12 shadow-md cursor-pointer flex items-center justify-center border border-[#c4c4c4]" data-id="${product.id}">
  <ion-icon name="arrow-back-outline"></ion-icon>
  </button>
    <img src="images/${product.img}" loading="lazy" alt="${product.name}" class="w-full h-full block" />
    </aside>
    <!-- PRODUCT DETAIL PAGE -->
    <aside class="flex flex-col w-full">
    <div class="flex flex-col gap-2 mb-5 py-2">
        <div class="text-sm text-yellow-500">
          ★★★★☆ <span class="text-[#80b500]">(120 reviews)</span>
        </div>
          <h3 class="font-semibold text-md md:text-lg lg:text-2xl line-clamp-2">
            ${product.name}
          </h3>
          <p class="text-[#80b500] font-semibold ">
            <ins class="no-underline text-lg md:text-xl lg:text-3xl">${formatCurrency(product.price)}</ins>
            <del class="ml-2 text-md md:text-lg lg:text-xl">${formatCurrency(product.initialPrice)}</del>
          </p>
          <!-- Categories -->
            <div class="flex items-center gap-1 my-2">
            <p class="font-semibold">Categories: 
            </p>
            <a href="" class="text-sm hover:text-[#80b500]">Fruits</a>,
            <a href="" class="text-sm hover:text-[#80b500]">Vegetables</a>,
            <a href="" class="text-sm hover:text-[#80b500]">Fruit juice</a>
            </div>
          <div class="flex items-center gap-8 p-1 w-fit">
            <div class="flex items-center gap-2 p-1 w-fit">
                  <button class="decBtn border  border-[#c4c4c4] p-1 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center shadow-md" data-id="${product.id}">
                      <ion-icon name="remove-outline"></ion-icon>
                  </button>
                  <p class="counter p-2">${product.quantity || 0}</p>
                  <button class="incBtn border  border-[#c4c4c4] p-1 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center shadow-md" data-id="${product.id}">
                      <ion-icon name="add-outline"></ion-icon>
                  </button>
            </div>
            <button data-id="${product.id}" class="addToCart bg-[#1a1a1a] text-white py-3 px-4 cursor-pointer ">
              Add to Cart
            </button>
          </div>
            <!-- Add to wishlist -->
          <div class="">
              <button data-id="${product.id}" class="wishBtn py-1 text-center bg-[#80b500] text-white text-sm py-2 px-2 cursor-pointer">
                Add to Wishlist
              </button>
          </div>
          
    </div>
  
    <!-- Share on social media -->
    <div class="flex items-center gap-3 mb-3">
      <h3 class="font-bold">Share:</h3>
      <ul class="flex items-center gap-2">
      <li
        class="w-7 h-7 flex items-center justify-center hover:-translate-y-1 transition-transform duration-200"
      >
        <a
          href="https://facebook.com"
          class="flex items-center justify-center text-gray-600 hover:text-blue-600"
        >
          <ion-icon name="logo-facebook" class="text-2xl"></ion-icon>
        </a>
      </li>
      <li
        class="w-7 h-7 flex items-center justify-center hover:-translate-y-1 transition-transform duration-200"
      >
        <a
          href="https://x.com"
          class="flex items-center justify-center text-gray-600 hover:text-blue-600"
        >
          <ion-icon name="logo-twitter" class="text-2xl"></ion-icon>
        </a>
      </li>
      <li
        class="w-7 h-7 flex items-center justify-center hover:-translate-y-1 transition-transform duration-200"
      >
        <a
          href="https://instagram.com"
          class="flex items-center justify-center text-gray-600 hover:text-red-500"
        >
          <ion-icon name="logo-instagram" class="text-2xl"></ion-icon>
        </a>
      </li>
      <li
        class="w-7 h-7 flex items-center justify-center hover:-translate-y-1 transition-transform duration-200"
      >
        <a
          href="https://tiktok.com"
          class="flex items-center justify-center text-gray-600 hover:text-red-600"
        >
          <ion-icon name="logo-tiktok" class="text-2xl"></ion-icon>
        </a>
      </li>
    </ul>
    </div>
    <!-- Check out -->
    <div class="">
      <h3 class="font-semibold mb-2">Guaranteed Safe Checkout:</h3>
      <img src="images/payment-icon.png" alt="">
    </div>
  </aside>
</article>`;
}

export function generateCart(product) {
  return `
  <li class="flex gap-4 border-b border-[#ccc] py-4" >
    <div class="relative w-24 h-24 bg-yellow-500">
      <button data-id="${product.id}" class="deleteBtn text-lg cursor-pointer flex items-center justify-center text-center shadow-md hover:bg-red-500 hover:text-white h-7 w-7 rounded-full bg-white absolute top-0 left-1 border border-[#c4c4c4]" data-id="${product.id}">
    <ion-icon name="close-outline"></ion-icon>
  </button>
      <img src="images/${product.img}" alt="${product.name}" class="productPhoto block object-cover w-full h-full">
    </div>
    <div class="flex flex-col gap-2 justify-between">
      <div class="flex flex-col gap-1">
        <h3 class="productName text-sm font-bold">${product.name}</h3>
        <p class="flex gap-1 items-center text-sm">
          <span class="productQuantity">${product.quantity}</span>
          <span class="productQuantity">x</span>
          <span class="productPrice">${formatCurrency(product.price)}</span>
        </p>
      </div>
    </div>
  </li>`;
}

//generate wishlist
export function generateWishlist(product) {
  return ` 
    <li class="border-t border-slate-100 py-6 flex flex-col lg:flex-row" data-id="">
      <article class="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-3 w-full">
      <button data-id="${product.id}" class="deleteBtn flex items-center justify-center bg-transparent font-bold text-3xl cursor-pointer">
      <ion-icon name="close-outline"></ion-icon>
     </button>
      <div class="h-24 w-24">
        <img src="images/${product.img}" loading="lazy" alt="${product.name}" class="w-full h-full block object-cover" />
      </div>
      <a href="product.html?id=${product.id}" class="hover:text-[#80b500] text-[#1a1a1a] font-bold inline-block text-lg">${product.name}</a>
      <p class="">${formatCurrency(product.price)}</p>
      <p class="rounded-md text-white text-xs px-4 py-0.5 ${product.instock ? "bg-green-600" : "bg-red-600 "}">${product.instock ? "In Stock" : "Sold"}</p>
      <button data-id="${product.id}" class="addToCart py-2 px-4 ${product.instock ? "bg-[#1a1a1a] text-white cursor-pointer" : "bg-gray-300 text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"}" ${!product.instock ? "disabled" : ""}>
          Add to Cart
      </button>
      </article>
    </li>`;
}

//generate cart list on cart page
export function generateCheckoutCartList(product) {
  return ` 
  <li class="border-t border-slate-100 py-3 flex flex-col lg:flex-row" data-id="">
    <article class="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-3 w-full">
      <button data-id="${product.id}" class="deleteBtn flex items-center justify-center bg-transparent font-bold text-2xl hover:bg-red-500 hover:text-white rounded-full cursor-pointer">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    <div class="h-20 w-20">
      <img src="images/${product.img}" loading="lazy" alt="${product.name}" class="w-full h-full block object-cover" />
    </div>
    <a href="/product.html?id=${product.id}" class="hover:text-[#80b500] text-[#1a1a1a] font-bold inline-block text-sm">${product.name}</a>
    <p class="">${formatCurrency(product.price)}</p>
    <div class="border border-slate-200 flex items-center gap-2 p-1 w-fit">
      <button data-id="${product.id}" class="decBtn border border-gray-200 p-1 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#80b500] hover:text-white">
          <ion-icon name="remove-outline"></ion-icon>
      </button>
      <p class="p-2">${product.quantity}</p>
      <button data-id="${product.id}" class="incBtn border border-gray-200 p-1 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#80b500] hover:text-white">
          <ion-icon name="add-outline"></ion-icon>
      </button>
    </div>
    <h3 class="font-bold text-sm">${formatCurrency(product.total)}</h3>
    </article>
  </li>`;
}

export function generateCheckOut(product) {
  return `
    <div class="flex justify-between items-start border-b pb-4 gap-12">
      <div>
        <h4 class="font-medium text-gray-800">
          ${product.name}
        </h4>
        <p class="text-sm text-gray-500">
          Qty: ${product.quantity} ${product.quantity > 1 ? "Units" : "Unit"}
        </p>
      </div>

      <span class="font-semibold text-gray-700">
        ${formatCurrency(product.total)}
      </span>
  </div>`;
}

//generate high rated products
export function highRated(product) {
  return ` <li class="flex gap-2 border-b border-[#ccc] last:border-b-0 py-4">
    <div class="w-20">
      <img src="images/${product.img}" alt="${product.name}" lazy="loading" class="productPhoto block object-cover w-full h-full">
    </div>
             
    <div class="flex flex-col gap-1">
      <div class="text-yellow-500">★★★★☆</div>
      <h3 class="productName font-bold text-[#444] text-sm">${product.name}</h3>
      <p class="text-[#80b500] font-semibold text-sm">
        <ins class="no-underline">$${product.price}</ins>
        <del class="ml-2 text-sm text-gray-400">${formatCurrency(product.initialPrice)}</del>
      </p>
    </div>
  </li>`;
}

//generate users testimonies
export function generateTestimony(testimony) {
  return ` <li class=" shrink-0 w-[400px] snap-start" id="${testimony.id}">
    <article class="flex gap-4 items-start bg-white p-4 rounded-lg">
      <div class="w-16 h-16 rounded-full overflow-hidden shrink-0">
        <img src="images/${testimony.img}" loading="lazy" alt="${testimony.name} photo" class="w-full h-full object-cover">
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-gray-600 text-sm">
          ${testimony.text}
        </p>
        <h3 class="font-semibold text-sm">${testimony.name}</h3>
        <p class="text-[#80b500] font-semibold text-sm">${testimony.status}</p>
      </div>
    </article>
  </li>`;
}

//generate posts
//src="/images/${post.img}"
export function generatePost(post) {
  return `<li class="w-full" id="${post.id}">
    <article class="bg-white shadow-md overflow-hidden">
      <div class="overflow-hidden">
        <img  
          src="images/${post.img}" 
          loading="lazy"
          alt="Blog post image"
          class="w-full h-60 object-cover transition duration-300 hover:scale-110"
        >
      </div>
      <div class="p-4 flex flex-col gap-2">
        <p class="flex items-center justify-between gap-4 text-sm text-gray-600">
          <span class="flex items-center gap-1">
            <ion-icon name="person-circle-outline" class="text-[#80b500]"></ion-icon>
           ${post.createdBy}
          </span>
          <span class="flex items-center gap-1">
            <ion-icon name="pricetag-outline" class="text-[#80b500]"></ion-icon>
            Services
          </span>
        </p>
        <h2 class=" md:text-md lg:text-lg font-semibold">
          ${post.title}
        </h2>
        <div class="flex items-center justify-between text-sm mt-3">
          <span class="flex items-center gap-1 text-gray-500 text-xs">
            <ion-icon name="calendar-outline" class="text-[#80b500]"></ion-icon>
           ${post.createdAt}
          </span>
          <a href="#" class="uppercase text-[#80b500] font-semibold hover:underline block text-xs">
            Read more
          </a>
        </div>
      </div>
    </article>
  </li>`;
}

export function loadCartProducts(item) {
  return `<li class="border-t border-slate-100 py-6 flex flex-col lg:flex-row">
  <article class="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-3 w-full">
    <button class="flex items-center justify-center bg-transparent font-bold text-3xl cursor-pointer">
    <ion-icon name="close-outline"></ion-icon>
    </button>
  <div class="h-24 w-24">
    <img src="images/${item.img}" loading="lazy" alt="a fresh apple" class="w-full h-full block object-cover" />
  </div>

  <a href="product.html" class="hover:text-[#80b500] text-[#1a1a1a] font-bold inline-block text-lg">Apple</a>
  <p class="">$${item.price.toFixed(2)}</p>
  <div class="border border-slate-200 flex items-center gap-2 p-1 w-fit">
    <button class="border  border-gray-200 p-1 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center">
      <ion-icon name="remove-outline"></ion-icon>
    </button>
    <p class="p-2">10</p>
    <button class="border  border-gray-200 p-1 cursor-pointer h-10 w-10 rounded-full flex items-center justify-center">
      <ion-icon name="add-outline"></ion-icon>
    </button>
  </div>

  <h3 class="font-bold text-lg">$${item.initialPrice}</h3>
  </article>
</li>`;
}

//open mobile menu
export function openMenu() {
  mobileMenu.classList.remove("opacity-0", "pointer-events-none");
  menuPanel.classList.remove("-translate-x-full");
}

//open menu
export function closeMenu() {
  mobileMenu.classList.add("opacity-0");
  menuPanel.classList.add("-translate-x-full");

  setTimeout(() => {
    mobileMenu.classList.add("pointer-events-none");
  }, 300);
}

//open mobile cart
export function openCartFunc() {
  cart.classList.remove("hidden");
  setTimeout(() => {
    cartPanel.classList.remove("translate-x-full");
  }, 10);
}

//close mobile cart
export function closeCartFunc() {
  cartPanel.classList.add("translate-x-full");
  setTimeout(() => {
    cart.classList.add("hidden");
  }, 300);
}

//save products to local storage
export function toLocalStorage(key = "products", value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//fetch products from local storage
export function fromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function clearLocalStorage(key) {
  return localStorage.clear(key);
}

// add items to cart
/* export function addItemToCart(prodId) {
  const product = products.find((p) => p.id === prodId);

  if (!product) return;

  const cartItems = fromLocalStorage("products");

  const itemsExists = cartItems?.some((item) => item.id === product.id);
  if (itemsExists) return;

  const { id, name, img, price } = product;
  const quantity = 1;
  cartItems.push({
    id,
    name,
    img,
    price,
    quantity,
    total: quantity * price,
  });

  toLocalStorage("products", cartItems);
} */
export function addItemToCart(prodId) {
  const product = products.find((p) => p.id === prodId);

  if (!product) return;

  const cartItems = fromLocalStorage("products");

  const itemExists = cartItems.some((item) => item.id === product.id);

  if (itemExists) return;

  const { id, name, img, price } = product;
  const quantity = 1;
  cartItems.push({
    id,
    name,
    img,
    price,
    quantity,
    total: quantity * price,
  });

  toLocalStorage("products", cartItems);
}

//add items to wishlist
export function addItemToWishlist(id) {
  const product = products.find((p) => p.id === id);
  console.log(product);

  if (!product) return;

  const storedWishes = fromLocalStorage("wishlist");

  const productExist = storedWishes?.some((p) => p.id === product.id);

  if (productExist) return;
  storedWishes.push(product);
  toLocalStorage("wishlist", storedWishes);
}

//delete products
export function deleteProduct(key, id) {
  const arr = fromLocalStorage(key).filter((product) => product.id !== id);
  toLocalStorage(key, arr);
}

//increment items
export function incrementProduct(id) {
  const newCart = fromLocalStorage("products").map((product) => {
    const newQuantity = product.quantity + 1;
    return product.id === id
      ? {
          ...product,
          quantity: newQuantity,
          total: product.price * newQuantity,
        }
      : product;
  });
  toLocalStorage("products", newCart);
}
/* export function incrementProduct(id) {
  const newCart = fromLocalStorage("products").map((product) => {
    const newQuantity = product.quantity + 1;
    return product.id === id
      ? {
          ...product,
          quantity: newQuantity,
          total: product.price * newQuantity,
        }
      : product;
  });
  toLocalStorage("products", newCart);
} */

//decrement items
export function decrementProduct(id) {
  const newCart = fromLocalStorage("products")
    .map((product) => {
      const newQuantity = product.quantity - 1;
      return product.id === id
        ? {
            ...product,
            quantity: newQuantity,
            total: product.price * newQuantity,
          }
        : product;
    })
    .filter((item) => item.quantity > 0);

  toLocalStorage("products", newCart);
}

//calculates total cost of all purchase
export function totalPrice() {
  return fromLocalStorage("products").reduce(
    (acc, curr) => acc + curr.total,
    0,
  );
}

//Go back to history
export function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/index.html";
  }
}

//format currency to Naira
export function formatCurrency(val) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(val);
}
