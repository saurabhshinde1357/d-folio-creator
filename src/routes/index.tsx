import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Research } from "@/components/site/Research";
import { About, Contact, Experience, Publications, Universe, Work } from "@/components/site/Sections";

const title = "Saurabh Sagar Shinde — AI Researcher & Systems Engineer";
const description = "Research on predictive maintenance, RUL prediction, calibrated uncertainty and decision-oriented ML — plus civic AI and full-stack systems.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain">
      <Nav />
      <main id="main">
        <Hero />
        <Research />
        <Work />
        <Publications />
        <Universe />
        <Experience />
        <About />
        <Contact />
      </main>
    </div>
  );
}
