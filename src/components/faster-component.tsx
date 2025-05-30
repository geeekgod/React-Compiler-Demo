import { useState } from "react";

const FasterComponent = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#ffffff");

  // React 19's compiler automatically optimizes this calculation
  const expensiveCalculation = () => {
    console.log("Calculating...");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  };

  return (
    <div style={{ padding: "20px", backgroundColor: color }}>
      <h1>Faster Calculation: {expensiveCalculation()}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment Count ({count})
      </button>
      <div style={{ margin: "20px 0" }}>
        <label htmlFor="colorpicker-faster">Choose background color: </label>
        <input
          id="colorpicker-faster"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <span style={{ marginLeft: "10px" }}>{color}</span>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something"
      />
      <div style={{ marginTop: "20px" }}>
        <h2>Input: {input}</h2>
      </div>
    </div>
  );
};

export default FasterComponent;
