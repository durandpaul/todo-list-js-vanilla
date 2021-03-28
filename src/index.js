'use strict';
let todoToCompleteTab = [];
let todoCompleteTab = [];
let todoDeleteTab = [];
const formEl = document.getElementById('form');
const inputEl = document.getElementById('new-todo');
const listEl = document.getElementById('todo__list');
const listDeletedEl = document.querySelector('#todo__delete-list > ul');
const divlistDeletedEl = document.getElementById('todo__delete-list');
const deleteTodoEl = document.querySelector('.nav__show-deleted-todo > li');
let count = 0;

const todoItem = {
    getStatus() {
        return this.status;
    },
    getId() {
        return this.id;
    },
    getName() {
        return this.name;
    }
}

function createTodo(name, id, status = 'todo__to-complete') {
    let todo = Object.create(todoItem);
    todo.name = name;
    todo.id =  id; 
    todo.status = status;
    return todo; 
}

function deleteAtodo(event) {
    event.stopPropagation();
    let todoDelete = {};
    if(todoToCompleteTab.find(todo => todo.getId() == event.target.id)) {
        todoDelete = todoToCompleteTab.find(todo => todo.getId() == event.target.id);
        todoToCompleteTab.splice(todoToCompleteTab.findIndex(todo => todo.getId() == event.target.id), 1);

    } else {
        todoDelete = todoCompleteTab.find(todo => todo.getId() == event.target.id);
        todoCompleteTab.splice(todoCompleteTab.findIndex(todo => todo.getId() == event.target.id), 1);

    }
    todoDelete.status = 'todo__delete';
    todoDeleteTab = [...todoDeleteTab, todoDelete];

    const todoEl = document.getElementById('todo-'+event.target.id);
    todoEl.innerHTML = todoEl.textContent;
    listDeletedEl.appendChild(todoEl);
    // todoEl.classList.remove(todoEl.className);
    // todoEl.remove();
}

function todoDoneUndone(event) {
    event.stopPropagation();

    const todoEl = document.getElementById(event.target.id);
    if(todoEl.className == 'todo__to-complete') {
        todoEl.classList.replace( todoEl.className, 'todo__complete' );

        const todoComplete = todoToCompleteTab.find(todo => todo.getName() == event.target.textContent);
        todoComplete.status = 'todo__complete';
        todoCompleteTab = [...todoCompleteTab, todoComplete];
        todoToCompleteTab.splice(todoToCompleteTab.findIndex(todo => todo.getId() == todoComplete.getId()), 1);    

    } else {
        todoEl.classList.replace( todoEl.className, 'todo__to-complete' );
        
        const todoToComplete = todoCompleteTab.find(todo => todo.getName() == event.target.textContent);
        todoToComplete.status = 'todo__to-complete';
        todoToCompleteTab = [...todoToCompleteTab, todoToComplete];
        todoCompleteTab.splice(todoCompleteTab.findIndex(todo => todo.getId() == todoToComplete.getId()), 1);

    }
}

function newTodo() {
    let newTodo = createTodo(formEl.todo.value, count);
    todoToCompleteTab = [...todoToCompleteTab, newTodo];

    const newTodoEl = document.createElement('li');
    newTodoEl.classList.add('todo__to-complete');
    newTodoEl.setAttribute('id', 'todo-'+ count);
    newTodoEl.setAttribute('onclick', 'todoDoneUndone(event)');

    newTodoEl.innerHTML = formEl.todo.value + '<img class="todo__delete-cross" id="'+count+'" src="./public/img/clear.png" alt="supprimer le todo" onclick="deleteAtodo(event)" >' ;
    listEl.appendChild(newTodoEl);
}

deleteTodoEl.addEventListener('click', (event) => {
    event.stopPropagation();

    if(divlistDeletedEl.style.display == '' || divlistDeletedEl.style.display == 'none') {
        divlistDeletedEl.style.display = 'block';
    } else {
        divlistDeletedEl.style.display = 'none';
    }
})

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
 
    if(formEl.todo.value != '') {
        newTodo();
    }
    formEl.reset();
    count++;
},false);

