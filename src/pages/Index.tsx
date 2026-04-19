import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhoIsItFor from "@/components/WhoIsItFor";
import WhyItWorks from "@/components/WhyItWorks";
import HowItWorks from "@/components/HowItWorks";
import MentorshipAdvantage from "@/components/MentorshipAdvantage";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ThemeSelector from "@/components/ThemeSelector";

/**
 * Landing page with hierarchical content flow:
 * 
 * 1. Navbar (slim, sticky)
 * 2. Hero (full-screen, single-focus)
 * 3. Features (modular grid – flagship content)
 * 4. Who Is It For (audience segments)
 * 5. Why It Works (data-driven proof)
 * 6. How It Works (simple process)
 * 7. Mentorship Stories (mid-page lifestyle/culture row)
 * 8. Testimonials (social proof)
 * 9. FAQ (questions & answers)
 * 10. CTA (final conversion push)
 * 11. Footer (comprehensive sitemap)
 */
const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <WhoIsItFor />
        <WhyItWorks />
        <HowItWorks />
        <MentorshipAdvantage />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <ThemeSelector position="floating" />
    </div>
  );
};

export default Index;
