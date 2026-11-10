import React, { useState } from 'react';
import { Shield, Menu, X, Phone, MessageSquare, Lock } from 'lucide-react';
import { SiteSettings } from '../types';

interface NavbarProps {
  settings: SiteSettings;
  onOpenQuote: (planType?: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  currentSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenQuote,
  onNavigateSection,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', section: 'hero' },
    { label: 'Modalidades', section: 'modalidades' },
    { label: 'Empresarial / PME', section: 'empresarial' },
    { label: 'Sênior 49+', section: 'senior' },
    { label: 'Operadoras', section: 'operadoras' },
    { label: 'Diferenciais', section: 'diferenciais' },
    { label: 'Sobre Diogo', section: 'sobre' },
    { label: 'Dúvidas', section: 'faq' },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const whatsappClean = settings.whatsapp.replace(/\D/g, '') || '5521965352050';

  return (
    <header className="sticky top-0 z-40 bg-[#071B35]/95 backdrop-blur-md border-b border-white/10 text-white transition-all">
      {/* Top micro-bar */}
      <div className="hidden lg:block bg-[#051325] border-b border-white/5 py-1.5 px-6 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Atendimento Consultivo em <strong className="text-white font-medium">Niterói, RJ e SP</strong>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">Análise gratuita e aproveitamento de carências</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 hover:text-[#C8A45D] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span>{settings.phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <a 
              href={`https://wa.me/${whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direto</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-22 sm:h-24 lg:h-26 flex items-center justify-between gap-4">
        {/* Official 3D Logo with transparent background */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left flex items-center py-1.5 group focus:outline-none cursor-pointer shrink-0"
        >
          <img
            src={settings.logoUrl || "https://i.postimg.cc/5tywzMpf/Logo-3D-Baltazar-Consultoria-de-Saude.png"}
            alt="Baltazar Consultoria de Saúde - Planos de Saúde e Seguros"
            className="h-12 sm:h-16 lg:h-20 w-auto max-w-[200px] sm:max-w-[340px] lg:max-w-[420px] object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)] group-hover:scale-104 transition-all duration-300 select-none"
          />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => handleNavClick(item.section)}
              className="hover:text-white transition-colors relative py-1 focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(settings.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600/15 text-emerald-400 hover:bg-emerald-600/25 border border-emerald-500/30 text-xs font-semibold transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>(21) 96535-2050</span>
          </a>

          <button
            onClick={() => onOpenQuote()}
            className="px-5 py-2.5 rounded-lg bg-[#C8A45D] hover:bg-[#b08e49] text-[#071B35] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Solicitar Cotação
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenQuote()}
            className="px-3.5 py-2 rounded-lg bg-[#C8A45D] text-[#071B35] font-bold text-xs shadow-sm"
          >
            Cotação
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071B35] border-b border-white/10 px-6 py-6 space-y-4 animate-fade-in">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="w-full text-left py-2.5 text-sm font-medium text-slate-200 hover:text-white border-b border-white/5"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 bg-[#C8A45D] text-[#071B35] font-bold text-sm rounded-xl text-center shadow-md"
            >
              Solicitar Cotação Gratuita
            </button>
            <a
              href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#20C66B] text-white font-semibold text-sm rounded-xl text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Falar no WhatsApp (21) 96535-2050</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 text-slate-400 hover:text-white text-xs flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Acesso Restrito / Painel Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
