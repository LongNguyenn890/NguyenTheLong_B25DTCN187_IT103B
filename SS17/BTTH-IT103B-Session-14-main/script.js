const products = [

    { id: 1, name: "Bánh Chưng", price: 150000, img: "./img/banhchung.webp" },

    { id: 2, name: "Giò Lụa", price: 180000, img: "./img/giolua.jpg" },

    { id: 3, name: "Cành Đào", price: 500000, img: "./img/canhdao.webp" },

    { id: 4, name: "Mứt Tết", price: 120000, img: "./img/muttet.webp" },

    { id: 5, name: "Lì Xì (Tệp)", price: 20000, img: "./img/lixi.webp" },

    { id: 6, name: "Dưa Hấu", price: 60000, img: "./img/duahau.jpg" }

];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = 0;

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalPriceDOM = document.getElementById("total-price");

function formatMoney(money) {
    return money.toLocaleString("vi-VN") + " VND";
}

function addToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="${product.img}" alt="">
            <h3>${product.name}</h3>
            <p class="price">${formatMoney(product.price)}</p>
            <button class="btn-add" id="btn-add-${product.id}">Thêm vào giỏ</button>
        `
        productList.appendChild(div);

        const addBtn = document.getElementById(`btn-add-${product.id}`);
        addBtn.addEventListener("click", () => {
            addCart(product);
        });
    });
}

function addCart(product) {
    cart.push(product);
    addToStorage();
    renderCart();
}

function renderCart() {
    totalPrice = 0;
    cartList.innerHTML = "";
    if (cart.length === 0) {
        cartList.innerHTML = ` <li class="empty-msg">Chưa có món nào...</li>`;
        totalPriceDOM.textContent = formatMoney(0);
        return;
    } else {
        cart.forEach((product,index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="cart-item-name">${product.name}</span>
                <div>
                    <span class="cart-item-price">${formatMoney(product.price)}</span>
                    <button class="btn-remove">X</button>
                </div>
            `;
            cartList.appendChild(li);
            totalPrice += product.price;

            const btnRemove = li.querySelector(".btn-remove");
            btnRemove.addEventListener("click", () => {
                cart.splice(index, 1);
                addToStorage();
                renderCart()
            })
        });
        totalPriceDOM.textContent = formatMoney(totalPrice);
    }


}

const btnCheckOut = document.getElementById("btn-checkout");
btnCheckOut.addEventListener("click", () => {
    if (cart.length !== 0) {
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
        alert("Đã thanh toán thành công");
    } else {
        alert("Giỏ hàng đang trống");
    }
})

renderProducts();
renderCart();