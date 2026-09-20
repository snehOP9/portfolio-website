import ScrollProgress from "@/components/layout/scroll-progress";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Stack from "@/components/sections/stack";
import Projects from "@/components/sections/projects";
import Research from "@/components/sections/research";
import Roadmap from "@/components/sections/roadmap";
import Contact from "@/components/sections/contact";
import { InteractiveParticles } from "@/components/effects/interactive-particles";

export default function PortfolioHome() {
  return <><ScrollProgress /><InteractiveParticles /><main id="main-content" className="bg-background relative"><Hero /><div className="relative z-10 divide-y divide-border bg-background"><section id="work"><Projects /></section><section id="research"><Research /></section><section id="about"><About /></section><section id="stack"><Stack /></section><section id="roadmap"><Roadmap /></section><section id="contact"><Contact /></section></div></main></>;
}
