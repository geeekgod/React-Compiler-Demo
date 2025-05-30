import { useState, useMemo, useCallback } from "react";

const ExpensiveComponent = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#ffffff");

  // Memoize the expensive calculation
  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }, []); // Empty dependency array since calculation doesn't depend on any props/state

  // Memoize event handlers
  const handleCountIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: color }}>
      <h1>Expensive Calculation: {expensiveCalculation}</h1>
      <button onClick={handleCountIncrement}>
        Increment Count ({count})
      </button>
      <div style={{ margin: "20px 0" }}>
        <label htmlFor="colorpicker-expensive">Choose background color: </label>
        <input
          id="colorpicker-expensive"
          type="color"
          value={color}
          onChange={handleColorChange}
        />
        <span style={{ marginLeft: "10px" }}>{color}</span>
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type something"
      />
      <div style={{ marginTop: "20px" }}>
        <h2>Input: {input}</h2>
      </div>
    </div>
  );
};

export default ExpensiveComponent;
