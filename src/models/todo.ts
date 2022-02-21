class Todo {
    id: string;
    title: string;
    status: string;
    constructor(title: string, status: string) {
        this.id = Date.now().toString();
        this.title = title;
        this.status = status;

    }
}

export default Todo;