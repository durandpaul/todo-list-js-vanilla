'use strict';

import Db from './DataBase.js';
import { feedTodoList } from './crud.js';

const addLocalStorage = (arrayName, arrayItems) => {
    localStorage.setItem(arrayName, JSON.stringify(arrayItems));
    console.log('localStorage', localStorage);
}


const getLocalStorage = () => {
    console.log('getLocalStorage');
    if(localStorage.length > 0 ) {
        if((localStorage.getItem('todo-list') && localStorage.getItem('todo-list').length > 0) && (localStorage.getItem('todo-delete-list') && localStorage.getItem('todo-delete-list').length > 0)) {
            const todoListFromStorage = JSON.parse(localStorage.getItem('todo-list'));

            const todoDeleteListFromStorage = JSON.parse(localStorage.getItem('todo-delete-list'));
            
            Db.initTodoListFromStorage(todoListFromStorage, todoDeleteListFromStorage);

            feedTodoList(todoListFromStorage);
            feedTodoList(todoDeleteListFromStorage);
        }
        else if(localStorage.getItem('todo-list') && localStorage.getItem('todo-list').length > 0) {
            const todoListFromStorage = JSON.parse(localStorage.getItem('todo-list'));

            Db.initTodoListFromStorage(todoListFromStorage);
            feedTodoList(todoListFromStorage);            
        } else {
            const todoDeleteListFromStorage = JSON.parse(localStorage.getItem('todo-delete-list'));

            Db.initTodoListFromStorage([], todoDeleteListFromStorage);
            feedTodoList(todoDeleteListFromStorage);
        }
    }
  
}

export {
    addLocalStorage,
    getLocalStorage
}

