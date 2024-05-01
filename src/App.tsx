import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todoText, setTodoText] = useState("");
  const [changeText, setChangeText] = useState("");
  const [todoList, setTodoList] = useState<TodoProps[]>([]);
  const [value, setValue] = useState(todoText);
  const result = [...todoList];

  ///for deploy

  useEffect(() => {
    setValue(todoText);
  });

  function deleteTodo(i: number) {
    result.splice(i, 1);
    setTodoList(result);
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
          onChange={(e) => {
            setTodoText(e.target.value);
          }}
        />

        <button
          className="input__btn"
          onClick={() => {
            if (todoText.length > 0) {
              setValue(todoText);
              result.unshift({ text: value });
              setTodoList(result);
              setTodoText("");
            } else {
              alert(
                "Число введенных символов изначально должно быть больше чем 0"
              );
            }
          }}
        >
          Добавить
        </button>
      </div>

      <ul className="ultodo">
        {todoList.map((todo, i) => (
          <li key={i} className="element">
            <Todo
              changetext={changeText}
              openButton={() => {
                setValue((todo.text = changeText));
                setChangeText("");
              }}
              setChangeText={(e) => {
                setChangeText(e.target.value);
              }}
              text={todo.text}
              onClick={() => {
                result.splice(i, 1);
                setTodoList(result);
              }}
            />
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
  text: string;
  onClick?: () => void;
  setChangeText?: (e: any) => void;
  openButton?: () => void;
  changetext?: string;
};

function Todo(props: TodoProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="todo__container">
      <div className="todo">
        <p className="todotext">{props.text}</p>
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
              onChange={props.setChangeText}
            />
            <button className="done__btn" onClick={props.openButton}>
              ∨
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
