import { useState } from "react";
import "./App.css";

type Todo = {
    text: string;
    id: string;
};

function App() {
    const [todoText, setTodoText] = useState("");
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const result = [...todoList];

    function deleteTodo(i: number) {
        result.splice(i, 1);
        setTodoList(result);
    }

    function onEditTodo(newTodo: Todo, i: number) {
        result.splice(i, 1, newTodo);
        // ИЛИ result[i] = newTodo
        setTodoList(result);
    }

    function addTodo() {
        result.unshift({ text: todoText, id: crypto.randomUUID() });
        setTodoList(result);
        setTodoText("");
    }

    return (
        <div className="wrapper">
            <header className="header">
                <p>Добавить заметку</p>
                <p>Выполненные заметки</p>
            </header>
            <div className="top">
                <input
                    className="input"
                    value={todoText}
                    type="text"
                    placeholder="Напишите заметку"
                    onKeyDown={(ev) => {
                        if (ev.key === "Enter") {
                            addTodo();
                        }
                    }}
                    onChange={(e) => {
                        setTodoText(e.target.value);
                    }}
                />

                <button className="input__btn" onClick={addTodo} disabled={!todoText}>
                    Добавить
                </button>
                <button onClick={addTodo} className="knopka">
                    +
                </button>
            </div>

            <ul className="ultodo">
                {todoList.map((todo, i) => (
                    <li key={todo.text} className="element">
                        <Todo todo={todo} onDelete={() => deleteTodo(i)} onEditTodo={(todo) => onEditTodo(todo, i)} />

                        <button className="close" onClick={() => deleteTodo(i)}>
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

type TodoProps = {
    todo: Todo;
    onDelete: () => void;
    onEditTodo: (todo: Todo) => void;
};

function Todo(props: TodoProps) {
    const [open, setOpen] = useState(false);
    const [editText, setEditText] = useState(props.todo.text);

    return (
        <section className="todo__container">
            <div className="todo">
                <p className="todotext">{props.todo.text}</p>
            </div>
            <div className="input__container">
                <button
                    className="close__btn"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    {(!open && "Изменить") || "Закрыть"}
                </button>
                {open && (
                    <div className="cont">
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
                                props.onEditTodo(todo);
                                setOpen(false);
                            }}
                        >
                            ∨
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default App;
