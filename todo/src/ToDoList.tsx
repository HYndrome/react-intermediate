import { useForm } from "react-hook-form";

// 기존 코드
/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
    setToDoError("");
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError("toDo should be longer");
    }
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          placeholder="Write what to do"
        />
        <button>Add</button>
        {toDoError !== "" ? <p>{toDoError}</p> : null}
      </form>
    </div>
  );
} */
interface IForm {
  name: string;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "Password are not matched" },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "Server offline." });
    // 초기화
    setValue("name", "");
  };

  console.log(errors);
  return (
    <div>
      <span>{errors.extraError?.message as string}</span>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("name", {
            required: "name is required",
          })}
          placeholder="name"
        />
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "only naver.com email allowed",
            },
          })}
          placeholder="email"
        />
        <span>{errors.email?.message as string}</span>
        <input
          {...register("username", {
            required: "username is required",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
            minLength: {
              value: 2,
              message: "username should be longer than 2",
            },
          })}
          placeholder="username"
        />
        <span>{errors.username?.message as string}</span>
        <input
          {...register("password", { required: "password is required" })}
          placeholder="password"
        />
        <span>{errors.password?.message as string}</span>
        <input
          {...register("passwordConfirm", {
            required: "password confimation is required",
          })}
          placeholder="passwordConfirm"
        />
        <span>{errors.passwordConfirm?.message as string}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
