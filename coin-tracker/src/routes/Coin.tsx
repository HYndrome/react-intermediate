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
import { Helmet } from "react-helmet";

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
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
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
  margin: 20px 20px;
  padding: 10px;
  color: ${(props) => props.theme.desColor};
  border-left: 6px solid ${(props) => props.theme.accentColor};
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
    props.$isActive ? props.theme.accentColor : props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  padding: 10px 0px;
  border-radius: 10px;
  a {
    display: block;
  }
`;

const BackLink = styled.div`
  position: absolute;
  top: 5vh;
  left: 5vh;
  color: ${(props) => props.theme.desColor};
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
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
    () => fetchCoinInfo(coinId),
    { refetchInterval: 500000 }
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
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </title>
        <link
          rel="icon"
          type="image/png"
          href={`https://coinicons-api.vercel.app/api/icon/${tickerData?.symbol.toLowerCase()}`}
          sizes="16x16"
        />
      </Helmet>
      <Header>
        <BackLink>
          <Link to={{ pathname: "/" }}>&larr; Back</Link>
        </BackLink>
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
              <span>Price</span>
              <span>{tickerData?.quotes.USD.price.toFixed(4)}</span>
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
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
