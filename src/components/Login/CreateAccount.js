import React from "react";
import { Steps, Button, message, Form, Input } from "antd";
import { render } from "react-dom";
import createClass from "create-react-class";

const { Step } = Steps;

const renderForm = createClass({
  render: () => {
    return <div>hey</div>;
  },
});
export default function CreateAccount() {
  const [current, setCurrent] = React.useState(0);

  const steps = [
    {
      title: "Login",
      content: { renderForm },
    },
    {
      title: "Phone",
      content: "Second-content",
    },
    {
      title: "Location",
      content: "Last-content",
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className="steps-content">{steps[current].content}</div>

      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}
