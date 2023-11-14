import { IToDo } from "../atom";

function ToDo({ text }: IToDo) {
  return (
    <li>
      <span>{text}</span> <button>Doing</button>
      <button>To do</button> <button>Done</button>
    </li>
  );
}

export default ToDo;
