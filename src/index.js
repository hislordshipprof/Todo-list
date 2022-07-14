/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";

import { Info, displayTodo, createTodoInfo, updateTodos } from "./create-update-remove.js";
import { updateStatus, clearCompletedTodo } from "./todostatus";
import "./styles.css";

const form = document.getElementById("form");
const TodoListContainer = document.querySelector(".list-container");
const clearTodo = document.querySelector(".clearTodo");


window.addEventListener("load", displayTodo);


form.addEventListener("submit", (e) => {
  e.preventDefault();
  createTodoInfo();
});


TodoListContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".delete");
  if (!clicked) return;

  Info.deleteTodo(+clicked.dataset.del);
  displayTodo();
});

TodoListContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".todo-item");
  if (!clicked) return;

  updateTodos(clicked);
});

TodoListContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".check-box");
  if (!clicked) return;

  updateStatus(+clicked.dataset.ind);
});

clearTodo.addEventListener("click", clearCompletedTodo);
