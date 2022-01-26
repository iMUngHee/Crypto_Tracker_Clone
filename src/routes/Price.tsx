import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

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

interface ICoin {
  coinId?: string;
  tickersData: PriceData;
}

const Container = styled.div`
  max-width: 480px;
  height: 300px;
  border-radius: 10px;
  padding: 15px 10px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
`;

const Info = styled.span`
  display: block;
  font-size: 11px;
  font-weight: bold;
  text-align: left;
  white-space: pre;
`;

const Overview = styled.div`
  width: 100%;
  padding: 5px 0 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  border-bottom: 1px solid ${(props) => props.theme.bgColor};
`;

interface IOverviewPrice {
  isUp: boolean;
}

const OverviewPrice = styled.div<IOverviewPrice>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.isUp ? "#0be881" : "#f53b57")};
  transition: color 1s ease 0s;
`;
const OverviewPriceArr = styled.span`
  font-size: 12px;
  white-space: pre;
`;
const OverviewPriceNum = styled.h1`
  font-size: 35px;
  font-weight: 700;
`;
const OverviewPercent = styled.div<IOverviewPrice>`
  display: flex;
  align-items: center;
  padding: 5px 7px;
  background-color: ${(props) => (props.isUp ? "#0be881" : "#f53b57")};
  border-radius: 5px;
  color: white;
  transition: background-color 1s ease 0s;
`;
const OverviewPercentArr = styled.span`
  font-size: 12px;
  white-space: pre;
`;
const OverviewPercentNum = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
const Detail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  `;
const DetailItem = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid ${(props) => props.theme.bgColor};
  &:last-child {
    border-bottom: none;
  }
  span {
    font-size: 15px;
    font-weight: 900;
  }
  p {
    padding: 8px 0 10px 0;
    font-size: 25px;
  }
`;

const Price = () => {
  const { tickersData: data } = useOutletContext<ICoin>();
  const [isUp, setIsUp] = useState(true);
  useEffect(() => {
    if (data.quotes.USD.percent_change_24h >= 0) {
      setIsUp(true);
    } else if (data.quotes.USD.percent_change_24h < 0) {
      setIsUp(false);
    }
  }, [data]);
  return (
    <Container>
      <Info>
        {`${data.name} Price (${
          data.symbol
        }) - Last Updated: ${data.last_updated.slice(0, 10)}`}
      </Info>
      <Overview>
        <OverviewPrice isUp={isUp}>
          <OverviewPriceArr>{isUp ? "▲  " : "▼  "}</OverviewPriceArr>
          <OverviewPriceNum>
            {`$${data.quotes.USD.price
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </OverviewPriceNum>
        </OverviewPrice>
        <OverviewPercent isUp={isUp}>
          <OverviewPercentArr>{isUp ? "▲  " : "▼  "}</OverviewPercentArr>
          <OverviewPercentNum>{`${data.quotes.USD.percent_change_24h} %`}</OverviewPercentNum>
        </OverviewPercent>
      </Overview>
      <Detail>
        <DetailItem>
          <span>Market capitalization:</span>
          <p>
            {`$ ${data.quotes.USD.market_cap
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </p>
        </DetailItem>
        <DetailItem>
          <span>All time high price: </span>
          <p>
            {`$ ${data.quotes.USD.ath_price
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
          </p>
        </DetailItem>
        <DetailItem>
          <span>All time high date:</span>
          <p>{data.quotes.USD.ath_date.slice(0, 10)}</p>
        </DetailItem>
      </Detail>
    </Container>
  );
};

export default Price;
