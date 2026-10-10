import { useMemo, useState } from "react";
import { Reveal, SectionHead, Tag } from "./ui";

const stages = [
  { k: "A", t: "Temporal representation", d: "Multivariate sensor windows pass through dilated Temporal Convolutional Networks for local degradation patterns, Transformer encoders for long-range dependencies, and temporal attention pooling — feeding a multi-quantile regression head." },
  { k: "B", t: "Uncertainty quantification", d: "A single RUL number hides risk. When maintaining too early and failing too late carry very different costs, the decision needs a distribution: lower and upper bounds, interval width, and coverage." },
  { k: "C", t: "Calibration", d: "Conformalized Quantile Regression uses a held-out calibration set to adjust quantile predictions, targeting a nominal coverage level. Empirical coverage is then measured — under the method's exchangeability assumptions." },
  { k: "D", t: "Maintenance decision", d: "Predicted RUL and its uncertainty are turned into expected maintenance loss using asymmetric early-maintenance and failure costs, producing a risk-aware intervention policy." },
];

// Illustrative degradation curve
function IntervalChart() {
  const [t, setT] = useState(70);
  const W = 640, H = 260, P = 32, T = 120;
  const x = (c: number) => P + (c / T) * (W - 2 * P);
  const y = (r: number) => H - P - (r / 140) * (H - 2 * P);
  const pts = useMemo(() => Array.from({ length: T + 1 }, (_, c) => {
    const rul = Math.max(0, 130 - c * 1.05);
    const w = 6 + c * 0.22;
    return { c, rul, lo: Math.max(0, rul - w), hi: rul + w * 0.8 };
  }), []);
  const band = pts.filter((p) => p.c <= t);
  const area = `M${band.map((p) => `${x(p.c)},${y(p.hi)}`).join(" L")} L${[...band].reverse().map((p) => `${x(p.c)},${y(p.lo)}`).join(" L")} Z`;
  const line = `M${band.map((p) => `${x(p.c)},${y(p.rul)}`).join(" L")}`;
  const cur = pts[t];
  return (
    <figure className="border border-border bg-surface p-5">
      <div className="flex items-center justify-between"><p className="eyebrow">Predicted RUL with interval</p><Tag>Illustrative</Tag></div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Illustrative predicted remaining useful life with prediction interval narrowing over time">
        {[0, 35, 70, 105, 140].map((r) => <g key={r}><line x1={P} x2={W - P} y1={y(r)} y2={y(r)} stroke="var(--border)" /><text x={4} y={y(r) + 3} fontSize="9" fill="var(--subtle)" fontFamily="var(--font-mono)">{r}</text></g>)}
        <path d={area} fill="var(--primary)" opacity="0.12" />
        <path d={line} stroke="var(--primary)" strokeWidth="1.5" fill="none" />
        <line x1={x(t)} x2={x(t)} y1={P} y2={H - P} stroke="var(--foreground)" strokeDasharray="2 3" opacity="0.4" />
        <circle cx={x(t)} cy={y(cur.rul)} r="3.5" fill="var(--primary)" />
        <text x={W - P} y={H - 8} textAnchor="end" fontSize="9" fill="var(--subtle)" fontFamily="var(--font-mono)">OPERATING CYCLE →</text>
      </svg>
      <label className="mt-4 block font-mono text-xs text-muted-foreground">Cycle {t}
        <input type="range" min={5} max={T} value={t} onChange={(e) => setT(+e.target.value)} className="mt-2 w-full accent-[var(--primary)]" />
      </label>
      <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4 font-mono text-xs">
        <div><dt className="text-subtle">Point RUL</dt><dd className="mt-1 text-lg text-foreground">{cur.rul.toFixed(0)}</dd></div>
        <div><dt className="text-subtle">Interval</dt><dd className="mt-1 text-lg text-foreground">[{cur.lo.toFixed(0)}, {cur.hi.toFixed(0)}]</dd></div>
        <div><dt className="text-subtle">Width</dt><dd className="mt-1 text-lg text-primary">{(cur.hi - cur.lo).toFixed(0)}</dd></div>
      </dl>
    </figure>
  );
}

