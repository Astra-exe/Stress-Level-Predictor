import YingYang from "./Icons/YingYang";
import Relax from "./Icons/Relax";

export default function Hero() {
  return (
    <div className="bg-white">
      <main className="flex">
        <div className="px-20 px-auto w-3/5 flex flex-col justify-center">
          <h1 className="text-6xl max-w-2xl leading-16 tracking-wider font-semibold">
            <strong className="text-primary">Estimador</strong> de Nivel de{" "}
            <strong className="text-primary">Estrés</strong>
          </h1>
          <div className="mt-10 mb-16 flex gap-x-5">
            <a
              href="#"
              className="inline-flex justify-center items-center px-4.5 py-2 text-gray-900 rounded-2xl border font-bold border-gray-900 hover:bg-primary  transition-colors"
            >
              Empezar
            </a>
            <a
              href="#"
              className="inline-flex justify-center items-center px-4.5 py-2 font-semibold text-gray-900 hover:underline decoration-primary transition-all underline-offset-3"
            >
              Saber más
            </a>
          </div>
          <p className="text-xl max-w-xl leading-8">
            El estrés afecta tu salud y emociones. Conocelo de cerca a través de
            un análisis único respaldado por machine learning y da el primer
            paso para manejarlo
          </p>
        </div>
        <div className="px-20 py-10 w-2/5 bg-background">
          <div className="relative flex justify-center">
            <span className="inline-block absolute top-0 left-16 z-20">
              <YingYang />
            </span>
            <picture className="block max-w-[320px] relative z-10">
              <img
                src="./src/assets/hero-stress.png"
                alt="Chica estresada"
                className="w-full h-full object-cover"
              />
            </picture>
            <picture className="block max-w-[320px] absolute top-8 z-0 blur-xl">
              <img
                src="./src/assets/hero-stress.png"
                alt="Chica estresada"
                className="w-full h-full object-cover"
              />
            </picture>
            <span className="inline-block absolute bottom-0 right-0 z-20">
              <Relax />
            </span>
          </div>
          <div className="mt-10">
            <ul className=" grid grid-cols-9 grid-rows-6 font-semibold">
              <li className="col-span-3 row-span-2 self-center py-2 px-3 text-lg flex justify-center border-2 rounded-[50%]">
                Relajate
              </li>
              <li className="col-span-3 row-span-2 self-center row-start-2 col-start-7 py-2 px-3 text-lg flex justify-center border-2 rounded-[50%]">
                Medita
              </li>
              <li className="col-span-3 row-span-2 self-center row-start-4 col-start-4 py-2 px-3 text-lg flex justify-center border-2 rounded-[50%]">
                Respira
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
