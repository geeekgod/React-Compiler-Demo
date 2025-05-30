import { useState, useMemo } from "react";

const doExpensiveCalculation = (shouldPerform?: boolean) => {
  if (!shouldPerform) return 0;
  console.log("Calculating in unoptimized component...");
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  return sum;
};

const UnoptimizedComponent = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [shouldCalculate, setShouldCalculate] = useState(true);

  const expensiveCalculation = doExpensiveCalculation(shouldCalculate);
  // const expensiveCalculation = useMemo(() => doExpensiveCalculation(shouldCalculate), [shouldCalculate]);
  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-md border border-white/10 flex flex-col gap-4 w-full max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center text-white">
        Unoptimized Calculation: {expensiveCalculation}
      </h1>
      <button
        className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600 border border-white/20 w-full"
        onClick={() => setCount(count + 1)}
      >
        Increment Count ({count})
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something"
        className="w-full p-2 border border-white/20 bg-neutral-700 rounded text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
      <div className="flex items-center justify-between">
        <label htmlFor="shouldCalculateToggle" className="text-neutral-300">
          Perform Expensive Calculation:
        </label>
        <button
          id="shouldCalculateToggle"
          onClick={() => setShouldCalculate(!shouldCalculate)}
          className={`px-4 py-2 rounded border border-white/20 w-28 ${
            shouldCalculate
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } text-white`}
        >
          {shouldCalculate ? "Yes" : "No"}
        </button>
      </div>
      <div>
        <h2 className="text-lg text-neutral-300">
          Input: <span className="font-mono text-white">{input}</span>
        </h2>
      </div>
    </div>
  );
};

export default UnoptimizedComponent;
