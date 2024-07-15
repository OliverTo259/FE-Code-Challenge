import React, { useState } from "react";
import { Form, Input, Select, Typography, Divider, Space } from "antd";
import logoBLUR from "../assets/tokens/BLUR.svg";
import logobNEO from "../assets/tokens/bNEO.svg";
import logoBUSD from "../assets/tokens/BUSD.svg";
import logoUSD from "../assets/tokens/USD.svg";
import logoETH from "../assets/tokens/ETH.svg";
import logoLUNA from "../assets/tokens/LUNA.svg";
import logoSTRD from "../assets/tokens/STRD.svg";
import logoEVMOS from "../assets/tokens/EVMOS.svg";
import logoIBCX from "../assets/tokens/IBCX.svg";
import logoIRIS from "../assets/tokens/IRIS.svg";
import logoampLUNA from "../assets/tokens/ampLUNA.svg";
import logoKUJI from "../assets/tokens/KUJI.svg";
import logoUSDC from "../assets/tokens/USDC.svg";
import logoaxlUSDC from "../assets/tokens/axlUSDC.svg";
import logoATOM from "../assets/tokens/ATOM.svg";
import logoOSMO from "../assets/tokens/OSMO.svg";
import logorSWTH from "../assets/tokens/rSWTH.svg";
import logoLSI from "../assets/tokens/LSI.svg";
import logoOKB from "../assets/tokens/OKB.svg";
import logoOKT from "../assets/tokens/OKT.svg";
import logoSWTH from "../assets/tokens/SWTH.svg";
import logoUSC from "../assets/tokens/USC.svg";
import logoWBTC from "../assets/tokens/WBTC.svg";
import logowstETH from "../assets/tokens/wstETH.svg";
import logoYieldUSD from "../assets/tokens/YieldUSD.svg";
import logoZIL from "../assets/tokens/ZIL.svg";

const { Option } = Select;

const logos = {
  BLUR: logoBLUR,
  bNEO: logobNEO,
  BUSD: logoBUSD,
  USD: logoUSD,
  ETH: logoETH,
  LUNA: logoLUNA,
  STRD: logoSTRD,
  EVMOS: logoEVMOS,
  IBCX: logoIBCX,
  IRIS: logoIRIS,
  ampLUNA: logoampLUNA,
  KUJI: logoKUJI,
  USDC: logoUSDC,
  axlUSDC: logoaxlUSDC,
  ATOM: logoATOM,
  OSMO: logoOSMO,
  rSWTH: logorSWTH,
  LSI: logoLSI,
  OKB: logoOKB,
  OKT: logoOKT,
  SWTH: logoSWTH,
  USC: logoUSC,
  WBTC: logoWBTC,
  wstETH: logowstETH,
  YieldUSD: logoYieldUSD,
  ZIL: logoZIL,
};

const ItemExchange = ({ label, name, disabled, currency, setCurrency }) => {
  const [currencyList, setCurrencyList] = useState([
    { name: "BLUR" },
    { name: "bNEO" },
    { name: "BUSD" },
    { name: "USD" },
    { name: "ETH" },
    { name: "LUNA" },
    { name: "STRD" },
    { name: "EVMOS" },
    { name: "IBCX" },
    { name: "IRIS" },
    { name: "ampLUNA" },
    { name: "KUJI" },
    { name: "USDC" },
    { name: "axlUSDC" },
    { name: "ATOM" },
    { name: "OSMO" },
    { name: "rSWTH" },
    { name: "LSI" },
    { name: "OKB" },
    { name: "OKT" },
    { name: "SWTH" },
    { name: "USC" },
    { name: "WBTC" },
    { name: "wstETH" },
    { name: "YieldUSD" },
    { name: "ZIL" },
  ]);
 
  return (
    <div className="item-exchange">
      <Form.Item
        name={name}
        rules={
          !disabled
            ? [
                {
                  required: true,
                  message: "Please input your amount of token",
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }
                    return value > 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("The input should be greater than 0")
                        );
                  },
                }),
              ]
            : []
        }
      >
        <Input
          style={{ width: 450, height: 80 }}
          type="number"
          disabled={disabled}
        />
      </Form.Item>
      <Typography className="label-exchange">{label}</Typography>
      <Select
        value={currency}
        style={{ maxWidth: 150, margin: "0 8px" }}
        className="select-exchange"
        onChange={setCurrency}
      >
        {currencyList.map(({ name }, index) => (
          <Option value={name} key={index}>
            <img
              src={logos[name]}
              alt={name}
              style={{ width: 20, height: 20, marginRight: 8 }}
            />
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ItemExchange;
