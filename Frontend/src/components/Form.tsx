export default function Form() {
  return (
    <div className="mt-30">
      <form action="" className="form" onSubmit={handleSubmit}></form>

      <div>
        <strong>
          Tu nivel de estres es <span>{stressLevel}</span>
        </strong>
      </div>
    </div>
  );
}
