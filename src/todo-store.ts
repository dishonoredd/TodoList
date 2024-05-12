import { autorun, makeAutoObservable } from "mobx";

export type Todo = {
  text: string;
  id: string;
  completed: boolean;
};

class TodoStore {
  todos: Todo[] = JSON.parse(localStorage.getItem("todoList") ?? "[]");

  constructor() {
    makeAutoObservable(this);
  }

  get completedTodos() {
    return this.todos.filter((t) => t.completed);
  }

  get uncompletedTodos() {
    return this.todos.filter((t) => !t.completed);
  }

  addTodo = (todo: Todo) => {
    this.todos.unshift(todo);
  };

  completeTodo = (id: string) => {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.completed = true;
  };

  deleteTodo = (id: string) => {
    this.todos = this.todos.filter((t) => t.id !== id);
  };
}

export const todoStore = new TodoStore();

autorun(() => {
  localStorage.setItem("todoList", JSON.stringify(todoStore.todos));
});
