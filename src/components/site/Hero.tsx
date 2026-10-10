import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import cv from "@/assets/cv.pdf.asset.json";
import { profile } from "@/content/profile";

const HeroOrb = lazy(() => import("./HeroOrb"));

function hasWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

export function Hero() {
  const [gl, setGl] = useState<boolean | null>(null);
  useEffect(() => setGl(hasWebGL()), []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[62%]" aria-hidden>
        {gl ? <Suspense fallback={null}><HeroOrb /></Suspense> : gl === false && <div className="orb-fallback absolute right-[10%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full" />}
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow animate-in fade-in duration-1000">{profile.name}</p>
          <p className="mt-3 font-mono text-xs text-muted-foreground">{profile.role} — {profile.sub}</p>
          <h1 className="display mt-10 text-6xl sm:text-7xl md:text-[6.5rem] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Building intelligence that makes <em className="text-primary">better</em> decisions.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I work at the intersection of machine learning, predictive maintenance, uncertainty quantification, and intelligent systems — connecting research with real-world decisions.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#research" className="group inline-flex items-center gap-2 bg-primary px-5 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground">Explore Research <ArrowDownRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></a>
            <a href="#work" className="inline-flex items-center gap-2 border border-input px-5 py-3 font-mono text-xs uppercase tracking-wider hover:border-foreground">View Selected Work</a>
            <a href={cv.url} target="_blank" rel="noreferrer" className="link-u ml-2 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">Download CV <ArrowUpRight size={12} /></a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-7xl items-end justify-between px-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle"><span className="mr-2 inline-block h-1.5 w-1.5 bg-primary" />{profile.location}</p>
        <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-wider text-subtle">
          Scroll <span className="relative block h-10 w-px overflow-hidden bg-border"><span className="animate-scrollcue absolute inset-x-0 h-1/2 bg-primary" /></span>
        </div>
      </div>
    </section>
  );
}
