import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionHead({ n, label, title, intro }: { n: string; label: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-16 grid gap-8 md:grid-cols-12">
      <p className="eyebrow md:col-span-3"><span className="text-primary">{n}</span> / {label}</p>
      <div className="md:col-span-9">
        <h2 className="display text-5xl md:text-7xl">{title}</h2>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-block border border-border px-2 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">{children}</span>;
}
