import React, { useState } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import ItemExchange from "./components/ItemExchange";
import { SyncOutlined } from "@ant-design/icons";
import exchangeRates from "./exchangeRates.json";

const Context = React.createContext({ name: "Default" });

function App() {
  const [form] = Form.useForm();
  const [inputCurrency, setInputCurrency] = useState("bNEO");
  const [outputCurrency, setOutputCurrency] = useState("BLUR");

  const [api, contextHolder] = notification.useNotification();

  const onFinish = () => {
    const inputCurrencyRate =
      exchangeRates.find((rate) => rate.currency === inputCurrency)?.price || 1;
    const outputCurrencyRate =
      exchangeRates.find((rate) => rate.currency === outputCurrency)?.price ||
      1;

    const inputAmount = parseFloat(form.getFieldValue("inputTokenAmount"));
    const outputAmount =
      inputAmount * (1 / inputCurrencyRate) * outputCurrencyRate;

    form.setFieldValue("outputTokenAmount", outputAmount);
    api.success({
      message: `Swap successfully`,
      placement: "topRight",
    });
  };

  const onSwapToken = () => {
    const currentInputAmount = form.getFieldValue("inputTokenAmount");
    const currentInputCurrency = inputCurrency;
    setInputCurrency(outputCurrency);
    setOutputCurrency(currentInputCurrency);
    form.setFieldValue(
      "inputTokenAmount",
      form.getFieldValue("outputTokenAmount")
    );
    form.setFieldValue("outputTokenAmount", currentInputAmount);
  };

  return (
    <Context.Provider>
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item>
          <ItemExchange
            currency={inputCurrency}
            setCurrency={setInputCurrency}
            name="inputTokenAmount"
            label="Input"
          />
        </Form.Item>
        <div className="swap-currency" onClick={onSwapToken}>
          <SyncOutlined style={{ fontSize: "200%" }} />
        </div>
        <Form.Item>
          <ItemExchange
            currency={outputCurrency}
            setCurrency={setOutputCurrency}
            disabled={true}
            name="outputTokenAmount"
            label="Output"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: 450 }}
            danger
          >
            Exchange
          </Button>
        </Form.Item>
      </Form>
    </Context.Provider>
  );
}

export default App;
