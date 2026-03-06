const products = [

    { id: 1, name: "Bánh Chưng", price: 150000, img: "./img/banhchung.webp" },

    { id: 2, name: "Giò Lụa", price: 180000, img: "./img/banhchung.webp" },

    { id: 3, name: "Cành Đào", price: 500000, img: "./img/banhchung.webp" },

    { id: 4, name: "Mứt Tết", price: 120000, img: "./img/banhchung.webp" },

    { id: 5, name: "Lì Xì (Tệp)", price: 20000, img: "./img/banhchung.webp" },

    { id: 6, name: "Dưa Hấu", price: 60000, img: "./img/banhchung.webp" }

];

const productContainer = document.getElementById("product-list");
const cardList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");
let totalMoney = 0;

function formatMoney(amount) {
    return amount.toLocaleString("vi-VN") + " VND"
}
function displayProduct() {
    products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${formatMoney(product.price)}</p>
            <button class="btn-add" id="btn-add-${product.id}">Thêm vào giỏ</button>
        `;
        productContainer.appendChild(div);

        const btn = div.querySelector(`#btn-add-${product.id}`);
        btn.addEventListener("click", () => {
            addProduct(product);
        })
    });

}

function addProduct(product) {
    const msg = document.querySelector(".empty-msg");
    if (msg) {
        msg.remove();
    } 

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="cart-item-name">${product.name}</span>
        <div>
            <span class="cart-item-price">${formatMoney(product.price)}</span>
            <button class="btn-remove">X</button>
        </div>
    `;

    cardList.appendChild(li);
    totalMoney += product.price;
    totalPrice.innerText = formatMoney(totalMoney);
}

displayProduct();