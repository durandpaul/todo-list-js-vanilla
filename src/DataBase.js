'use strict';

class DataBase {
    constructor(count = 0, todoList = [], todoDeleteList = []) {
        this.count = count;
        this.todoList = todoList; 
        this.todoDeleteList = todoDeleteList;
    }
    
    initTodoListFromStorage (localStoragetodoList = [], localStoragetodoDeletedList = []) {
        this.count = localStoragetodoList.length;
        this.todoList = localStoragetodoList;
        this.todoDeleteList = localStoragetodoDeletedList;
    }

    addInTodoList (todo) {
        this.todoList = [...this.todoList, todo] ;
    }

    addInTodoDeleteList (todo) {
        this.todoDeleteList = [...this.todoDeleteList, todo];
    }
    
    deleteItemInTodoList(todoId) {
        const todoDelete = this.todoList.find(item => item.id == todoId);
        this.todoList.splice(this.todoList.findIndex(item => item.id == todoId));
        todoDelete.status = 'todo__delete';

        this.addInTodoDeleteList(todoDelete);
    }

}

const Db = new DataBase();

export default Db;