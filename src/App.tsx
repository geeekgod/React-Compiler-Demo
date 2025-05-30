import ReactOptimizedComponent from "./components/optimized/App";
import UnoptimizedComponent from "./components/unoptimized-component";
import ReactUnOptimizedComponent from "./components/unoptimized/App";

const App = () => {
  // return <ReactUnOptimizedComponent />;
  return <ReactOptimizedComponent />;
  // return <UnoptimizedComponent />;
};

export default App;
