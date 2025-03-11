import ReactMarkdown from "react-markdown";
import StressBar from "./StressBar";
import Skeleton from "./Skeleton";
import Copy from "./Icons/Copy";
import CopyMd from "./Icons/CopyMd";
import Twitter from "./Icons/Twitter";
import { useRef } from "react";
import { useToast } from "../context/ToastContext";

type ResultsData = {
  stressLevel: null | number;
  recommendations: null | string;
};

type ResultsProps = {
  resultsData: ResultsData;
};

const MAX_STRESS_LEVEL = 8;
const MIN_STRESS_LEVEL = 2; //2 cause stress is never 0

export default function Results({ resultsData }: ResultsProps) {
  const { stressLevel, recommendations } = resultsData;

  const porcentageValue = Math.round(
    (((stressLevel ?? 5) - MIN_STRESS_LEVEL) /
      (MAX_STRESS_LEVEL - MIN_STRESS_LEVEL)) *
      100
  );
  console.log({ stressLevel, porcentageValue });
  const articleRef = useRef<HTMLElement | null>(null);
  const toast = useToast();

  const handleClickCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(recommendations ?? "");
      toast.open("Copiado al clipboard con exito");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.open("Fallo al copiar");
    }
  };

  const handleClickCopyText = async () => {
    const textContext = articleRef.current?.textContent;
    // Copy plain text
    try {
      if (textContext) {
        await navigator.clipboard.writeText(textContext);
        toast.open("Copiado al clipboard con exito");
      }
    } catch (err) {
      toast.open("Fallo al copiar");
      console.error("Failed to copy: ", err);
    }
  };

  const handleClickShareTwitter = () => {
    const tweetText = `Mi nivel de estrés 💥 es del ${porcentageValue}% 😮 \n¿Quieres conocer el tuyo? 🤔 realiza un test 📝 en https://stress-predictor-blond.vercel.app/`;
    const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;

    // Open the Twitter share link in a new tab
    window.open(twitterUrl, "xTab", "noopener, noreferrer");
  };

  return (
    <section className="mt-40">
      <h2 className="text-4xl xs:text-5xl md:text-[54px] leading-14 md:leading-16 tracking-wider text-center">
        <strong>
          Tu nivel de{" "}
          <span className="relative px-2 z-10 before:content-[''] before:absolute before:w-[calc(100%_+_0.25em)] before:h-full before:bg-gradient-to-r before:from-primary before:to-[#F7DF1F] before:-rotate-2 before:-left-[0.125em] before:top-0 before:-z-10">
            Estrés
          </span>
        </strong>
      </h2>
      <div className="relative mt-12 w-[85%] max-w-5xl md:w-3/4 mx-auto grid items-center min-h-[80vh] gap-18">
        <StressBar stressLevel={porcentageValue ?? 2} />
        <div className="relative w-full mx-auto group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
          <div className="py-14 xs:py-16 px-6 xs:px-10 md:px-12 lg:px-20 bg-linear-to-r from-[#ECEEED] to-[#F9F9F9] drop-shadow-2xl rounded-xl">
            <span className="top-48 right-5 absolute opacity-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="188"
                height="188"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.5 4.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 17l-1.158-.39a2.7 2.7 0 0 1-.642-.317l-.101-.069A2.5 2.5 0 0 1 18 14.15q-.001-.546-.112-1.06M3 17l1.158-.39q.342-.115.642-.317l.101-.069A2.5 2.5 0 0 0 6 14.15c0-2.437 1.744-4.517 4.123-4.918l.89-.15C11.5 9 12.5 9 12.987 9.082l.891.15c.393.067.77.179 1.123.33M9.5 16l-.925 1.233c-.147.196-.22.295-.304.381a2 2 0 0 1-.732.486c-.112.043-.23.073-.47.133l-1.793.448A1.685 1.685 0 0 0 5.685 22h.683c1.709 0 3.37-.554 4.737-1.579L13 19m1.5-3l.727.969c.343.458.515.687.738.856q.1.076.21.14c.242.14.52.209 1.075.348l1.474.368A1.685 1.685 0 0 1 18.315 22h-.937c-.563 0-.844 0-1.123-.016a10 10 0 0 1-2.425-.44c-.267-.083-.53-.181-1.056-.379L11 20.5"
                  />
                </g>
              </svg>
            </span>
            <article
              ref={articleRef}
              className="prose prose-sm md:max-w-none md:prose-base prose-h1:font-semibold prose-ol:px-1.5 prose-ul:px-1.5 md:prose-ol:px-2.5 md:prose-ul:px-2.5 md:prose-h1:text-center"
            >
              {recommendations ? (
                <ReactMarkdown>{recommendations}</ReactMarkdown>
              ) : (
                <Skeleton />
              )}
            </article>
            {recommendations && (
              <div className="mt-10 flex justify-end gap-1 rounded-lg items-center">
                <button
                  className="px-3 py-2 rounded-lg cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:bg-primary/20 hover:bg-primary/20 transition-colors"
                  onClick={handleClickCopyMarkdown}
                  title="Copiar en Markdown"
                >
                  <span>
                    <CopyMd />
                  </span>
                </button>
                <button
                  className="px-3 py-2 rounded-lg cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:bg-primary/20 hover:bg-primary/20 transition-colors"
                  onClick={handleClickCopyText}
                  title="Copiar texto"
                >
                  <span>
                    <Copy />
                  </span>
                </button>
                <button
                  className="px-3 py-2 rounded-lg cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-primary focus:bg-primary/20 hover:bg-primary/20 transition-colors"
                  onClick={handleClickShareTwitter}
                  title="Compartir nivel de estres en X"
                >
                  <span>
                    <Twitter />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
