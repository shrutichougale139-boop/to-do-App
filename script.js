let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <span class="delete" onclick="deleteTask(${index})">✖</span>
        `;

        taskList.appendChild(li);
    });

    document.getElementById("counter").innerText =
        `Total: ${tasks.length} | Completed: ${tasks.filter(t => t.completed).length}`;

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text === "") return alert("Please enter a task");

    tasks.push({ text, completed: false });
    input.value = "";
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

function searchTasks() {
    const search = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll("li");

    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(search)
            ? "flex"
            : "none";
    });
}

document.getElementById("taskInput").addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

renderTasks();
