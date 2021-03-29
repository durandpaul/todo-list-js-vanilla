'use strict';
let todoTab = [];
let todoDeleteTab = [];
const formEl = document.getElementById('form');
const inputEl = document.getElementById('new-todo');
const listEl = document.getElementById('todo__list');
const listDeletedEl = document.querySelector('#todo__delete-list > ul');
// const divlistDeletedEl = document.getElementById('todo__delete-list');
const deleteTodoEl = document.querySelector('.nav__show-deleted-todo > li');
let count = 0;

getLocalStorage();

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

function storeLocalStorage(arrayName, arrayItems) {
    localStorage.setItem(arrayName, JSON.stringify(arrayItems));
    console.log(localStorage);
}

function getLocalStorage() {
    if(localStorage.length > 0 ) {
        if((localStorage.getItem('todoTab') && localStorage.getItem('todoTab').length > 0) && (localStorage.getItem('todoDeleteTab') && localStorage.getItem('todoDeleteTab').length > 0)) {
            console.log("if");
            todoTab = JSON.parse(localStorage.getItem('todoTab'));
            todoDeleteTab = JSON.parse(localStorage.getItem('todoDeleteTab'));
            feedTodoList(todoTab);
            feedTodoList(todoDeleteTab);
        }
        else if((localStorage.getItem('todoTab') && localStorage.getItem('todoTab').length > 0)) {

            todoTab = JSON.parse(localStorage.getItem('todoTab'));
            feedTodoList(todoTab);            
        }
       else if(localStorage.getItem('todoDeleteTab') && localStorage.getItem('todoDeleteTab').length > 0) {
            todoDeleteTab = JSON.parse(localStorage.getItem('todoDeleteTab'));
            feedTodoList(todoDeleteTab);
        }

    }
}

function feedTodoList(array) {
    for (const todo of array) {
        console.log(todo);

        const newTodoEl = document.createElement('li');
        newTodoEl.classList.add(todo.status);
        newTodoEl.setAttribute('id', 'todo-'+ todo.id);
        newTodoEl.setAttribute('onclick', 'todoDoneUndone(event)');

        if(todo.status == "todo__delete") {
            newTodoEl.innerHTML = todo.name;
            listDeletedEl.appendChild(newTodoEl);
        } else {
            newTodoEl.innerHTML = todo.name + '<img class="todo__delete-cross" id="'+todo.id+'" src="./public/img/clear.png" alt="supprimer le todo" onclick="deleteAtodo(event)" >' ;
            listEl.appendChild(newTodoEl);
        }
        count++;
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

    // if(todoTab.find(todo => todo.getId() == event.target.id)) {
        todoDelete = todoTab.find(todo => todo.id == event.target.id);
        todoTab.splice(todoTab.findIndex(todo => todo.id == event.target.id), 1);
        storeLocalStorage('todoTab', todoTab);
    // } 

    todoDelete.status = 'todo__delete';
    todoDeleteTab = [...todoDeleteTab, todoDelete];
    storeLocalStorage('todoDeleteTab', todoDeleteTab);

    const todoEl = document.getElementById('todo-'+event.target.id);
    todoEl.innerHTML = todoEl.textContent;
    listDeletedEl.appendChild(todoEl);
    todoEl.classList.remove(todoEl.className);
}

function todoDoneUndone(event) {
    event.stopPropagation();

    const todoEl = document.getElementById(event.target.id);
    if(todoEl.className == 'todo__to-complete') {
        todoEl.classList.replace( todoEl.className, 'todo__complete' );
        const todoComplete = todoTab.find(todo => todo.name == event.target.textContent);
        todoComplete.status = 'todo__complete';

        storeLocalStorage('todoTab', todoTab);
    } else {
        todoEl.classList.replace( todoEl.className, 'todo__to-complete' );
        
        const todoToComplete = todoTab.find(todo => todo.name == event.target.textContent);
        todoToComplete.status = 'todo__to-complete';

        storeLocalStorage('todoTab', todoTab);
    }
}

function newTodo() {
    let newTodo = createTodo(formEl.todo.value, count);
    todoTab = [...todoTab, newTodo];
    storeLocalStorage('todoTab', todoTab);

    const newTodoEl = document.createElement('li');
    newTodoEl.classList.add('todo__to-complete');
    newTodoEl.setAttribute('id', 'todo-'+ count);
    newTodoEl.setAttribute('onclick', 'todoDoneUndone(event)');

    newTodoEl.innerHTML = formEl.todo.value + '<img class="todo__delete-cross" id="'+count+'" src="./public/img/clear.png" alt="supprimer le todo" onclick="deleteAtodo(event)" >' ;
    listEl.appendChild(newTodoEl);
}

deleteTodoEl.addEventListener('click', (event) => {
    event.stopPropagation();

    if(listDeletedEl.style.display == '' || listDeletedEl.style.display == 'none') {
        listDeletedEl.style.display = 'block';
    } else {
        listDeletedEl.style.display = 'none';
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

