const tasks = [
    {id: 1, name: "Quét nhà"},
    {id: 2, name: "Giặt quần áo"},
]

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const adBtn = document.getElementById("addBtn");


function renderTask() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = `${task.name}`;
        taskList.appendChild(li);
    });
}

function addTask() {
    let inputTask = taskInput.value.trim();
    if (!inputTask) {
        alert("Vui lòng nhập tên công việc!");
        return;
    } 

    let newTask = {
        id:tasks.length === 0? 1 : tasks[tasks.length - 1].id + 1,
        name: inputTask,
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTask();

}


function init() {
    renderTask();

    adBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    })
}

init();