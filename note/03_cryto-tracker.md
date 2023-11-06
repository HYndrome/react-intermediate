# React query

```
npm i react-router-dom@5.3.0
```

```
npm i react-query
```

/ -> All Coins
/:id -> btc -> Coin Detail
/btc/information
/btc/chart

```
npm i --save-dev @types/react-router-dom
```

타입스크립트가 "react-router-dom"를 제대로 인식 못함
아래로 진행하니 인식했음

```
npm i --save-dev @types/react-router-dom --save --legacy-peer-deps
```

# Style

## reset css

1. [홈페이지 css 적용](https://meyerweb.com/eric/tools/css/reset/index.html)
2. [styled-reset 적용](https://www.npmjs.com/package/styled-reset)
3. styled-component로 전체에 css 적용하는 방법?

### createGlobalStyle

"styled-components"의 createGlobalStyle은 전체 문서에 스타일을 적용할 수 있도록 해준다

### Fragment

<></>로 리턴할 때 가상의 묶음을 만들 수 있음

<div> 로 묶을 경우 쓸모없는 div가 너무 생성되게 됨

```tsx
import { createGlobalStyle } from "styled-components";
import Router from "./Router";

const GlobalStyle = createGlobalStyle`
  body {
    color:red;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
```

```tsx
import { createGlobalStyle } from "styled-components";
import Router from "./Router";

const GlobalStyle = createGlobalStyle`
  /* font */
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;600&display=swap');
  /* box-sizing border-box */
  * {
    box-sizing: border-box
  }
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* font */
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  /* anchor(link) without underline */
  a {
    text-decoration: none;
  }


`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
```

## theme 적용

styled.d.ts

```ts
// styled.d.ts
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
  }
}
```

theme.ts

```ts
// theme.ts
import { DefaultTheme } from "styled-components/dist/types";

export const lightTheme: DefaultTheme = {
  bgColor: "#dfe4ea",
  textColor: "#2f3542",
  accentColor: "#ff4757",
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
  accentColor: "black",
};
```

index.tsx

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

theme 적용

```tsx
// App.tsx
const GlobalStyle = createGlobalStyle`
  /* theme */
  body {
    background-color:${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor}
  }
```

## css

적용 예시

```tsx
// Coins.tsx
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.15s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
];

function Coins() {
  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
}

export default Coins;
```

# fetch data

데이터를 가지고 올때에도 TS한테 어떤 형태의 (interface) 데이터인지 알려줘야함

coin의 interface 지정

```tsx
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
```

useState에서 coin의 interface지정

```ts
function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([])
  return ...
}
```

아래 같이 작성할 경우, 짧게 함수 호출 바로 가능
slice를 사용하여 0번째부터 99번째까지 리스트 자름

```tsx
const [coins, setCoins] = useState<CoinInterface[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  (async () => {
    const response = await fetch("https://api.coinpaprika.com/v1/coins");
    const json = await response.json();
    setCoins(json.slice(0, 100));
    setLoading(false);
  })();
}, []);
```

최종코드

```tsx
// Coins.tsx
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.15s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
```

### 화폐 아이콘 넣기

[Crypto Icon API](https://coinicons-api.vercel.app/)

# Route State

이전 페이지에 있던 데이터를 들고 올 수 있음

```tsx
// Coins.tsx
<Link
  to={{
    pathname: `/${coin.id}`,
    state: { name: coin.name },
  }}
>
  {coin.name} &rarr;
</Link>
```

state안에 object 형태로 있는 것을 확인 가능

```tsx
// Coin.tsx
const location = useLocation();
console.log(location);
// {pathname: '/btc-bitcoin', search: '', hash: '', state: {…}, key: 'qpimth'}
// hash: ""
// key: "qpimth"
// pathname: "/btc-bitcoin"
// search: ""
// state: {name: 'Bitcoin'}
// [[Prototype]]: Object
```

시크릿모드에서 이전 데이터가 없는 상태로 페이지가 render될 경우 location 정보가 없음
해당 경우도 생각해야 함

```tsx
interface RouteState {
  name: string;
}

function Coin() {
  const { state } = useLocation<RouteState>();

  return <Title>{state?.name || "Loading"}</Title>;
}
```

# 상세 페이지 정보

코인 정보
https://api.coinpaprika.com/v1/coins/btc-bitcoin
코인 가격 변동 정보
https://api.coinpaprika.com/v1/tickers/btc-bitcoin

console.log한 데이터를 우클릭
store object as global variable

```
Object.keys(temp1).join()
```

```
Object.values(temp1).map(v => typeof v).join()
```

ctrl + d와 alt + shift를 활용해서 적절히 복붙

최종코드

```tsx
// Coin.tsx
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

// interface ITag {
//   id: string;
//   name: string;
//   coin_counter: number;
//   ico_counter: number;
// }

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  // tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
```

## nested router

return문 안의 router로 특정 주소가 입력될 경우에 rendering 될 수 있도록 할 수 있음

```tsx
function Coin() {
  return (
    <Container>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview />
          <Switch>
            <Route path="/btc-bitcoin/price">
              <Price />
            </Route>
            <Route path="/btc-bitcoin/chart">
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
```

### useRouteMatch

특정한 url 안에 있는지 알려줌

```tsx
const priceMatch = useRouteMatch("/:coinId/price");
console.log(priceMatch);
// 해당 url에 들어갈 경우 object 반환, 아닐 경우 null 반환
```

# react-query

react-query는 useEffect, fetch문을 쉽게 대체할 수 있도록 해준다

[react-query 홈페이지](https://tanstack.com/query/latest/docs/react/overview)
아래 커맨드로 설치한 것 같은데 확실하지 않음

```
npm i @tanstack/react-query --save --legacy-peer-deps
```

index.tsx에 provider 적용 (사용하기 위한 설치 과정 같은 거라고 생각하면 됨)

```tsx
// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
```

## fetcher 함수 만들기

기존 fetch한 내용을 분리하여 ts파일에서 함수로 만들어준다

```ts
// api.ts
export async function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
// export async function fetchCoins() {
//   const response = await fetch("https://api.coinpaprika.com/v1/coins");
//   const json = await response.json();
//   return json;
// }
```

기존 구문을 대체하고 useQuery로 대체한다
로딩의 boolean 여부는 isLoading에,
fetch된 데이터 정보는 data에 저장됨

```tsx
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    ...
  )
}
```

react query는 캐시에 데이터를 저장하기 때문에 다시 화면에 돌아와도 loading이 일어남

## coin 에도 적용

```tsx
// Coin.tsx
import {
  useLocation,
  useParams,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.div`
  margin: 20px 0px;
  padding: 10px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  background-color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px 0px;
  border-radius: 10px;
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

// interface ITag {
//   id: string;
//   name: string;
//   coin_counter: number;
//   ico_counter: number;
// }

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  // tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData>(
    ["ticker", coinId],
    () => fetchCoinTickers(coinId)
  );
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // console.log(priceMatch);
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     console.log(priceData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, []);

  const loading = infoLoading || tickerLoading;
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>rank</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>symbol</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>open source</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>total supply</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>max supply</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
```

## react query devtool

아래 명령어로 설치

```
npm i @tanstack/react-query-devtools --save --legacy-peer-deps
```

아래 방법으로 적용

```tsx
// App.tsx
import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
```

devtool은 cache에 저장된 데이터를 보여줌

# price chart

## 특정 코인 이름 값 가져오는 방법1 - useParams

```tsx
// Chart.tsx
import { useParams } from "react-router-dom";

function Chart() {
  const params = useParams();
  console.log(params);
  return <h1>Chart</h1>;
}

export default Chart;
```

## 특정 코인 이름 값 가져오는 방법2 - prop으로 받기

```tsx
// Coin.tsx
<Chart coinId={coinId} />
```

```tsx
// Chart.tsx
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  console.log(coinId);
  return <h1>Chart</h1>;
}

export default Chart;
```

## chart 그리기

[ApexChart](https://apexcharts.com/)

```
npm install --save react-apexcharts apexcharts --legacy-peer-deps
```

차트 적용

```tsx
// Chart.tsx
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  return (
    <div>
      <ApexChart
        type="line"
        series={[
          { name: "potato", data: [1, 2, 3, 4, 5, 6] },
          { name: "tomato", data: [12, 5, 3, 23, 16, 17] },
        ]}
        options={{ chart: { height: 500, width: 500 } }}
      />
    </div>
  );
}

export default Chart;
```

데이터로 차트 그리기

```tsx
// Chart.tsx
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IPriceHis {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IPriceHis[]>(["priceHis", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart"
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: `${coinId}`,
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: {
              show: true,
              borderColor: "#90A4AE",
            },
            stroke: { curve: "smooth", width: 2, colors: ["#ff4757"] },
            xaxis: { floating: true },
            yaxis: {
              labels: {
                formatter(val, opts) {
                  return val.toFixed(4);
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
```

# React query에서 fetch 주기적으로 하기
useQuery에서 refetchInterval를 설정해준다
```tsx
const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
  ["info", coinId],
  () => fetchCoinInfo(coinId),
  { refetchInterval: 5000 }
);
```

# react-helmet
문서의 head를 변경할 수 있음
```
npm i react-helmet --save --legacy-peer-deps
npm i --save-dev @types/react-helmet
```
적용
```tsx
import React from "react";
import {Helmet} from "react-helmet";
 
class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            ...
        </div>
    );
  }
};
```