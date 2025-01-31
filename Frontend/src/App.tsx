import { useState } from "react";
import Hero from "./components/Hero";
import Predictor from "./components/Predictor";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Results from "./components/Results";
import "./App.css";

// Status App => 'init', 'sending', 'results'

function App() {
  const [statusApp, setStatusApp] = useState("init");
  const [resultsData, setResultsData] = useState({
    stressLevel: null,
    stressTip: null,
    sleepTip: null,
    bmiTip: null,
  });

  const changeStatusApp = (status: string) => {
    setStatusApp(status);
  };

  return (
    <>
      <div className="min-w-xs max-w-[2240px] min-h-dvw w-full bg-white mx-auto">
        <Hero />
        {statusApp === "init" && (
          <Predictor
            nextStatus={changeStatusApp}
            setResultsData={setResultsData}
          />
        )}
        {statusApp === "sending" && <Loader />}
        {statusApp === "results" && <Results resultsData={resultsData} />}
        <Footer />
      </div>
    </>
  );
}

export default App;
