let products = [];
let idCounter = 1;
let editId = null;

const formTitle = document.getElementById("formTitle");
const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productQuantity = document.getElementById("productQuantity");
const productDescription = document.getElementById("productDescription");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const emptyState = document.getElementById("emptyState");
const clearAllBtn = document.getElementById("clearAllBtn");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");



const productTableBody = document.getElementById("productTableBody");
products  = JSON.parse(localStorage.getItem("products")) || [];



function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function validateForm() {
  const name = productName.value.trim();
  const category = productCategory.value;
  const price = Number(productPrice.value);
  const quantity = Number(productQuantity.value);
  const description = productDescription.value.trim();

  return {
    name, category, price, quantity, description
  }

}

function resetForm() {
  productForm.reset();
  formTitle.textContent = `Thêm Sản Phẩm Mới`;
  submitBtn.textContent = `➕ Thêm Sản Phẩm`;
  cancelBtn.style.display = "none";
  editId = null;

}

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(price);
}

function createProduct() {
  let data = validateForm();
  if (editId === null) {
    data.id = idCounter++;
    products.push(data);
  } else {
    updateProduct(editId);
  }
  resetForm();
  renderProduct();
  saveToLocalStorage();
}

function renderProduct(filterProduct = null) {
  productToRender = filterProduct || products;
  productTableBody.innerHTML = "";

  if (productToRender.length === 0) {
    emptyState.classList.add("show");
    return;
  }
  emptyState.classList.remove("show");
  productToRender.forEach((product) => {
    let row = renderRow(product)
    productTableBody.appendChild(row);
  });
}

function renderRow(product) {
  const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${product.id}</td>
      <td>${product.category}</td>
      <td><strong>${product.name}</strong></td>
      <td class = "price">${formatPrice(product.price)}</td>
      <td class = "quantity ${product.quantity < 10 ? "low-stock" : ""}">${product.quantity}</td>
      <td>${product.description || "Không có mô tả"}</td>
      <td>
        <div class = "action-buttons">
          <button class = "btn-edit" onclick = "editProduct(${product.id})"> ✏️ Sửa </button>
          <button class = "btn-delete" onclick = "delProduct(${product.id})"> 🗑️ Xóa </button>
        </div>
      </td>
    `;
    return tr;
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  productName.value = product.name;
  productCategory.value = product.category;
  productPrice.value = product.price;
  productQuantity.value = product.quantity;
  productDescription.value = product.description;

  formTitle.textContent = `CHỈNH SỬA SẢN PHẨM`;
  submitBtn.textContent = `💾 Cập Nhật`;
  cancelBtn.style.display = "block";

  editId = id;
  document.querySelector(".form-section").scrollIntoView({ behavior: `smooth` });
  productName.focus();
}

function updateProduct(id) {
  const product = products.find(t => t.id === id);
  if (product) {
    const data = validateForm();

    product.name = data.name;
    product.category = data.category;
    product.price = data.price;
    product.quantity = data.quantity;
    product.description = data.description;

    saveToLocalStorage();
    renderProduct();
  }
}

function delProduct(id) {
  const product = products.find(t => t.id === id);
  if (!product) return;
  const delConfirm = confirm('Bạn có chắc chắn muốn xóa không?');
  if (delConfirm) {
    products = products.filter(p => p.id !== id);
    saveToLocalStorage();
    renderProduct();
  }
}

function delAllProduct() {
  let conformDelAll = confirm("Bạn có chắc chắn muốn xóa hết không ?");
  if (conformDelAll) {
    products = [];
    idCounter = 1;
    saveToLocalStorage();
    renderProduct();
    alert("Đã xóa thành công");
  }
}

function searchProduct() {
  const searchItem = searchInput.value.toLowerCase().trim();
  const categoryItem = filterCategory.value;

  let filtered = products;

  if (searchItem) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchItem));
  }

  if (categoryItem) {
    filtered = filtered.filter(p => p.category === categoryItem);
  }
  renderProduct(filtered);
}

function filterProduct() {
  searchProduct();
}

function cancelForm() {
  resetForm();
}

function init() {
  renderProduct();
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createProduct();
  });

  cancelBtn.addEventListener("click", cancelForm);
  clearAllBtn.addEventListener("click", delAllProduct);
  searchInput.addEventListener("input", searchProduct);
  filterCategory.addEventListener("change", filterProduct);
}

init();