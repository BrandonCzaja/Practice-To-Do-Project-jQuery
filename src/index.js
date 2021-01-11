import $ from "jquery";
import _ from "lodash";

// Adding the initial HTML to the body
$("body").append(`
    <h1>The jQuery To Do App</h1>
    <hr>
    <h2>Create a To Do</h2>
    <form id="createForm">
    <input type="text" name="createTitle"/>
    <input type="text" name="createBody"/>
    <input type="submit" value="Create To Do">
    </form>
    <hr>
    <h2>The Todos</h2>
    <ul id="todolist">

</ul>
`);

// The UL for the To Do list
const $todoList = $("#todolist");

// Create Form Variables
const $createForm = $("#createForm");
const $createTitle = $('input[name="createTitle"]');
const $createBody = $('input[name="createBody"]');

const baseUrl = "http://localhost:3000/todos";

// Function to grab todos from backend
const fetchTodos = async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  // Return promise of data
  return data;
};

// Render todos to DOM
const renderTodos = async () => {
  const todos = await fetchTodos();
  $todoList.empty();

  todos.forEach((todo) => {
    const $li = $("<li>");

    $li.html(`
        <h3>${todo.title}</h3>
        <h4>${todo.body}</h4>`);

    $todoList.append($li);
  });
};

// Function to Create a to do
const createTodo = async (event) => {
  event.preventDefault();
  await fetch(baseUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: $createTitle.val(),
      body: $createBody.val(),
    }),
  });
  renderTodos();
  $createTitle.val("");
  $createBody.val("");
};

// Add Event Listener to Form
$createForm.on("submit", createTodo);

// Initial Fetch of Todos
renderTodos();
