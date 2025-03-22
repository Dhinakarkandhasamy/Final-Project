// var taskLinks=document.getElementById("task-links")
// function addTask(){
//     var input=document.getElementById("input").value

//     var newTask=document.createElement("li")
//     var icon=document.createElement("i")
//     icon.className="fas fa-trash"
//     newTask.textContent=input
//     newTask.appendChild(icon)
//     icon.style.position="absolute"
//     icon.style.right="10px"
//     icon.style.cursor="pointer"
//     icon.addEventListener("click",()=>{
//         taskLinks.removeChild(newTask)
//     })
//     taskLinks.appendChild(newTask)
//     newTask.addEventListener("click",()=>{
//         newTask.classList.toggle("active")
        

//     })
//     document.getElementById("input").value=""  
// }






var taskLinks = document.getElementById("task-links");

function addTask() {
    var input = document.getElementById("input").value;
    input = input.toUpperCase();

    if (input.trim() === "") return; // Prevent adding empty tasks
    
    var newTask = document.createElement("li");
    var icon = document.createElement("i");
    icon.className = "fas fa-trash-can";
    newTask.textContent = input;
    newTask.appendChild(icon);
    icon.style.position = "absolute";
    icon.style.right = "10px";
    icon.style.cursor = "pointer";
    icon.addEventListener("click", () => {
        taskLinks.removeChild(newTask);
        saveTasks();
    });
    taskLinks.appendChild(newTask);
    newTask.addEventListener("click", () => {
        newTask.classList.toggle("active");
        saveTasks();
    });
    document.getElementById("input").value = "";
    saveTasks();
}

function saveTasks() {
    var tasks = [];
    taskLinks.querySelectorAll("li").forEach(task => {
        tasks.push({
            text: task.textContent.replace(/\s*$/, ""), // Remove trailing spaces
            active: task.classList.contains("active")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskData => {
        var newTask = document.createElement("li");
        var icon = document.createElement("i");
        icon.className = "fas fa-trash";
        newTask.textContent = taskData.text;
        newTask.appendChild(icon);
        icon.style.position = "absolute";
        icon.style.right = "10px";
        icon.style.cursor = "pointer";
        icon.addEventListener("click", () => {
            taskLinks.removeChild(newTask);
            saveTasks();
        });
        if (taskData.active) {
            newTask.classList.add("active");
        }
        taskLinks.appendChild(newTask);
        newTask.addEventListener("click", () => {
            newTask.classList.toggle("active");
            saveTasks();
        });
    });
}

document.addEventListener("DOMContentLoaded", loadTasks);
