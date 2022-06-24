// Select All Elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

// Functions

function eventListeners() { // All Event Listeners
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {

  if (confirm("Are you sure?")) {
    // Remove Todos from UI

    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }

    localStorage.removeItem("todos");
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      // Didn't find
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("stlye", "display : block");
    }
  })
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    let removeTodo = e.target.parentElement.parentElement.textContent;
    deleteTodoFromStorage(removeTodo);
    showAlert("success", "Todo Removed");
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1); // Remove Value from Array
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  })
}

function addTodo(e) {

  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Please write a todo");
  } else {
    addTodoToUI(newTodo)
    addTodoToStorage(newTodo);
    showAlert("success", "Todo added successfully.")
  }

  e.preventDefault();
}

// Alert
function showAlert(type, message) {
  const alert = document.createElement("div");

  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 1000);

}

function getTodosFromStorage() { // Return All Todos From Storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));

}

// The String value will be added to the UI as a list item.
function addTodoToUI(newTodo) {

  /*
                      <!-- <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>-->
  */

  // Create List Item
  const listItem = document.createElement("li");

  // Create Link
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";

  //Add Text Node
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // Add List Item to the Todo List.

  todoList.appendChild(listItem);

  // Remove Input
  todoInput.value = "";

}