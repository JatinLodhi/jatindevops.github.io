import Navbar            from '@/components/Navbar'
import HeroSection       from '@/components/HeroSection'
import StatsStrip        from '@/components/StatsStrip'
import AboutSection      from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'
import FeaturedProject   from '@/components/FeaturedProject'
import ProjectsSection   from '@/components/ProjectsSection'
import SkillsSection     from '@/components/SkillsSection'
import ImpactSection     from '@/components/ImpactSection'
import ContactSection    from '@/components/ContactSection'
import Footer            from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-base text-fg">
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <div className="section-sep" />
      <AboutSection />
      <div className="section-sep" />
      <ExperienceSection />
      <div className="section-sep" />
      <FeaturedProject />
      <div className="section-sep" />
      <ProjectsSection />
      <div className="section-sep" />
      <SkillsSection />
      <div className="section-sep" />
      <ImpactSection />
      <div className="section-sep" />
      <ContactSection />
      <Footer />
    </main>
  )
}
