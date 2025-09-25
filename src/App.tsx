import EstimationForm from "./EstimationForm";
import "./index.css";
import Alert from "./shared/components/Alert";

export function App() {
  return (
    <div className="bg-slate-300 dark:bg-slate-800 h-screen w-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <EstimationForm />
      </div>
      <Alert type="info" message="This is an info alert" />
    </div>
  );
}

export default App;