function DecisionLab() {
  const [early, setEarly] = useState(1);
  const [fail, setFail] = useState(10);
  const rul = 40, sigma = 12;
  // Expected loss of maintaining at cycle m, RUL ~ N(rul, sigma)
  const phi = (z: number) => 0.5 * (1 + Math.tanh(0.7978845608 * (z + 0.044715 * z ** 3)));
  const curve = Array.from({ length: 81 }, (_, m) => {
    const pFail = phi((m - rul) / sigma);
    return { m, loss: pFail * fail + (1 - pFail) * early * Math.max(0, rul - m) / 10 };
  });
  const best = curve.reduce((a, b) => (b.loss < a.loss ? b : a));
  const max = Math.max(...curve.map((c) => c.loss));
  const W = 640, H = 200, P = 28;
  const x = (m: number) => P + (m / 80) * (W - 2 * P);
  const y = (l: number) => H - P - (l / max) * (H - 2 * P);
  return (
    <figure className="border border-border bg-surface p-5">
      <div className="flex items-center justify-between"><p className="eyebrow">Expected maintenance loss</p><Tag>Illustrative values</Tag></div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Illustrative expected loss by maintenance timing">
        <line x1={P} x2={W - P} y1={H - P} y2={H - P} stroke="var(--border)" />
        <line x1={x(rul)} x2={x(rul)} y1={P} y2={H - P} stroke="var(--subtle)" strokeDasharray="2 3" />
        <text x={x(rul) + 4} y={P + 8} fontSize="9" fill="var(--subtle)" fontFamily="var(--font-mono)">PREDICTED RUL</text>
        <path d={`M${curve.map((c) => `${x(c.m)},${y(c.loss)}`).join(" L")}`} stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
        <circle cx={x(best.m)} cy={y(best.loss)} r="4" fill="var(--primary)" />
        <text x={x(best.m)} y={y(best.loss) - 10} textAnchor="middle" fontSize="10" fill="var(--primary)" fontFamily="var(--font-mono)">MAINTAIN @ {best.m}</text>
      </svg>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="font-mono text-xs text-muted-foreground">Early-maintenance cost · {early}
          <input type="range" min={0.2} max={5} step={0.1} value={early} onChange={(e) => setEarly(+e.target.value)} className="mt-2 w-full accent-[var(--primary)]" /></label>
        <label className="font-mono text-xs text-muted-foreground">Failure cost · {fail}
          <input type="range" min={2} max={50} value={fail} onChange={(e) => setFail(+e.target.value)} className="mt-2 w-full accent-[var(--primary)]" /></label>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Raise the failure cost and the optimal intervention moves earlier — the policy hedges against the lower tail of the interval. Hypothetical numbers, not industrial results.</p>
    </figure>
  );
}

export function Research() {
  return (
    <section id="research" className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead n="01" label="Research" title="From prediction to decision." intro="My research explores how predictive systems can become more reliable, uncertainty-aware, and useful for operational decision-making." />

        <Reveal className="mb-20 grid gap-8 border-y border-border py-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Current project</p>
          <div className="md:col-span-9">
            <h3 className="display text-3xl md:text-4xl">Decision-Theoretic Predictive Maintenance with Calibrated Predictive Uncertainty for Remaining Useful Life Prediction</h3>
            <div className="mt-6 flex flex-wrap gap-2"><Tag>Independent research</Tag><Tag>Manuscript in preparation · 2026</Tag><Tag>NASA C-MAPSS</Tag></div>
          </div>
        </Reveal>

        <div className="mb-20 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted-foreground" aria-label="Method pipeline">
          {["Sensor history", "Temporal model", "Quantile predictions", "Conformal calibration", "Prediction interval", "Decision"].map((s, i, a) => (
            <span key={s} className="flex items-center gap-3"><span className={`border px-3 py-2 ${i === a.length - 1 ? "border-primary text-primary" : "border-border"}`}>{s}</span>{i < a.length - 1 && <span className="text-subtle">→</span>}</span>
          ))}
        </div>

        <div className="grid gap-px bg-border md:grid-cols-2">
          {stages.map((s, i) => (
            <Reveal key={s.k} delay={i * 80} className="bg-background p-8">
              <p className="font-mono text-xs text-primary">STAGE {s.k}</p>
              <h4 className="display mt-3 text-3xl">{s.t}</h4>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal><IntervalChart /></Reveal>
          <Reveal delay={120}><DecisionLab /></Reveal>
        </div>

        <Reveal className="mt-16 grid gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Experimental protocol</p>
          <div className="space-y-4 text-muted-foreground md:col-span-9">
            <p>Uncertainty baselines: Split Conformal, uncalibrated quantile regression, MC Dropout, Deep Ensembles, Bayesian NNs and Evidential Deep Learning. Predictive baselines span linear models through gradient boosting, LSTM/GRU, TCN and Transformer variants.</p>
            <p>Ablations, sensitivity analysis, significance testing, calibration evaluation and economic metrics. The implementation currently passes <span className="text-foreground">448 verification tests with 0 failures</span> (32 dependency-specific tests skipped when optional ML libraries are unavailable).</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
