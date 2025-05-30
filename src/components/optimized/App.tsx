import { useState, memo, useCallback, useMemo } from "react";

function ReallySlowComponent({
  someObj, // This prop is not used but is here to demonstrate the memoization
}: {
  someObj?: object;
}) {
  console.log("Rendering ReallySlowComponent", someObj);
  // Simulate a slow component by creating a large array
  const largeArray = Array.from({ length: 100000 }, (_, i) => i);

  return (
    <div className="flex flex-wrap overflow-scroll gap-1">
      {largeArray.map((value) => (
        <div
          key={value}
          className="w-2 h-2 bg-neutral-700"
          style={{
            backgroundColor: `rgb(${value % 255}, ${(value * 2) % 255}, ${
              (value * 3) % 255
            })`,
          }}
        ></div>
      ))}
    </div>
  );
}

const SlowComponent = memo(ReallySlowComponent);

function CounterButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600 border border-white/20 w-full"
    >
      {text}
    </button>
  );
}

const MemoizedCounterButton = memo(CounterButton);

function ColorPicker(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="color"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full h-12 cursor-pointer rounded border border-white/20 bg-neutral-700 p-1"
    />
  );
}

const MemoizedColorPicker = memo(ColorPicker);

function TextEditor({
  text,
  setText,
}: {
  text: string;
  setText: (text: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <input
        className="w-full p-2 border border-white/20 bg-neutral-700 rounded"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
      />

      <div className="mt-2">
        Current value: <br />
        <span className="font-mono">{text}</span>
      </div>
    </div>
  );
}

const MemoizedTextEditor = memo(TextEditor);

function DemoComponent() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#000000");
  const [text, setText] = useState("");

  const incrementCount = useCallback(() => setCount((count) => count + 1), []);
  const decrementCount = useCallback(
    () => setCount((count) => (count === 0 ? 0 : count - 1)),
    []
  );
  const handleColorChange = useCallback((e: string) => setColor(e), []);
  const someObj = useMemo(() => ({ foo: "bar" }), []);

  return (
    <div className={`flex flex-col lg:flex-row gap-8`}>
      <div className="card">
        <h2 className="text-xl font-bold text-center">Color Picker</h2>
        <span className="text-center text-neutral-200 font-light">
          This is just a color picker,
          <br />
          What could be wrong with it?
        </span>
        <MemoizedColorPicker value={color} onChange={handleColorChange} />
        <div className="mt-2">
          Current Color: <br />
          <div
            className="w-full h-10 flex justify-center items-center rounded-lg"
            style={{
              background: color,
            }}
          >
            {color}
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold text-center">Simple Counter</h2>
        <span className="text-center text-neutral-200 font-light">
          This is just a simple counter,
          <br />
          it should'nt be slow right?
        </span>
        <div className="flex gap-2">
          <MemoizedCounterButton text={"+"} onClick={incrementCount} />
          <MemoizedCounterButton text={"-"} onClick={decrementCount} />
        </div>
        <div className="mt-2">
          Current Count: <span className="font-mono">{count}</span>
        </div>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold text-center">
          A REALLY Slow Component
        </h2>
        <span className="text-center text-neutral-200 font-light">
          This component renders 100000 boxes,
          <br /> i.e. 1 Lakh iterations of rendering a box
        </span>
        {/* <SlowComponent someObj={{ foo: "bar" }} /> */}
        <SlowComponent someObj={someObj} />
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-center">Text Editor</h2>
        <span className="text-center text-neutral-200 font-light">
          This component is a simple text editor.
          <br />
          This should be fast right?
        </span>
        <MemoizedTextEditor text={text} setText={setText} />
      </div>
    </div>
  );
}

const DemoComponentMemoized = memo(DemoComponent);

function ParentComponent() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <h1 className="text-2xl font-bold text-center pt-8">
          Magical React Compiler
        </h1>
        <h2 className="text-center text-xl  text-neutral-200 font-light mt-4">
          By{" "}
          <a
            className="text-blue-500 font-bold underline"
            target="_blank"
            href="https://geeekgod.in/"
          >
            GeeekGod
          </a>
        </h2>
        <div className={`flex items-center justify-center flex-grow`}>
          <DemoComponentMemoized />
        </div>
      </div>
    </>
  );
}
export default memo(ParentComponent);
