const addListBtn = document.getElementById("addListBtn");
const listNameInput = document.getElementById("listName");
const listsContainer = document.getElementById("listsContainer");

let lists = JSON.parse(localStorage.getItem("lists")) || [];

function displayLists() {
  listsContainer.innerHTML = ""; 

  lists.forEach((list, listIndex) => {
    const listElement = document.createElement("div");
    listElement.classList.add("list");

    const listTitle = document.createElement("h3");
    listTitle.textContent = list.name;

    const removeListBtn = document.createElement("button");
    removeListBtn.textContent = "Supprimer la liste";
    removeListBtn.onclick = () => removeList(listIndex);

    const addTaskForm = document.createElement("div");
    addTaskForm.innerHTML = `
      <input type="text" placeholder="Nom de la tâche" class="taskName" />
      <input type="date" class="taskDate" />
      <button class="addTaskBtn">Ajouter une tâche</button>
    `;
    const taskNameInput = addTaskForm.querySelector(".taskName");
    const taskDateInput = addTaskForm.querySelector(".taskDate");
    const addTaskBtn = addTaskForm.querySelector(".addTaskBtn");

    addTaskBtn.onclick = () => addTask(listIndex, taskNameInput.value, taskDateInput.value);

    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasksContainer");

    list.tasks.forEach((task, taskIndex) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      if (task.completed) taskElement.classList.add("completed");

      taskElement.innerHTML = `
        <span>${task.name} (due: ${task.date})</span>
        <div>
          <button onclick="markTaskCompleted(${listIndex}, ${taskIndex})">Terminer</button>
          <button onclick="editTask(${listIndex}, ${taskIndex})">Modifier</button>
          <button onclick="removeTask(${listIndex}, ${taskIndex})">Supprimer</button>
        </div>
      `;

      tasksContainer.appendChild(taskElement);
    });

    listElement.appendChild(listTitle);
    listElement.appendChild(removeListBtn);
    listElement.appendChild(addTaskForm);
    listElement.appendChild(tasksContainer);

    listsContainer.appendChild(listElement);
  });

  localStorage.setItem("lists", JSON.stringify(lists));
}

addListBtn.addEventListener("click", () => {
  const listName = listNameInput.value.trim();
  if (listName) {
    lists.push({ name: listName, tasks: [] });
    listNameInput.value = "";
    displayLists();
  } else {
    alert("Veuillez entrer un nom pour la liste.");
  }
});

function removeList(index) {
  lists.splice(index, 1);
  displayLists();
}

function addTask(listIndex, taskName, taskDate) {
  if (taskName && taskDate) {
    lists[listIndex].tasks.push({ name: taskName, date: taskDate, completed: false });
    displayLists();
  } else {
    alert("Veuillez entrer un nom et une date pour la tâche.");
  }
}

function removeTask(listIndex, taskIndex) {
  lists[listIndex].tasks.splice(taskIndex, 1);
  displayLists();
}

function markTaskCompleted(listIndex, taskIndex) {
  lists[listIndex].tasks[taskIndex].completed = true;
  displayLists();
}

function editTask(listIndex, taskIndex) {
  const newTaskName = prompt("Nouvelle tâche:", lists[listIndex].tasks[taskIndex].name);
  const newTaskDate = prompt("Nouvelle date:", lists[listIndex].tasks[taskIndex].date);

  if (newTaskName && newTaskDate) {
    lists[listIndex].tasks[taskIndex].name = newTaskName;
    lists[listIndex].tasks[taskIndex].date = newTaskDate;
    displayLists();
  }
}

displayLists();
