import React, { useState, useEffect, useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

class Datasource {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getPrices(): Promise<{ [key: string]: number }> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching prices:', error);
      throw error;
    }
  }
}

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ amount, usdValue, formattedAmount }) => (
  <div>
    <p>Amount: {formattedAmount}</p>
    <p>USD Value: ${usdValue.toFixed(2)}</p>
  </div>
);

interface WalletPageProps {
  // Define any necessary props here
}

const WalletPage: React.FC<WalletPageProps> = (props) => {
  const { ...rest } = props;
  const balances: WalletBalance[] = useWalletBalances(); // Assuming useWalletBalances is correctly implemented
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo': // Combined cases with same priority
        return 20;
      default:
        return -99;
    }
  }

  const sortedBalances = useMemo(() => {
    return balances
      .filter(balance => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((lhs, rhs) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // Descending order by priority
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map(balance => ({
    ...balance,
    formatted: balance.amount.toFixed()
  }));

  const rows = formattedBalances.map((balance, index) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

export default WalletPage;
