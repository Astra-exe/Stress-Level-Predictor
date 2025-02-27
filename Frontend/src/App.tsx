import { useState } from "react";
import Hero from "./components/Hero";
import Predictor from "./components/Predictor";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Results from "./components/Results";
import "./App.css";

// Status App => 'init', 'loading', 'results'
type ResultsData = {
  stressLevel: null | number;
  recommendations: null | string;
};

function App() {
  const [statusApp, setStatusApp] = useState("init");
  const [resultsData, setResultsData] = useState<ResultsData>({
    stressLevel: null,
    recommendations: null,
  });

  const changeStatusApp = (status: string) => {
    setStatusApp(status);
  };

  return (
    <>
      <div className="min-w-xs max-w-[2240px] min-h-dvw w-full bg-white mx-auto">
        <Hero />
        <div className="relative">
          {statusApp === "init" && (
            <Predictor
              nextStatus={changeStatusApp}
              setResultsData={setResultsData}
            />
          )}
          {statusApp === "loading" && <Loader nextStatus={changeStatusApp} />}
          {statusApp === "results" && <Results resultsData={resultsData} />}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
