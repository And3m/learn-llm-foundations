/** Small SVG building blocks shared by the animated diagrams. Colors come from diagrams.css. */

type State = "on" | "dim" | "frozen" | "alt" | "off";

const boxClass = (state: State = "off") => `dg-box${state === "off" ? "" : ` dg-${state}`}`;

export function Box({ x, y, w, h, label, sub, state, mono, rx = 8 }: { x: number; y: number; w: number; h: number; label?: string; sub?: string; state?: State; mono?: boolean; rx?: number }) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect className={boxClass(state)} x={x} y={y} width={w} height={h} rx={rx} />
      {label ? (
        <text x={cx} y={sub ? cy - 4 : cy + 4} textAnchor="middle" className={`${mono ? "dg-mono" : ""}${state === "on" ? " dg-on" : ""}`} opacity={state === "dim" ? 0.45 : 1}>
          {label}
        </text>
      ) : null}
      {sub ? (
        <text x={cx} y={cy + 13} textAnchor="middle" className="dg-small" opacity={state === "dim" ? 0.45 : 1}>
          {sub}
        </text>
      ) : null}
    </g>
  );
}

/** A straight arrow with a drawn head, so no marker ids are needed. */
export function Arrow({ x1, y1, x2, y2, on, hidden }: { x1: number; y1: number; x2: number; y2: number; on?: boolean; hidden?: boolean }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 7;
  // One decimal is enough for screen pixels and keeps the SVG markup short.
  const round = (value: number) => Math.round(value * 10) / 10;
  const left = [round(x2 - size * Math.cos(angle - 0.45)), round(y2 - size * Math.sin(angle - 0.45))];
  const right = [round(x2 - size * Math.cos(angle + 0.45)), round(y2 - size * Math.sin(angle + 0.45))];
  return (
    <g opacity={hidden ? 0 : 1} className="dg-fade">
      <line className={`dg-line${on ? " dg-on" : ""}`} x1={x1} y1={y1} x2={x2} y2={y2} />
      <polygon className={on ? "dg-arrowhead-on" : "dg-arrowhead"} points={`${x2},${y2} ${left[0]},${left[1]} ${right[0]},${right[1]}`} />
    </g>
  );
}

/** A horizontal bar meter: a grey track and a filled part for a value from 0 to 1. */
export function Meter({ x, y, w, value, tone = "on", opacity }: { x: number; y: number; w: number; value: number; tone?: "on" | "alt"; opacity?: number }) {
  return (
    <g>
      <rect className="dg-fill-off" x={x} y={y} width={w} height={14} rx={7} />
      <rect className={tone === "on" ? "dg-fill-on" : "dg-fill-alt"} x={x} y={y} width={w * value} height={14} rx={7} opacity={opacity} />
    </g>
  );
}

export function Label({ x, y, children, small, title, on, anchor = "middle", mono }: { x: number; y: number; children: React.ReactNode; small?: boolean; title?: boolean; on?: boolean; anchor?: "start" | "middle" | "end"; mono?: boolean }) {
  const classes = [small && "dg-small", title && "dg-title", on && "dg-on", mono && "dg-mono"].filter(Boolean).join(" ");
  return (
    <text x={x} y={y} textAnchor={anchor} className={classes}>
      {children}
    </text>
  );
}

export function Svg({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  return (
    <svg className="dg" viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}
