import ReactMarkdown from "react-markdown";
import StressBar from "./StressBar";
import Skeleton from "./Skeleton";

export default function Results({ resultsData }) {
  const { stresLevel, recommendations } = resultsData;

  return (
    <section className="mt-60">
      <h2 className="text-4xl xs:text-5xl md:text-[54px] leading-14 md:leading-16 tracking-wider font-bold text-center">
        Tu nivel de Estres
      </h2>
      <div className="relative mt-12 md:mt-20 w-[85%] md:w-3/4 mx-auto grid items-center min-h-[80vh] gap-18">
        <StressBar stressLevel={stresLevel ?? 2} />
        <div className="relative w-full mx-auto group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
          <div className="py-14 xs:py-16 px-6 xs:px-10 md:px-12 lg:px-18 bg-linear-to-r from-[#ECEEED] to-[#F9F9F9] drop-shadow-2xl rounded-xl">
            <span className="bottom-0 right-5 absolute opacity-5">
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
            <article className="prose prose-sm md:max-w-none md:prose-base prose-h1:font-semibold prose-ol:px-1.5 prose-ul:px-1.5 md:prose-ol:px-2.5 md:prose-ul:px-2.5 md:prose-h1:text-center">
              {recommendations ? (
                <ReactMarkdown>{recommendations}</ReactMarkdown>
              ) : (
                <Skeleton />
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
