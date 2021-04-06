'use strict';

import Db from './DataBase.js';
import { addLocalStorage } from './localStorage.js';
import Todo from './Todo.js';
import { formEl, listEl, listDeletedEl } from './htmlEl.js';


const newTodo = (inputValue) => {
    const newItem = new Todo(inputValue, Db.count);
    
    Db.addInTodoList(newItem);

    console.log('Db.todoList', Db.todoList);

    addLocalStorage('todo-list', Db.todoList);

    const newTodoEl = document.createElement('li');
    newTodoEl.classList.add('todo__to-complete');
    newTodoEl.setAttribute('id', 'todo-'+ Db.count);
    newTodoEl.innerHTML = formEl.todo.value + '<img class="todo__delete-cross" id="'+Db.count+'" src="./public/img/clear.png" alt="supprimer le todo" >' ;
    
    listEl.appendChild(newTodoEl);
    Db.count++;
}

const feedTodoList = (array) => {
    for (const todo of array) {
        const newTodoEl = document.createElement('li');
        
        newTodoEl.classList.add(todo.status);
        newTodoEl.setAttribute('id', 'todo-'+ todo.id);

        if(todo.status == "todo__delete") {
            newTodoEl.innerHTML = todo.name;
            listDeletedEl.appendChild(newTodoEl);
        } else {
            newTodoEl.innerHTML = todo.name + '<img class="todo__delete-cross" id="'+todo.id+'" src="./public/img/clear.png" alt="supprimer le todo" >' ;
            listEl.appendChild(newTodoEl);
        }
        Db.count++;
    }
}

export {
    newTodo,
    feedTodoList,
}