import YingYang from "./Icons/YingYang";
import Relax from "./Icons/Relax";

export default function Hero() {
  return (
    <div className="bg-white">
      <main className="flex flex-col pt-10 md:pt-0 gap-y-12 md:flex-row">
        {/* Hero Info */}
        <div className="relative px-10 sm:px-12 md:px-20  md:w-3/5 flex flex-col justify-center">
          <div className="blob absolute top-10 md:left-1/4 w-20 md:w-24 lg:w-32 h-20 md:h-24 lg:h-32 bg-primary mix-blend-multiply blur-xl opacity-65 rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] animate-blob"></div>
          <h1 className="max-w-2xl relative z-10 text-4xl text-center xs:text-5xl md:text-6xl md:leading-16 xs:tracking-wide xs:leading-14 md:tracking-wider md:text-left font-semibold">
            <strong className="text-primary">Estimador</strong> de Nivel de{" "}
            <strong className="text-primary">Estrés</strong>
          </h1>
          <div className="relative z-10 mt-10 mb-16 flex justify-center md:justify-start gap-x-5">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <a
                href="#app"
                className="relative inline-flex justify-center items-center px-4.5 py-2 text-sm xs:text-base text-gray-900 bg-white rounded-2xl border font-bold hover:bg-primary  transition-colors divide-x divide-gray-600"
              >
                Empezar
              </a>
            </div>
            <a
              href="https://medium.com/@juan.ramirez.j99/mindfulness-y-machine-learning-72fc42ea86c5"
              rel="noopener"
              target="_blank"
              className="inline-flex justify-center items-center px-4.5 py-2 text-sm xs:text-base font-semibold text-gray-900 hover:underline decoration-primary transition-all underline-offset-3"
            >
              Saber más
            </a>
          </div>
          <p className="relative z-10 md:max-w-xl leading-6 text-center xs:text-lg xs:leading-8 md:text-left md:text-xl">
            El estrés afecta tu salud y emociones. Conocelo de cerca a través de
            un análisis único respaldado por machine learning y da el primer
            paso para manejarlo
          </p>
        </div>
        {/* Hero image */}
        <div className="grid-background relative px-20 py-10 md:w-2/5 bg-background">
          <div className="flex justify-center">
            <span className="inline-block absolute top-5 left-8 xs:left-16 md:left-10 z-20">
              <YingYang className="w-16 h-16 md:w-18 md:h-18 lg:w-24 lg:h-24" />
            </span>
            <picture className="block max-w-[260px] md:max-w-[320px] relative z-10">
              <img
                src="./src/assets/hero-stress.webp"
                alt="Chica estresada"
                className="w-full h-full object-cover"
              />
            </picture>
            <picture className="block max-w-[260px] md:max-w-[320px] absolute top-8 z-0 blur-xl">
              <img
                src="./src/assets/hero-stress.png"
                alt="Chica estresada"
                className="w-full h-full object-cover"
              />
            </picture>
            <span className="inline-block absolute bottom-5 right-8 z-20">
              <Relax />
            </span>
          </div>
          <div className="mt-10">
            <ul className=" grid grid-cols-9 grid-rows-6 font-semibold">
              <li className="col-span-3 row-span-2 self-center py-2 px-3 md:py-3 md:px-4 text-base xs:text-lg md:text-base lg:text-lg flex justify-center border-2 rounded-[50%]">
                Relajate
              </li>
              <li className="col-span-3 row-span-2 self-center row-start-2 col-start-7 py-2 px-3 md:py-3 md:px-4 text-base xs:text-lg md:text-base lg:text-lg flex justify-center border-2 rounded-[50%]">
                Medita
              </li>
              <li className="col-span-3 row-span-2 self-center row-start-4 col-start-4 py-2 px-3 md:py-3 md:px-4 text-base xs:text-lg md:text-base lg:text-lg flex justify-center border-2 rounded-[50%]">
                Respira
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
