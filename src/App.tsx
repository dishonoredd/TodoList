import { useEffect, useState } from "react"
import "./App.css"
import { Link, Outlet, Route, Routes } from "react-router-dom"

type Todo = {
    text: string
    id: string
    completed: boolean
}

function App() {
    return (
        <Routes>
            <Route element={<Header />}>
                <Route path="" index element={<HomePage />} />
                <Route path="/done" element={<DoneTodo />} />
            </Route>
        </Routes>
    )
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
    )
}

const getInitialTodos = (): Todo[] => {
    return JSON.parse(localStorage.getItem("todoList") ?? "[]")
}

function HomePage() {
    const [todoText, setTodoText] = useState("")
    const [todoList, setTodoList] = useState<Todo[]>(getInitialTodos())

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList))
    }, [todoList])

    const result = [...todoList]

    function deleteTodo(i: number) {
        result.splice(i, 1)
        setTodoList(result)
    }

    function onEditTodo(newTodo: Todo, i: number) {
        result.splice(i, 1, newTodo)
        // ИЛИ result[i] = newTodo
        setTodoList(result)
    }

    function addTodo() {
        result.unshift({ text: todoText, id: crypto.randomUUID(), completed: false })
        setTodoList(result)
        setTodoText("")
    }

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
                                addTodo()
                            }
                        }}
                        onChange={(e) => {
                            setTodoText(e.target.value)
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
                    {todoList
                        .filter((t) => !t.completed)
                        .map((todo, i) => (
                            <li key={todo.id} className="element">
                                <Todo todo={todo} onDelete={() => deleteTodo(i)} onEditTodo={(todo) => onEditTodo(todo, i)} />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}

type TodoProps = {
    todo: Todo
    onDelete: () => void
    onEditTodo: (todo: Todo) => void
}

function Todo(props: TodoProps) {
    const [open, setOpen] = useState(false)
    const [editText, setEditText] = useState(props.todo.text)

    return (
        <section className="todo__container">
            <div className="todoscroll">
                <p className="todotext">{props.todo.text}</p>
            </div>
            <div className="input__container">
                <div style={{ display: "flex" }}>
                    <button
                        onClick={() => {
                            const todo = { ...props.todo, completed: true }
                            props.onEditTodo(todo)
                        }}
                        className="close__btn"
                    >
                        Done
                    </button>
                    <button
                        className="close__btn"
                        onClick={() => {
                            setOpen(!open)
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
                                    const todo = { ...props.todo, text: editText }
                                    props.onEditTodo(todo)
                                    setOpen(false)
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
    )
}

const getDoneInitialTodos = (): Todo[] => {
    const todos: Todo[] = JSON.parse(localStorage.getItem("todoList") ?? "[]")
    return todos.filter((todo) => todo.completed)
}

function DoneTodo() {
    const [done, setDone] = useState<Todo[]>(getDoneInitialTodos())

    return (
        <div>
            {done.map((todo) => (
                <p>{todo.text}</p>
            ))}
        </div>
    )
}

export default App
