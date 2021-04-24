// SELECTORS
const inputField = document.querySelector(".input");
const inputButton = document.querySelector(".input-btn");
const resetButton = document.getElementById("reset-btn");
const dateElement = document.querySelector(".date");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter");

// EVENT LISTENERS
filterOption.addEventListener("click", filterTodo);
inputButton.addEventListener("click", returnInput);
inputField.addEventListener("keydown", (e) => {
  if (e.code === "Enter") returnInput();
});

// LOAD TODOS
window.addEventListener("load", () => getItems());
const getItems = async () => {
  data = await getData();
  data.map(createNewTodo);
};

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
  } else {
    inputField.style.background = "";
    let newItem = { description: inputField.value, done: false };
    createNewTodo(newItem);
    inputField.value = "";

    const newItemId = await postData(newItem);
    getItems(newItemId);
    todoList.innerHTML = "";
  }
}

// CREATE NEW TODO
function createNewTodo(item) {
  const todoItems = document.createElement("div");
  todoItems.classList.add("todoitems");

  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = false;

  const newItem = document.createElement("input");
  newItem.classList.add("item-input");
  newItem.setAttribute("id", item.id);
  newItem.type = "text";
  newItem.value = `${item.description}`;
  newItem.disabled = true;

  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.innerHTML = `<i class="fas fa-edit"></i>`;

  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;

  todoList.appendChild(todoItems);
  todoItems.append(checkbox, newItem, editButton, trashButton);

  trashButton.addEventListener("click", deleteTodo);

  if (item.done) {
    todoItems.classList.add("completed");
    newItem.classList.add("completed");
    checkbox.checked = true;
  }

  window.scrollTo(0, document.querySelector(".body").scrollHeight);

  // EDIT TODOS
  // TODODODODO
  // function editDone() {
  //   console.log("asdas");
  // }

  // editButton.addEventListener("click", editDone);
  // editButton.addEventListener("keyup", (e) => {
  //   if (e.key === "Enter") editDone;
  // });

  editButton.addEventListener("click", () => {
    if ((newItem.disabled = newItem.disabled)) {
      todoItems.style.background = "rgba(180, 51,51,0.5)";
      todoItems.classList.remove("completed");
      newItem.classList.remove("completed");
      newItem.focus();
      checkbox.checked = false;
    }

    if ((newItem.disabled = !newItem.disabled)) {
      todoItems.classList.remove("completed");
      newItem.classList.remove("completed");
      todoItems.style.background = "";
    }

    newItem.classList.toggle("edit-todo");
    newItem.focus();
  });

  newItem.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let newItemText = e.target.value;
      let newItemEdit = { description: newItemText, done: false };
      newItem.disabled = true;
      newItem.classList.remove("edit-todo");
      todoItems.style.background = "";
      putData(item.id, newItemEdit);
    }
  });

  // CHECK TODOS
  checkbox.addEventListener("change", () => {
    if (checkbox.checked === true) {
      let itemDone = { description: `${item.description}`, done: true };
      newItem.classList.add("completed");
      todoItems.classList.add("completed");
      putData(item.id, itemDone);
    } else {
      let itemDone = { description: `${item.description}`, done: false };
      newItem.classList.remove("completed");
      todoItems.classList.remove("completed");
      putData(item.id, itemDone);
    }
  });

  // DELETE
  function deleteTodo() {
    todoItems.remove();
    deleteData(item.id);
  }
}

// FILTER
function filterTodo(input) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
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