export default function Results({ resultsData }) {
  const { stresLevel, sleepTip, bmiTip, stressTip } = resultsData;
  return (
    <section className="mt-28 flex min-h-[80vh]">
      <div className="w-3/4 mx-auto flex items-center">
        <article className="max-w-2xl mx-auto p-8 bg-linear-to-r from-[#ECEEED] to-[#F9F9F9] drop-shadow-2xl rounded-lg">
          <ul className="grid gap-y-5">
            <li>{stressTip}</li>
            <li>{sleepTip}</li>
            <li>{bmiTip}</li>
          </ul>
        </article>
        <strong className="font-7xl">{stresLevel}</strong>
      </div>
    </section>
  );
}
