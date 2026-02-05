import LandingFooter from '@/components/footers/LandingFooter';
import LandingHeader from '@/components/headers/LandingHeader';
import CTA from '@/components/landing/CTA';
import HeroSection from '@/components/landing/HeroSection';
import SubscriptionPlan from '@/components/landing/SubscriptionPlan';
import UnifiedPlatform from '@/components/landing/UnifiedPlatform';

export default function LandingPage() {
  return (
    <div className="bg-background-light text-slate-900 transition-colors duration-300 dark:bg-background-dark dark:text-slate-100">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <LandingHeader />
        <main className="flex-1">
          <HeroSection />
          <UnifiedPlatform />
          <SubscriptionPlan />
          <CTA />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
