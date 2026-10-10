import { useEffect } from "react";
import { X } from "lucide-react";
import cv from "@/assets/cv.pdf.asset.json";
import { interests, profile, publications } from "@/content/profile";

export function QuickView({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onOpenChange]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-background/70 backdrop-blur-sm" onClick={() => onOpenChange(false)}>
      <aside role="dialog" aria-modal="true" aria-label="Researcher quick view" onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-lg overflow-y-auto border-l border-border bg-surface p-8 animate-in slide-in-from-right duration-300">
        <div className="flex items-start justify-between">
          <p className="eyebrow">Researcher view</p>
          <button onClick={() => onOpenChange(false)} aria-label="Close" autoFocus><X size={18} /></button>
        </div>
        <h2 className="display mt-6 text-4xl">{profile.name}</h2>
        <p className="mt-2 text-muted-foreground">{profile.role} · K. K. Wagh Institute, Nashik · Expected 2027 · CGPA 8.0/10</p>
        <h3 className="eyebrow mt-10">Research interests</h3>
        <p className="mt-3 leading-relaxed">{interests.join(" · ")}</p>
        <h3 className="eyebrow mt-10">Current manuscript</h3>
        <p className="mt-3 leading-relaxed">Decision-Theoretic Predictive Maintenance with Calibrated Predictive Uncertainty for RUL Prediction — <span className="text-muted-foreground">in preparation, 2026.</span></p>
        <h3 className="eyebrow mt-10">Publications</h3>
        <ul className="mt-3 space-y-3 text-sm">
          {publications.map((p) => <li key={p.title} className="leading-relaxed">{p.title} <span className="text-subtle">— {p.venue}, {p.year}</span></li>)}
        </ul>
        <h3 className="eyebrow mt-10">Contact</h3>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          <a className="link-u w-fit" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="link-u w-fit" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="link-u w-fit" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <a href={cv.url} target="_blank" rel="noreferrer" className="mt-10 inline-block bg-primary px-5 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground">Download CV</a>
      </aside>
    </div>
  );
}
