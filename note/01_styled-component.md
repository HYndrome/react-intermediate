설치

```
npm i styled-components
```

### tip: vscode-styled-components

vscode extension인 vscode-styled-components를 받으면 자동 완성 및 텍스트 색상 조절이 됨

## without styled components

```js
function App() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ backgroundColor: "teal", width: 100, height: 100 }}></div>
      <div style={{ backgroundColor: "tomato", width: 100, height: 100 }}></div>
    </div>
  );
}

export default App;
```

## with styled components

styled 뒤에 속성 값은 back tick 안에 입력
back tick 안에 들어간 내용은 일반 css로 작성
실제 페이지에 가면 임의의 class 이름이 부여된 것을 확인할 수 있음

```js
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Father>
      <BoxOne />
      <BoxTwo />
    </Father>
  );
}

export default App;
```

problem: 중복되는 부분을 어떻게 효율적으로 작성할 수 있을까?

component에 props 받게 하기

```js
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal" />
      <Box bgColor="tomato" />
    </Father>
  );
}

export default App;
```

component 상속할 수 있게하기
기존

```js
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
  border-radius: 9999px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
    </Father>
  );
}

export default App;
```

상속 후

```js
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 9999px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal" />
      <Circle bgColor="tomato" />
    </Father>
  );
}

export default App;
```

## As

기존에 만든 컴포넌트를 html tag를 변경하여 사용하고 싶을 경우

```js
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

function App() {
  return (
    <Father>
      <Btn>Log-in</Btn>
      <Btn as="a">Log-in</Btn>
    </Father>
  );
}

export default App;
```

## Attrs

attrs를 사용하여 각 컴포넌트에 속성 부여 가능

```js
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;

function App() {
  return (
    <Father>
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
```

## 애니메이션 적용

```js
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimaiton = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(720deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: salmon;
  animation: ${rotationAnimaiton} 1s linear infinite;
`;

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default App;
```

styled 컴포넌트 안에서 일반 html 태그를 선택할 수 있음
styled 컴포넌트 안의 hmtl 태그 내에서 Pseudo selector를 선택할 수 있음

```js
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: salmon;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 36px;
    &:hover {
      font-size: 72px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>🤪</span>
      </Box>
    </Wrapper>
  );
}

export default App;
```

styled component 선택하는 방법
장점: 기존에는 span이 다른 태그로 변경하면 영향을 받지 않지만 Emoji styled 컴포넌트로 존재하는 한, html 태그가 다른 것으로 변경되어도 영향 x

```js
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimaiton = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: salmon;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimaiton} 1s linear infinite;
  ${Emoji} {
    &:hover {
      font-size: 72px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>🤪</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
```

## theme

기본적으로 모든 색상을 가지고 있는 object
나중에 local Estate Management를 배우면 다크모드 가능
App을 ThemeProvider로 감싸줌
theme간의 property 이름은 같아야함

```js
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>
);
```

아래와 같은 방법으로 ThemeProvider에 접근할 수 있음

````js
// App.js
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Title</Title>
    </Wrapper>
  );
}

export default App;```
````
