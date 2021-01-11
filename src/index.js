import $ from "jquery";
import _ from "lodash";

// Adding the initial HTML to the body
$("body").append(`<h1>The Todo App</h1>
<hr>
<h2>The Todos</h2>
<ul id="todolist">

</ul>
`);

// The UL for the To Do list
const $todoList = $("#todolist");
const baseUrl = "http://localhost:3000/todos";

// Function to grab todos from backend
const fetchTodos = async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  // Return promise of data
  return data;
};

// Render todos to DOM
