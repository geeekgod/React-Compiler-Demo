import ReactOptimizedComponent from "./components/optimized/App";
import UnoptimizedComponent from "./components/unoptimized-component";
import ReactUnOptimizedComponent from "./components/unoptimized/App";

const App = () => {
  // ----------------------------------------------
  // Just one component can be tested at a time
  return <UnoptimizedComponent />;
  // ----------------------------------------------
  // Multiple components can be tested here
  // return <ReactUnOptimizedComponent />;
  // return <ReactOptimizedComponent />;
};

export default App;
