import EstimationForm from "./EstimationForm";
import "./index.css";

export function App() {
  return (
    <div className="bg-slate-300 h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <EstimationForm />
      </div>
    </div>
  );
}

export default App;
