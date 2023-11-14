# 새로 프로젝트 시작하기

```
npx create-react-app myApp --template typescript
cd myApp
npm i --save-dev @types/styled-components
npm i styled-components
npm i recoil
```

index에 recoil root랑 theme provider 적용
app에 global style 적용

# React hook form

기존의 form 작성

```ts
import { useState } from "react";

function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      </form>
    </div>
  );
}

export default ToDoList;
```

기존 validation을 어떻게 처리

```ts
import { useState } from "react";

function ToDoList() {
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
}

export default ToDoList;
```

[react hook form docs](https://www.react-hook-form.com/)

react-hook-form 설치

```
npm install react-hook-form
```

useForm import 해줘야 함

```ts
import { useForm } from "react-hook-form";
```

register을 사용하면 onChange 이벤트 핸들러가 필요 없게됨
onChange에 적용되는 props도 필요 없게됨
props를 변경하는 useState도 필요 없게됨
`{...register("toDo")}` register가 반환하는 객체를 props들로 전달
watch는 register한 값을 가져옴
handleSubmit은 validation을 담당함
preventDefault 포함

이런 식으로 여러개의 input을 효율적으로 관리할 수 있음

```ts
function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  /* 
  {
    "name": "hongyeop",
    "email": "hyndrome@naver.com",
    "username": "hyndrome",
    "password": "1234",
    "passwordConfirmation": "1234"
  } */
  return (
    <div>
      <form>
        <input {...register("name")} placeholder="name" />
        <input {...register("email")} placeholder="email" />
        <input {...register("username")} placeholder="username" />
        <input {...register("password")} placeholder="password" />
        <input {...register("passwordConfirm")} placeholder="passwordConfirm" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
```

required를 사용하여 js에서 validation을 할 수 있음
required에 해당하지 않은 빈 input이 있을 경우 그 곳으로 커서를 옮겨주는 추가 기능까지!

```ts
import { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, watch, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
    /* submit 했을 때의 정보가 담김
    {
      "name": "hongyeop",
      "email": "hyndrome@naver.com",
      "username": "hyndrome",
      "password": "1234",
      "passwordConfirmation": "1234"
    } */
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("name", { required: true })} placeholder="name" />
        <input {...register("email", { required: true })} placeholder="email" />
        <input
          {...register("username", { required: true })}
          placeholder="username"
        />
        <input
          {...register("password", { required: true })}
          placeholder="password"
        />
        <input
          {...register("passwordConfirm", { required: true })}
          placeholder="passwordConfirm"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
```

에러가 발생할 경우 (validation fail) 해당하는 error의 message를 return할 수 있음

```ts
import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log("submit success!");
  };
  console.log(formState.errors);
  /*
  passwordConfirm: 
  {type: 'required', message: 'password confimation is required', ref: input}
  username: 
  {type: 'minLength', message: 'username should be longer than 5', ref: input} */
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("name", { required: "name is required" })}
          placeholder="name"
        />
        <input
          {...register("email", { required: "email is required" })}
          placeholder="email"
        />
        <input
          {...register("username", {
            required: "username is required",
            minLength: {
              value: 5,
              message: "username should be longer than 5",
            },
          })}
          placeholder="username"
        />
        <input
          {...register("password", { required: "password is required" })}
          placeholder="password"
        />
        <input
          {...register("passwordConfirm", {
            required: "password confimation is required",
          })}
          placeholder="passwordConfirm"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
```

regEx 적용

```ts
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
```

custom validation 적용

```ts
<input
  {...register("username", {
    required: "username is required",
    validate: {
      noNico: (value) => (value.includes("nico") ? "no nico allowed" : true),
      noNick: (value) => (value.includes("nick") ? "no nick allowed" : true),
    },
    minLength: {
      value: 2,
      message: "username should be longer than 2",
    },
  })}
  placeholder="username"
/>
```

제출 submit 했을 때 validate

```js
const onValid = (data: IForm) => {
  if (data.password !== data.passwordConfirm) {
    setError(
      "passwordConfirm",
      { message: "Password are not matched" },
      { shouldFocus: true }
    );
  }
  setError("extraError", { message: "Server offline." });
};
```
