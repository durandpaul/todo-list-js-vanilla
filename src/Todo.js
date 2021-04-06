export default class Todo {

    constructor(name, id, status = 'todo__to-complete') {
        this.name = name;
        this.id = id;
        this.status = status;
    }
}
