import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todoText, setTodoText] = useState("");
  const [changeText, setChangeText] = useState("");
  const [todoList, setTodoList] = useState<TodoProps[]>([]);
  const [value, setValue] = useState(todoText);
  const result = [...todoList];

  useEffect(() => {
    setValue(todoText);
  });

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
            if (todoText.length > 0 && todoText.length <= 100) {
              setValue(todoText);
              result.unshift({ text: value });
              console.log(value, todoText);
              setTodoList(result);
              setTodoText("");
            } else {
              alert("Число введенных символов должно быть от 1 до 100");
            }
          }}
        >
          Добавить
        </button>
      </div>
      <div className="bottom">
        <ul className="left">
          {todoList.map((todo, i) => (
            <li key={i}>
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
              <button
                onClick={() => {
                  result.splice(i, 1);
                  setTodoList(result);
                }}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
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
    <>
      <div className="todo">{props.text}</div>
      <button
        onClick={() => {
          setOpen(!open);
          console.log(open);
        }}
      >
        {(!open && "Изменить") || "Закрыть"}
      </button>
      {open && (
        <div>
          <input
            type="text"
            placeholder="Изменить"
            onChange={props.setChangeText}
          />
          <button onClick={props.openButton}>✓</button>
        </div>
      )}
    </>
  );
}

export default App;
