# State Management

## Why do we need state management?

테마 변경을 하기 위해서 index.tsx에 있던 ThemeProvider를 하위 경로인 App.tsx로 이동시킴

## global state

내 app이 특정 value에 접근해야할 때
기존은 상속 받는 위치에 따라서 처리가 귀찮음
특히 로그인 처리

예시 coin에 있는 chart 컴포넌트에 App의 변수인 isDark 값을 전달하고 싶을 때
App -> Router -> Coin -> Chart

## Recoil

[recoil 공식문서](https://recoiljs.org/ko/) ###설치

```
npm install recoil
```

### index.tsx에서 `<RecoilRoot>`로 감싸기

### atom 생성

atoms.ts 파일 생성한 후 `atom`을 사용하여 적용

```ts
import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
```

App.tsx에서 `useRecoilValue`를 사용하여 적용

```ts
function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}
```

### atom의 value 변경하기

`useSetRecoilState`를 사용하여 함수 지정
해당 함수를 변경할 값과 함께 호출

```ts
function Coins({}: ICoinsProps) {
  const setterFn = useSetRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <button onClick={() => setterFn((prev) =>!prev)}>Toggle Mode</button>
      </Header>
```

좀 더 깔끔한 정리

```ts
function Coins({}: ICoinsProps) {
  const setIsDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleIsDarkAtom = () => setIsDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
```
