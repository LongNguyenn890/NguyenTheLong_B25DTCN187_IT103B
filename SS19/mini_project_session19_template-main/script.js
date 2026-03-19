const products = [
  { id: 1, name: "Tai nghe Bluetooth TWS", description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.", price: 320000, img: "https://picsum.photos/seed/mp19-tws/1200/800", quantity: 1 },
  { id: 2, name: "Tai nghe Bluetooth TWS", description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.", price: 320000, img: "https://picsum.photos/seed/mp19-tws/1200/800", quantity: 1 },
  { id: 3, name: "Tai nghe Bluetooth TWS", description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.", price: 320000, img: "https://picsum.photos/seed/mp19-tws/1200/800", quantity: 1 },
  { id: 4, name: "Tai nghe Bluetooth TWS", description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.", price: 320000, img: "https://picsum.photos/seed/mp19-tws/1200/800", quantity: 1 },
  { id: 5, name: "Tai nghe Bluetooth TWS", description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.", price: 320000, img: "https://picsum.photos/seed/mp19-tws/1200/800", quantity: 1 },
  { id: 6, name: "Tai nghe Bluetooth TWS", description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.", price: 320000, img: "https://picsum.photos/seed/mp19-tws/1200/800", quantity: 1 },
];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsCount = document.getElementById("product-count-badge");
const productEmpty = document.getElementById("products-empty");
const productGrid = document.getElementById("products-grid");
const cartEmpty = document.getElementById("cart-empty");
const cartTbody = document.getElementById("cart-tbody");
const cartLinesBadge = document.getElementById("cart-lines-badge");
const cartQtyBadge = document.getElementById("cart-qty-badge");
const statTotal = document.getElementById("stat-total");
const statLines = document.getElementById("stat-lines");
const statQty = document.getElementById("stat-qty");

function formatMoney(money) {
  return money.toLocaleString(`vi-VN`) + " VNĐ";
}

function saveToLocal() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderProduct() {
  productGrid.innerHTML = ``;

  if (products.length === 0) {
    productEmpty.classList.remove("hidden");
    return;
  }
  productEmpty.classList.add("hidden");
  products.forEach((p) => {
    const article = document.createElement("article");
    article.className = `card`;
    article.innerHTML = `
            <div class="card-img">
                <img
                  src="${p.img}"
                  alt="${p.name}"
                  loading="lazy"
                />
              </div>
              <div class="card-body">
                <h3 class="card-title">${p.name}</h3>
                <p class="card-desc">${p.description}</p>
                <div class="card-footer">
                  <div class="price">${formatMoney(p.price)}</div>
                  <button class="btn btn-primary">Thêm vào giỏ</button>
                </div>
              </div>
        `;
    productGrid.appendChild(article);

    const addBtn = article.querySelector(".btn-primary");
    addBtn.addEventListener("click", () => {
      addProductToCart(p);
    });
  });
}

function renderCart() {
  cartTbody.innerHTML = "";
  if (cart.length === 0) {
    cartEmpty.classList.remove("hidden");
  } else {
    cartEmpty.classList.add("hidden");
    cart.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${p.name}</td>
      <td class="right">${formatMoney(p.price)}</td>
      <td class="center">${p.quantity}</td>
      <td class="right">${formatMoney(p.totalPrice)}</td>
      <td class="center"><button class = "del-btn" onclick = "delProductFromCart(${p.id})">Xóa</button></td>
    `
      cartTbody.appendChild(tr);
    });
    updateInforCart();
  }
}

function addProductToCart(product) {
  const exsit = cart.find(p => p.id === product.id);
  if (exsit) {
    exsit.quantity += 1;
    exsit.totalPrice = exsit.price * exsit.quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      totalPrice: product.price,
    });
  }

  renderCart();
  saveToLocal();
}

function delProductFromCart(id) {
  const exist = cart.find(p => p.id === id);
  if (!exist) return;
  cart = cart.filter(p => p.id !== id);

  renderCart();
  saveToLocal();
}

function delAllProduct() {
  cart = [];
  cartLinesBadge.textContent = `${0} dòng`;
  cartQtyBadge.textContent = `${0} món`;
  statTotal.textContent = `${0}`;
  statLines.textContent = `${0}`;
  statQty.textContent = `${0}`;
  saveToLocal();
  renderCart();
}

function updateInforCart() {
  let totalLine = cart.length;
  let totalQuantity = cart.reduce((sum, p) => sum + Number(p.quantity), 0);
  let totalAllPrice = cart.reduce((sum, p) => sum + Number(p.totalPrice), 0);
  totalAllPrice = formatMoney(totalAllPrice);

  cartLinesBadge.textContent = `${totalLine} dòng`;
  cartQtyBadge.textContent = `${totalQuantity} món`;
  statTotal.textContent = `${totalAllPrice}`;
  statLines.textContent = `${totalLine}`;
  statQty.textContent = `${totalQuantity}`;
}

renderCart();
renderProduct();

const clearCartBtn = document.getElementById("clear-cart-btn");
clearCartBtn.addEventListener("click", delAllProduct);

