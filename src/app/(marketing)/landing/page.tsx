import { LandingNav } from "@/features/landing/components/LandingNav";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { AIFeaturesBento } from "@/features/landing/components/AIFeaturesBento";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { SocialProof } from "@/features/landing/components/SocialProof";
import { DemoCTA } from "@/features/landing/components/DemoCTA";
import { LandingFooter } from "@/features/landing/components/LandingFooter";

export default function LandingPage() {
  return (
    <main className="min-h-[100dvh] bg-white">
      <LandingNav />
      <HeroSection />
      <AIFeaturesBento />
      <HowItWorks />
      <SocialProof />
      <DemoCTA />
      <LandingFooter />
    </main>
  );
}
