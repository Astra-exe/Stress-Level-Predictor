import Hero from "./components/Hero";
import Predictor from "./components/Predictor";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <div className="min-w-xs max-w-[2240px] min-h-dvw w-full bg-white mx-auto">
        <Hero />
        <Predictor />
        <Footer />
      </div>
    </>
  );
}

export default App;
