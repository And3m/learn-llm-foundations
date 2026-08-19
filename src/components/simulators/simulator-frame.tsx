export function SimulatorFrame({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="simulator" aria-labelledby={`sim-${number}`}>
      <header className="simulator__header">
        <div><span>Interactive {number}</span><h3 id={`sim-${number}`}>{title}</h3></div>
        <p>{description}</p>
      </header>
      <div className="simulator__body">{children}</div>
    </section>
  );
}
