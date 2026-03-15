let employeeList = [];
let edittingId = null;

const form = document.getElementById("form-employee");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const dateOfBirthInput = document.getElementById("dateOfBirth");
const positionInput = document.getElementById("position");

const formTitle = document.getElementById("form-title");
const cancelBtn = document.getElementById("cancelBtn");


const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorDate = document.getElementById("errorDate");
const errorPositon = document.getElementById("errorPositon");

const tbody = document.getElementById("employee-tbody");
const employeeCount = document.getElementById("employee-count");
const footerCount = document.getElementById("footer-count");



const addBtn = document.getElementById("addBtn");

function inValidEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function resetForm() {
    form.reset();
    clearError();
    edittingId = null;
    formTitle.textContent = "THÊM NHÂN VIÊN MỚI";
    addBtn.textContent = "Thêm nhân viên mới"
    cancelBtn.classList.add("hidden");
}

function formatDateToDDMMYYYY(isoString) {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "";
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
}

function clearError() {
    errorName.textContent = "";
    errorEmail.textContent = "";
    errorDate.textContent = "";
    errorPositon.textContent = "";
}

function validateForm() {
    let fullName = fullNameInput.value.trim();
    let email = emailInput.value.trim();
    let dob = dateOfBirthInput.value;
    let position = positionInput.value;

    let isValid = true;
    clearError();

    if (!fullName) {
        errorName.textContent = "Họ tên không được để trống";
        isValid = false;
    }

    if (!email) {
        errorEmail.textContent = "Email không được để trống";
        isValid = false;

    } else if (!inValidEmail(email)) {
        errorEmail.textContent = "Email không hợp lệ";
        isValid = false;
    }

    if (!dob) {
        errorDate.textContent = "Ngày sinh không được để trống";
        isValid = false;
    }

    if (!position) {
        errorPositon.textContent = "Chức vụ không được để trống";
        isValid = false;
    }

    if (!isValid) return;
    return { fullName, email, dob, position };
}

function renderTable() {
    tbody.innerHTML = "";
    employeeList.forEach(employee => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.fullName}</td>
            <td>${employee.email}</td>
            <td>${formatDateToDDMMYYYY(employee.dob)}</td>
            <td>${employee.position}</td>
            <td>
                <div class="actions">
                <button class="btn btn-sm btn-edit" data-id="${employee.id}">Sửa</button>
                <button class="btn btn-sm btn-delete" data-id="${employee.id}">Xóa</button>
                </div>
            </td>
        `

        tbody.appendChild(tr);
    });

    updateStatistic();
}

function updateStatistic() {
    let count = employeeList.length;
    employeeCount.textContent = `${count} nhân viên`;
    footerCount.textContent = `Tổng số nhân viên: ${count}`;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const employee = validateForm();
    if (!employee) return;

    if (edittingId === null) {
        const newEmployee = {
            id: employeeList.length == 0 ? 1 : employeeList[employeeList.length - 1].id + 1,
            fullName: employee.fullName,
            email: employee.email,
            dob: employee.dob,
            position: employee.position,
        };
        employeeList.push(newEmployee);
    } else {
        employeeList = employeeList.map(emp => {
            return emp.id === edittingId ? { ...emp, ...employee } : emp;
        });
    }
    renderTable();
    resetForm();
});

tbody.addEventListener("click", (e) => {
    const target = e.target;
    const id = Number(target.getAttribute("data-id"));
    if (!id) return;

    if (target.classList.contains("btn-edit")) {
        editEmployee(id);
    } else if (target.classList.contains("btn-delete")) {
        delEmployee(id);
    }
});

function editEmployee(id) {
    const emp = employeeList.find(emp => emp.id === id);
    if (!emp) return;

    edittingId = id;

    fullNameInput.value = emp.fullName;
    emailInput.value = emp.email;
    dateOfBirthInput.value = emp.dob;
    positionInput.value = emp.position;

    addBtn.textContent = "Cập Nhật";
    cancelBtn.classList.remove("hidden");
}

function delEmployee(id) {
    const emp = employeeList.find(emp => emp.id === id);
    if (!emp) return;
    let conformDel = confirm("Bạn có chắc chắn muốn xóa không:");
    if (!conformDel) return;

    employeeList = employeeList.filter(emp => emp.id !== id);
    if (edittingId === id) {
        resetForm();
    }
    renderTable();
}

cancelBtn.addEventListener("click", () => {
    resetForm();
})

