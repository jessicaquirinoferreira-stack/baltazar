/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ModalidadesSection } from './components/ModalidadesSection';
import { OperatorsSection } from './components/OperatorsSection';
import { DiferenciaisSection } from './components/DiferenciaisSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuoteWizardModal } from './components/QuoteWizardModal';
import { AdminPanel } from './components/AdminPanel';
import { CampaignLandingPage } from './components/CampaignLandingPage';
import { FloatingSocialActions } from './components/FloatingSocialActions';
import { VirtualAssistantWidget } from './components/VirtualAssistantWidget';
import { InteractiveCalculator } from './components/ui/InteractiveCalculator';
import { ComparisonMatrixModal } from './components/ui/ComparisonMatrixModal';
import { ProcessStepsTimeline } from './components/ui/ProcessStepsTimeline';
import { TestimonialsMarquee } from './components/ui/TestimonialsMarquee';
import { 
  getSiteSettings, 
  getOperators, 
  getCampaigns, 
  testConnection, 
  SiteSettings, 
  Operator, 
  Campaign, 
  DEFAULT_SITE_SETTINGS, 
  DEFAULT_OPERATORS, 
  recordEvent 
} from './firebase';

export default function App() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [operators, setOperators] = useState<Operator[]>(DEFAULT_OPERATORS);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);

  // Modals state
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [selectedPlanType, setSelectedPlanType] = useState<string>('Plano Familiar');
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Initialize data and check connection
  useEffect(() => {
    // Validate connection to Firestore as mandated by Firebase Skill
    testConnection();

    // Check if URL has a campaign parameter (e.g. ?campanha=plano-senior)
    const urlParams = new URLSearchParams(window.location.search);
    const campaignParam = urlParams.get('campanha');

    loadAppData(campaignParam);

    // Record page view analytics
    recordEvent({
      eventType: 'page_view',
      path: window.location.pathname + window.location.search,
      label: 'Visitante Geral',
    });
  }, []);

  const loadAppData = async (campaignParam?: string | null) => {
    try {
      const [fetchedSettings, fetchedOperators, fetchedCampaigns] = await Promise.all([
        getSiteSettings(),
        getOperators(),
        getCampaigns(),
      ]);

      setSettings(fetchedSettings);
      setOperators(fetchedOperators);
      setCampaigns(fetchedCampaigns);

      if (campaignParam && fetchedCampaigns.length > 0) {
        const matchingCampaign = fetchedCampaigns.find((c) => c.slug === campaignParam);
        if (matchingCampaign) {
          setActiveCampaign(matchingCampaign);
        }
      }
    } catch (err) {
      console.warn('Initial data load notice:', err);
    }
  };

  const handleOpenQuote = (planType?: string) => {
    if (planType) {
      setSelectedPlanType(planType);
    }
    setIsQuoteOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    if (activeCampaign) {
      setActiveCampaign(null);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dedicated campaign landing page view
  if (activeCampaign) {
    return (
      <div className="min-h-screen flex flex-col font-sans selection:bg-[#C8A45D]/20 selection:text-[#071B35]">
        <CampaignLandingPage
          campaign={activeCampaign}
          settings={settings}
          onBackToHome={() => setActiveCampaign(null)}
        />
        {/* Floating actions: Assistant on the left, Social actions on the right */}
        <VirtualAssistantWidget settings={settings} onOpenQuote={handleOpenQuote} />
        <FloatingSocialActions settings={settings} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#C8A45D]/20 selection:text-[#071B35]">
      {/* Navigation Bar */}
      <Navbar
        settings={settings}
        onOpenQuote={handleOpenQuote}
        onNavigateSection={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section with Particles and BorderBeam */}
        <Hero
          settings={settings}
          onOpenQuote={() => handleOpenQuote()}
          onOpenComparisonMatrix={() => setIsComparisonOpen(true)}
        />

        {/* 2. Interactive Calculator / Savings Simulator on-page */}
        <section className="py-12 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <InteractiveCalculator
              onOpenQuoteWithDetails={(details) => handleOpenQuote(details)}
            />
          </div>
        </section>

        {/* 3. Modalidades Section */}
        <ModalidadesSection
          onSelectModalidadeToQuote={(planType) => handleOpenQuote(planType)}
        />

        {/* 4. Process Steps Timeline (Como Funciona a Consultoria) */}
        <ProcessStepsTimeline
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* 5. Operadoras Catalog */}
        <OperatorsSection
          operators={operators}
          onSelectOperatorToQuote={(opName) => {
            setSelectedPlanType(`Cotação Operadora ${opName}`);
            setIsQuoteOpen(true);
          }}
        />

        {/* 6. Testimonials & Verified Cases */}
        <TestimonialsMarquee />

        {/* 7. Diferenciais da Consultoria */}
        <DiferenciaisSection
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* 8. Sobre Diogo Baltazar */}
        <AboutSection
          settings={settings}
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* 9. Perguntas Frequentes (FAQ) */}
        <FaqSection
          settings={settings}
          onOpenQuote={() => handleOpenQuote()}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateSection={scrollToSection}
        onOpenQuote={handleOpenQuote}
      />

      {/* Floating actions: Assistant on the left, Social actions on the right */}
      <VirtualAssistantWidget settings={settings} onOpenQuote={handleOpenQuote} />
      <FloatingSocialActions settings={settings} />

      {/* Smart Quotation Calculator Modal */}
      <QuoteWizardModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialPlanType={selectedPlanType}
        settings={settings}
        campaignSource="site_organico"
      />

      {/* Side-by-side Comparison Matrix Modal */}
      <ComparisonMatrixModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onSelectPlan={(plan) => handleOpenQuote(plan)}
      />

      {/* Admin Panel Modal / Dashboard */}
      {isAdminOpen && (
        <AdminPanel
          onClose={() => setIsAdminOpen(false)}
          siteSettings={settings}
          onRefreshSettings={() => loadAppData()}
          onOpenCampaign={(camp) => setActiveCampaign(camp)}
        />
      )}
    </div>
  );
}
