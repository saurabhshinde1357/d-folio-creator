import { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import cv from "@/assets/cv.pdf.asset.json";
import { interests, profile, projects, publications, recognition, skills, timeline } from "@/content/profile";
import { Reveal, SectionHead, Tag } from "./ui";

const wrap = "mx-auto max-w-7xl px-6";

export function Work() {
  const [open, setOpen] = useState<string | null>("rakshak");
  return (
    <section id="work" className="border-t border-border py-32">
      <div className={wrap}>
        <SectionHead n="02" label="Selected work" title="Systems that reach people." intro="Civic technology, legal access and full-stack products — built with teams, deployed to real users." />
        <ul className="border-t border-border">
          {projects.map((p, i) => {
            const isOpen = open === p.id;
            return (
              <li key={p.id} className="border-b border-border">
                <button onClick={() => setOpen(isOpen ? null : p.id)} aria-expanded={isOpen} className="group grid w-full grid-cols-12 items-baseline gap-4 py-8 text-left">
                  <span className="col-span-2 font-mono text-xs text-subtle md:col-span-1">0{i + 1}</span>
                  <span className="display col-span-10 text-4xl transition-colors group-hover:text-primary md:col-span-5 md:text-5xl">{p.title}</span>
                  <span className="col-span-12 font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-4">{p.kind}</span>
                  <span className="col-span-12 flex items-center justify-between font-mono text-xs text-subtle md:col-span-2 md:justify-end md:gap-4">{p.year}{isOpen ? <Minus size={14} /> : <Plus size={14} />}</span>
                </button>
                {isOpen && (
                  <div className="grid gap-8 pb-12 animate-in fade-in duration-500 md:grid-cols-12">
                    <div className="md:col-span-5 md:col-start-2">
                      <p className="text-lg leading-relaxed">{p.summary}</p>
                      <p className="mt-4 text-sm text-muted-foreground"><span className="eyebrow mr-2">Role</span>{p.role}</p>
                      <div className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <Tag key={s}>{s}</Tag>)}</div>
                    </div>
                    <div className="md:col-span-5">
                      <ul className="space-y-3 text-muted-foreground">{p.points.map((pt) => <li key={pt} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 bg-primary" />{pt}</li>)}</ul>
                      {p.metrics && (
                        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
                          {p.metrics.map((m) => <div key={m.l}><dd className="display text-4xl text-primary">{m.v}</dd><dt className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider text-subtle">{m.l}</dt></div>)}
                        </dl>
                      )}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Publications() {
  return (
    <section id="publications" className="border-t border-border py-32">
      <div className={wrap}>
        <SectionHead n="03" label="Publications" title="Papers & manuscripts." />
        <ol className="border-t border-border">
          {publications.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <li className="grid gap-4 border-b border-border py-8 md:grid-cols-12">
                <span className="font-mono text-xs text-subtle md:col-span-1">{p.year}</span>
                <div className="md:col-span-8">
                  <h3 className="text-xl leading-snug md:text-2xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.authors} · <em>{p.venue}</em></p>
                  <p className="mt-3 text-sm text-subtle">{p.note}</p>
                </div>
                <div className="md:col-span-3 md:text-right"><Tag>{p.status}</Tag></div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Universe() {
  const groups = Object.keys(skills);
  const [g, setG] = useState<string>(groups[0] ?? "");
  return (
    <section id="universe" className="border-t border-border py-32">
      <div className={wrap}>
        <SectionHead n="04" label="Technical universe" title="Tools, methods, systems." intro="Organised by the problems they solve — no percentage bars." />
        <div className="grid gap-12 md:grid-cols-12">
          <div role="tablist" aria-label="Skill domains" className="flex flex-wrap gap-2 md:col-span-4 md:flex-col md:gap-0">
            {groups.map((k, i) => (
              <button key={k} role="tab" aria-selected={g === k} onClick={() => setG(k)}
                className={`flex items-center gap-4 border-border py-3 text-left md:border-b ${g === k ? "text-foreground" : "text-subtle hover:text-muted-foreground"}`}>
                <span className={`font-mono text-xs ${g === k ? "text-primary" : ""}`}>0{i + 1}</span><span className="text-lg">{k}</span>
              </button>
            ))}
          </div>
          <div role="tabpanel" className="md:col-span-8">
            <div key={g} className="flex flex-wrap gap-3 animate-in fade-in duration-500">
              {(skills[g] ?? []).map((s: string) => <span key={s} className="display border border-border px-5 py-3 text-2xl md:text-3xl">{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="border-t border-border py-32">
      <div className={wrap}>
        <SectionHead n="05" label="Experience & education" title="Trajectory." />
        <ol className="relative border-l border-border md:ml-[25%]">
          {timeline.map((t, i) => (
            <Reveal key={t.what} delay={i * 60}>
              <li className="relative pb-12 pl-8">
                <span className="absolute -left-[3px] top-2 h-1.5 w-1.5 bg-primary" />
                <p className="font-mono text-xs text-subtle">{t.when} · {t.type}</p>
                <h3 className="mt-2 text-xl">{t.what}</h3>
                <p className="text-muted-foreground">{t.where}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-8 grid gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Recognition & community</p>
          <ul className="grid gap-x-8 gap-y-3 text-muted-foreground sm:grid-cols-2 md:col-span-9">
            {recognition.map((r) => <li key={r} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 bg-primary" />{r}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="border-t border-border py-32">
      <div className={wrap}>
        <SectionHead n="06" label="About" title="Accuracy is not the finish line." />
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-4">
            <p>I'm a Computer Science undergraduate in Nashik interested in moving machine learning beyond predictive accuracy — toward models that are <span className="text-foreground">calibrated, risk-aware, and useful for the decisions they inform</span>.</p>
            <p>Alongside research, I build software that reaches people: civic AI with Nashik Rural Police, legal-access platforms, and full-stack products. Working on both sides keeps my research grounded in how systems are actually used.</p>
          </Reveal>
          <Reveal delay={100} className="md:col-span-3">
            <p className="eyebrow mb-4">Interests</p>
            <ul className="space-y-2 text-sm">{interests.map((i) => <li key={i}>{i}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-32">
      <div className={wrap}>
        <p className="eyebrow"><span className="text-primary">07</span> / Contact</p>
        <h2 className="display mt-8 text-6xl md:text-9xl">Let's talk research.</h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">For research collaboration, supervision, or engineering conversations.</p>
        <a href={`mailto:${profile.email}`} className="link-u mt-12 inline-block font-mono text-lg text-primary md:text-2xl">{profile.email}</a>
        <div className="mt-16 flex flex-wrap gap-8 border-t border-border pt-8 font-mono text-xs uppercase tracking-wider">
          {[["LinkedIn", profile.linkedin], ["GitHub", profile.github], ["CV (PDF)", cv.url]].map(([l, h]) => (
            <a key={l} href={h} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">{l} <ArrowUpRight size={12} /></a>
          ))}
        </div>
      </div>
      <footer className={`${wrap} mt-32 flex justify-between font-mono text-[0.65rem] uppercase tracking-wider text-subtle`}>
        <span>© 2026 {profile.name}</span><span>{profile.location}</span>
      </footer>
    </section>
  );
}
