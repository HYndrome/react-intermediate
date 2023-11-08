import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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

interface IPriceErr {
  error: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IPriceHis[] | IPriceErr>(
    ["priceHis", coinId],
    () => fetchCoinHistory(coinId)
  );
  // data가 없을 경우 배열이 아닌 object를 반환함
  const isErr = !Array.isArray(data);
  return (
    <div>
      {isLoading ? (
        "Loading Chart"
      ) : isErr ? (
        "No price historical data"
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
            theme: {
              mode: isDark ? "dark" : "light",
            },
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
            colors: ["#ff4757"],
            xaxis: {
              type: "datetime",
              floating: true,
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            yaxis: {
              labels: {
                formatter(val, opts) {
                  return val.toFixed(4);
                },
              },
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(4)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
