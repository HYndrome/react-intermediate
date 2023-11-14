import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoState } from "../atom";
import ToDo from "./Todo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
