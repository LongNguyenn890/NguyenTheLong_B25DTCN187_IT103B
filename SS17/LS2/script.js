const initialTodos = [
    { id: 1, task: "Mua bánh chưng", done: false },
    { id: 2, task: "Dọn nhà đón Tết", done: false },
    { id: 3, task: "Gói bánh chưng", done: false },
    { id: 4, task: "Trang trí nhà cửa bằng hoa mai, hoa đào", done: false },
    { id: 5, task: "Mua phong bao lì xì", done: false },
    { id: 6, task: "Chuẩn bị mâm ngũ quả", done: false },

];

let todoStorge = JSON.parse(localStorage.getItem("myTodos"));
if (!todoStorge) {
    todoStorge = initialTodos;
    localStorage.setItem("myTodos", JSON.stringify(initialTodos));
}

const todoList = document.getElementById("todo-list");
const addInput = document.getElementById("add-input");
const addBtn = document.getElementById("add-btn");

function renderTodo() {
    todoList.innerHTML = "";

    todoStorge.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "todo";

        if (todo.done) {
            li.classList.add("done");
        }

        li.innerHTML = `
        <div>
            <input type="checkbox" ${todo.done ? "checked" : ""}>
            <p class = "task">${todo.task}</p>
        </div>
        <div>
            <button class="del-btn">🗑️</button>
            <button class="edit-btn">✏️</button>
        </div>
        
        `;

        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change", () => {
            todoStorge[index].done = checkbox.checked;
            saveToStorage();
            renderTodo();
        });

        const delBtn = li.querySelector(".del-btn");

        delBtn.addEventListener("click", () => {
            delTask(todo.id);
        });

        const editBtn = li.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
            editTask(todo.id);
        })

        todoList.appendChild(li);
    });
}

function validateInput() {
    let task = addInput.value.trim();
    if (!task) {
        alert("Không được để trống");
        return;
    }
    return {
        id: todoStorge.length === 0 ? 1 : todoStorge[todoStorge.length - 1].id + 1,
        task: task,
        done: false,
    }
}

function addTask() {
    let task = validateInput();
    if (!task) return;
    todoStorge.push(task);
    addInput.value = "";
    saveToStorage();
    renderTodo();
}

function saveToStorage() {
    localStorage.setItem("myTodos", JSON.stringify(todoStorge));
}

function delTask(taskId) {
    let task = todoStorge.find(t => t.id === taskId);
    if (!task) return;
    let delconfirm = confirm("Bạn có chắc chắn muốn xóa không ?");
    if (delconfirm) {
        todoStorge = todoStorge.filter(t => t.id !== taskId);
        saveToStorage();
        renderTodo();
    }

}

function editTask(taskId) {
    let task = todoStorge.find(t => t.id === taskId);
    if (!task) return;
    
}


renderTodo();
addBtn.addEventListener("click", () => {
    addTask();
});
