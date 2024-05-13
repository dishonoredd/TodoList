import { useState } from "react";
import "./App.css";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { Todo, todoStore } from "./todo-store";
import { observer } from "mobx-react-lite";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="" index element={<HomePage />} />
        <Route path="/done" element={<DoneTodo />} />
      </Route>
    </Routes>
  );
}

function Header() {
  return (
    <>
      <header className="header">
        <Link className="headerlink" to="">
          Добавить заметку
        </Link>
        <Link className="headerlink" to="/done">
          Выполненные заметки
        </Link>
      </header>
      <Outlet />
    </>
  );
}

const HomePage = observer(() => {
  const [todoText, setTodoText] = useState("");

  const handleAddTodo = () => {
    if (!todoText) return;
    todoStore.addTodo({
      completed: false,
      id: crypto.randomUUID(),
      text: todoText,
    });
    setTodoText("");
  };

  return (
    <div className="wrapper">
      <div style={{ padding: 20 }}>
        <div className="top">
          <input
            className="input"
            value={todoText}
            type="text"
            placeholder="Напишите заметку"
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                handleAddTodo();
              }
            }}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
          />

          <button
            className="input__btn"
            onClick={handleAddTodo}
            disabled={!todoText}
          >
            Добавить
          </button>
          <button onClick={handleAddTodo} className="knopka">
            +
          </button>
        </div>

        <ul className="ultodo">
          {todoStore.uncompletedTodos.map((todo) => (
            <li key={todo.id} className="element">
              <TodoView
                todo={todo}
                onDelete={() => todoStore.deleteTodo(todo.id)}
                onCompleteTodo={(todo) => todoStore.completeTodo(todo.id)}
                onEditTodo={(todo) => todoStore.onEditToto(todo.text, todo.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

type TodoProps = {
  todo: Todo;
  onDelete: () => void;
  onEditTodo: (todo: Todo, id: string) => void;
  onCompleteTodo: (todo: Todo) => void;
};

function TodoView(props: TodoProps) {
  const [open, setOpen] = useState(false);
  const [editText, setEditText] = useState(props.todo.text);

  return (
    <section className="todo__container">
      <div className="todoscroll">
        <p className="todotext">{props.todo.text}</p>
      </div>
      <div className="input__container">
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={() => {
              const todo = { ...props.todo, completed: true };
              props.onCompleteTodo(todo);
            }}
            className="close__btn"
          >
            Выполнить
          </button>
          <button
            className="close__btn"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {(!open && "Изменить") || "Закрыть"}
          </button>
          {open && (
            <>
              <input
                className="changeinput"
                type="text"
                placeholder="Изменить"
                value={editText}
                onChange={(ev) => setEditText(ev.target.value)}
              />
              <button
                className="done__btn"
                onClick={() => {
                  const todo = { ...props.todo, text: editText };
                  props.onEditTodo(todo, todo.id);
                  setOpen(false);
                }}
              >
                ∨
              </button>
            </>
          )}
        </div>
        <button className="close" onClick={() => props.onDelete()}>
          ✕
        </button>
      </div>
    </section>
  );
}

const DoneTodo = observer(() => {
  return (
    <section className="ultodo">
      {todoStore.completedTodos.map((todo) => (
        <div className="todo__container">
          <div className="todoscroll">
            <p key={todo.id}>{todo.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
});

export default App;
