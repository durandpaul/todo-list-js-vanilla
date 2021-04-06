'use strict';

import Db from './DataBase.js';
import { addLocalStorage, getLocalStorage } from './localStorage.js';
import { newTodo } from './crud.js';
import { deleteTodoEl, formEl, listDeletedEl, listEl } from './htmlEl.js';

getLocalStorage();

listEl.addEventListener('click', (event) => {
    event.stopPropagation();
    if(event.target.className == 'todo__delete-cross') {
        Db.deleteItemInTodoList(event.target.id);
        addLocalStorage('todo-list', Db.todoList);
        addLocalStorage('todo-delete-list', Db.todoDeleteList);
    
        const todoEl = document.getElementById('todo-'+event.target.id);
        todoEl.innerHTML = todoEl.textContent;
        listDeletedEl.appendChild(todoEl);
        todoEl.classList.remove(todoEl.className);

    } else if(event.target.tagName.toLowerCase() == 'li') {
        console.log('click');
        const todoEl = document.getElementById(event.target.id);
        if(todoEl.className == 'todo__to-complete') {
            todoEl.classList.replace( todoEl.className, 'todo__complete' );
    
            const todoComplete = Db.todoList.find(todo => todo.name == event.target.textContent);
            todoComplete.status = 'todo__complete';
    
            addLocalStorage('todo-list', Db.todoList);
        } else {
            todoEl.classList.replace( todoEl.className, 'todo__to-complete' );
            
            const todoToComplete = Db.todoList.find(todo => todo.name == event.target.textContent);
            todoToComplete.status = 'todo__to-complete';
    
            addLocalStorage('todo-list', Db.todoList);
        }
    }
}, false);

deleteTodoEl.addEventListener('click', (event) => {
    event.stopPropagation();
    listDeletedEl.style.display = listDeletedEl.style.display == '' ? 'block' : '';
})

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
 
    if(formEl.todo.value != '') {
        newTodo(formEl.todo.value);
    }
    formEl.reset();
},false);
