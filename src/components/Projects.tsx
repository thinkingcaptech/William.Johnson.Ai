import { Mountain, Globe, BookOpen, Layers } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import ProjectCard from './ui/ProjectCard';

export default function Projects() {
  return (
    <section
      id="terra"
      className="py-40 relative border-t border-alchemist-maroon/50 bg-alchemist-darkest"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          icon={Mountain}
          title="TERRA"
          subtitle="The Stage of Crystallization. Where fluid truth becomes solid infrastructure."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            title="TCTC USA"
            url="Tctcusa.com"
            icon={Globe}
            desc="A corporate platform designed as high-performance architecture. The bedrock of digital presence, integrating complex data streams into a unified visual language."
            tags={['Enterprise', 'System', 'React']}
          />
          <ProjectCard
            title="Learning Module"
            url="book-learning-module.web.app"
            icon={BookOpen}
            desc="An interactive forge for the mind. Educational technology that transmutes information into wisdom through structured, progressive disclosure."
            tags={['EdTech', 'Interactive', 'Knowledge']}
          />
          <ProjectCard
            title="Offer Architech"
            url="tctc-offer-architech.web.app"
            icon={Layers}
            desc="The automated architect. A system that streamlines the chaos of proposal management into coherent, beautiful flow."
            tags={['SaaS', 'Automation', 'Flow']}
          />
        </div>
      </div>
    </section>
  );
}
