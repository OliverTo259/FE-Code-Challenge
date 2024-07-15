## Instruction for problem 1:
Make sure you already installed `NodeJS` in your local machine
```
cd problem1
node sum.js
```

## Instruction for problem 2:
You could run the project from root folder by running following commands
```
cd problem2
npm install
npm run dev
```

## Explanation for problem 3:
1. Datasource Class Implementation:
    - Added `Datasource` class with `getPrices` method to fetch prices from the specified URL.
2. Error Handling:
    - Improved error handling in `useEffect` for fetching prices, ensuring errors are logged correctly (console.error).
3. Sorting and Filtering:
    - Corrected the sorting and filtering logic based on blockchain priorities (`getPriority` function). This ensures balances are sorted correctly by their blockchain priority.
4. Memoization:
    - Ensured proper dependency (prices) for `sortedBalances` `useMemo` hook. This avoids unnecessary recalculations when prices change.
5. Type Definitions:
    - Used consistent type definitions (`WalletBalance`, `FormattedWalletBalance`) throughout the component. This improves type safety and clarity.
