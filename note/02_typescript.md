[TypeScript](https://www.typescriptlang.org/)
JS를 기반으로 한 프로그래밍 언어
strongly-typed 언어: 프로그래밍 언어가 작동하기 전에 데이터의 type을 확인

JS는 type을 신경 쓰지 않음

```js
const plus = (a, b) => a + b;
plus(2, 2);
// 4
plus(2, "hi");
// '2hi'
```

```js
const user = {
  firstName: "Angela",
  lastName: "Davis",
  role: "Professor",
};
console.log(user.name);
// undefined
```

데이터의 타입을 제어할 수 있을까?에 대한 고민

```ts
const plus = (a: number, b: number) => a + b;
```

# 설치

## 처음부터 typescript 설치하기

[create-react-app](https://create-react-app.dev/docs/adding-typescript/)

```
npx create-react-app my-app --template typescript
```

## 기존 프로젝트에 ts 적용하기

1. 아래 설치

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

2. 확장자 변경
   기존 파일 확장자를 .js -> .tsx (리액트에서 사용할 경우)로 변경
   리액트가 아닐 경우 .js -> .ts

3. tsconfig.json 파일 생성 및 수정

```
npx tsc --init
```

tsconfig.json 파일 수정

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
...
```

4. index.tsx 파일 수정
   TS2345: Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element | DocumentFragment'.
   Type 'null' is not assignable to type 'Element | DocumentFragment'.

```ts
// index.tsx
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
```

여기까지하니까 실행 확인

5. @types/styled-components 설치
   기존 설치 커맨드를 사용하니 npm ERR! code ERESOLVE 오류 발생
   아마 react 버전이 해당 모듈보다 높아서 react를 다운 그레이드 해주는 듯?

```
npm i --save-dev @types/styled-components
```

```
npm i --save-dev @types/styled-components --save --legacy-peer-deps
```

# @types?

[DefinitelyTyped Repository](https://github.com/DefinitelyTyped/DefinitelyTyped)
유명한 npm package들을 typescript가 이해할 수 있도록 TypeSciprt Definition이 있는 repo

# 용어: how to TYPE

component를 type한다 = component에 type을 추가한다 = TS한테 뭐가 뭔지 설명한다

# PropTypes vs TypeScript

PropTypes는 prop이 거기 있는지 없는지 확인해주지만, 코드를 실행한 "후"에 확인 가능
TypeScipts는 코드 실행 "전"에 오류를 확인해줌

interface: object shape를 TS에게 설명해주는 개념

```ts
interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name}! You are ${playerObj.age}`;

sayHello({ name: "홍엽", age: 10 });
```

```ts
// Circle.tsx
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${(props) => props.bgColor};
`;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;
```

```ts
// App.tsx
import styled from "styled-components";
import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle bgColor="teal" />
      <Circle bgColor="tomato" />
    </div>
  );
}

export default App;
```

optional 한 값을 주고 싶을 경우 ?를 사용

```ts
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}
```

default한 값을 주고 싶을 경우 ??를 사용
아래의 경우에 borderColor가 없을 경우 borderColor 값은 bgColor 값 입력

```ts
function Circle({ bgColor, borderColor }: CircleProps) {
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />;
}
```

```ts
// Circle.tsx
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${(props) => props.bgColor};
  border: 5px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default txt" }: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
```

```ts
// App.js
import styled from "styled-components";
import Circle from "./Circle";

function App() {
  return (
    <div>
      <Circle bgColor="teal" borderColor="coral" text="new text" />
      <Circle bgColor="tomato" />
    </div>
  );
}

export default App;
```

# useState

TypeScript는 초기값으로 type을 예측함
필요한 경우 옆에 타입을 명시함으로 여러 type을 사용할 수 있음

```ts
const [counter, setCounter] = useState<number | string>(1);
setCounter("hi");
```

# Form Event

이벤트 타입 명시 방법
어떤 타입을 사용할지는 구글링해서 익숙해지자
event의 target을 currentTarget으로 사용하는 것을 확인할 수 있었다.

```js
import { useState } from "react";
import styled from "styled-components";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`hello ${value}`);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
```

[styled-components x TypeScript](https://styled-components.com/docs/api#typescript)

# theme

1. styled component 확장

```ts
// styled.d.ts
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
  }
}
```

2. theme.ts 생성

```ts
// theme.ts
import { DefaultTheme } from "styled-components/dist/types";

export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
};
```

3. index.tsx에서 theme 적용

```tsx
// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider theme={lightTheme}>
    <App />
  </ThemeProvider>
);
```

4. App 내에서 theme 값 사용

```tsx
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <div>
      <Container>
        <H1>test</H1>
      </Container>
    </div>
  );
}

export default App;
```
