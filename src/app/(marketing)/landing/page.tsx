import { LandingNav } from "@/features/landing/components/LandingNav";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { AIFeaturesBento } from "@/features/landing/components/AIFeaturesBento";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { SocialProof } from "@/features/landing/components/SocialProof";
import { DemoCTA } from "@/features/landing/components/DemoCTA";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { ScrollSection } from "@/features/landing/components/ScrollSection";

export default function LandingPage() {
  return (
    <main className="landing-scroll bg-white">
      <LandingNav />

      {/* Hero — snap-section riêng, animation tự xử lý bên trong */}
      <section className="snap-section">
        <HeroSection />
      </section>

      {/* Features — slide up */}
      <ScrollSection id="features" direction="up" className="bg-white">
        <AIFeaturesBento />
      </ScrollSection>

      {/* How it works — slide từ trái */}
      <ScrollSection id="how-it-works" direction="left" className="bg-[var(--surface)]">
        <HowItWorks />
      </ScrollSection>

      {/* Social proof — fade up */}
      <ScrollSection direction="up" delay={0.05} className="bg-white">
        <SocialProof />
      </ScrollSection>

      {/* CTA */}
      <ScrollSection id="demo" direction="up" delay={0.1} className="bg-[var(--surface)]">
        <DemoCTA />
      </ScrollSection>

      {/* Footer — snap riêng, không cần animation */}
      <section className="snap-section">
        <LandingFooter />
      </section>
    </main>
  );
}
