// Selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners 
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo)

// Functions 
function addTodo(event) {
    event.preventDefault();
    //toDo div 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create LI 
    const newToDo = document.createElement('li');
    newToDo.innerText = todoInput.value;
    // Add todo to local storage;    
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);
    saveLocalToDos(todoInput.value);
    // Checked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append to list 
    todoList.appendChild(todoDiv);
    // Clear input value 
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    // Delete todo 
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })

    }
    // Check mark 
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// Save to local storage 
function saveLocalToDos(todo) {
    // Check if we have a todo 
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //toDo div 
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // create LI 
        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        // Add todo to local storage; 
        newToDo.classList.add('todo-item');
        todoDiv.appendChild(newToDo);
        // Checked button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // append to list 
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    // Check if we have a todo 
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}