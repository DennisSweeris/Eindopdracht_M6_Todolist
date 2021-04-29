// SELECTORS
const inputField = document.querySelector(".input");
const inputButton = document.querySelector(".input-btn");
const resetButton = document.getElementById("reset-btn");
const dateElement = document.querySelector(".date");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter");

// EVENT LISTENERS
window.addEventListener("load", () => getItems());
filterOption.addEventListener("click", filterTodo);
inputButton.addEventListener("click", returnInput);
inputField.addEventListener("keydown", e => {
  if (e.code === "Enter") returnInput();
});

// LOAD TODOS
async function getItems() {
  data = await getData();
  data.map(createNewTodo);
}

// SHOWS DATE
const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("CET", options);

// ADDS & POST TODOS
async function returnInput() {
  if (inputField.value === "") {
    inputField.style.background = "rgb(180, 51, 51)";
    inputField.placeholder = "Please type something";
  } else {
    let newItem = { description: inputField.value, done: false };
    createNewTodo(newItem);
    inputField.style.background = "";
    inputField.value = "";
    inputField.placeholder = "New todo...";
    const newItemId = await postData(newItem);
    todoList.appendChild(newItemId);
    todoList.innerHTML = "";
  }
}

// CREATE NEW TODO
function createNewTodo(item) {
  // Create Elements
  const todoItem = document.createElement("div");
  const checkbox = document.createElement("input");
  const newItem = document.createElement("input");
  const editButton = document.createElement("button");
  const trashButton = document.createElement("button");

  // Event Listeners
  editButton.addEventListener("click", handleEditClick);
  newItem.addEventListener("keydown", handleEditPressed);
  trashButton.addEventListener("click", deleteTodo);
  checkbox.addEventListener("change", handleCheckboxChange);

  todoItem.classList.add("todoitem");

  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = false;

  newItem.classList.add("item-input");
  newItem.setAttribute("id", item.id);
  newItem.type = "text";
  newItem.value = `${item.description}`;
  newItem.disabled = true;

  editButton.classList.add("edit-btn");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;

  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;

  todoList.appendChild(todoItem);
  todoItem.append(checkbox, newItem, editButton, trashButton);

  if (item.done) {
    toggleCompleted();
    checkbox.checked = true;
  }

  window.scrollTo(0, document.querySelector(".body").scrollHeight);

  // HELPER Functions
  // Completed / Checked Helper
  function toggleCompleted() {
    newItem.classList.toggle("completed");
    todoItem.classList.toggle("completed");
  }

  // EDIT Helpers
  function editTodoActive() {
    todoItem.style.background = "rgba(180, 51,51,0.5)";
    toggleCompleted();
    editButton.style.opacity = 0.25;
    editButton.disabled = true;
    checkbox.checked = false;
  }

  function editTodoRemove() {
    toggleCompleted();
    todoItem.style.background = "";
    editButton.style.opacity = "";
    editButton.disabled = false;
  }

  function postEdit(e) {
    let newItemText = e.target.value;
    let newItemEdit = { description: newItemText, done: false };
    putData(item.id, newItemEdit);
  }

  function handleEditClick() {
    if ((newItem.disabled = newItem.disabled)) editTodoActive();
    if ((newItem.disabled = !newItem.disabled)) editTodoRemove();

    newItem.focus();
    newItem.classList.toggle("edit-todo");
  }

  function handleEditPressed(e) {
    if (e.code === "Enter") {
      if ((newItem.disabled = !newItem.disabled)) editTodoRemove();
      newItem.classList.toggle("edit-todo");
      postEdit(e);
      inputField.focus();
    }
  }

  // CHECK TODOS
  function handleCheckboxChange() {
    if (checkbox.checked === true) {
      let itemDone = { description: `${item.description}`, done: true };
      toggleCompleted();
      putData(item.id, itemDone);
    } else {
      let itemDone = { description: `${item.description}`, done: false };
      toggleCompleted();
      putData(item.id, itemDone);
    }
  }

  // DELETE
  function deleteTodo() {
    todoItem.remove();
    deleteData(item.id);
  }
}

// FILTER
function filterTodo(input) {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch (input.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) todo.style.display = "flex";
        else todo.style.display = "none";
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) todo.style.display = "flex";
        else todo.style.display = "none";
    }
  });
}
