import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import cv from "@/assets/cv.pdf.asset.json";
import { QuickView } from "./QuickView";

export const sections = [
  ["research", "Research"], ["work", "Work"], ["publications", "Publications"], ["universe", "Universe"],
  ["experience", "Experience"], ["about", "About"], ["contact", "Contact"],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [quick, setQuick] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <>
      <a href="#main" className="sr-only z-[70] bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : ""}`}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6" aria-label="Primary">
          <a href="#top" className="font-mono text-sm tracking-widest">SAURABH<span className="text-primary">.OS</span></a>
          <ul className="hidden items-center gap-7 lg:flex">
            {sections.map(([id, l]) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? "true" : undefined}
                  className={`relative font-mono text-[0.72rem] uppercase tracking-wider transition-colors ${active === id ? "text-foreground" : "text-subtle hover:text-foreground"}`}>
                  {active === id && <span className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 bg-primary" />}
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button onClick={() => setQuick(true)} className="hidden border border-border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-foreground sm:block">Quick view</button>
            <a href={cv.url} target="_blank" rel="noreferrer" className="bg-primary px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-primary-foreground hover:opacity-90">CV</a>
            <button className="p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </nav>
        {open && (
          <ul className="border-t border-border bg-background px-6 py-4 lg:hidden">
            {sections.map(([id, l], i) => (
              <li key={id}><a onClick={() => setOpen(false)} href={`#${id}`} className="flex gap-4 py-3 text-lg"><span className="font-mono text-xs text-subtle">0{i + 1}</span>{l}</a></li>
            ))}
            <li><button onClick={() => { setOpen(false); setQuick(true); }} className="py-3 font-mono text-sm text-primary">Quick view →</button></li>
          </ul>
        )}
      </header>
      <QuickView open={quick} onOpenChange={setQuick} />
    </>
  );
}
