import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Award, 
  TrendingDown, 
  Clock, 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  Building2, 
  Users, 
  User, 
  HeartHandshake, 
  Check, 
  Zap, 
  PhoneCall 
} from 'lucide-react';
import { SiteSettings } from '../types';
import { ParticlesCanvas } from './ui/ParticlesCanvas';
import { BorderBeam } from './ui/BorderBeam';
import { AnimatedCounter } from './ui/AnimatedCounter';

interface HeroProps {
  settings: SiteSettings;
  onOpenQuote: (planType?: string) => void;
  onOpenComparisonMatrix: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onOpenQuote,
  onOpenComparisonMatrix,
}) => {
  // Dynamic animated word cycler for headline
  const rotatingWords = [
    'orientação estratégica',
    'redução real de custos',
    'aproveitamento de carências',
    'segurança para sua família',
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Interactive Live Profile Switcher in the Hero itself
  const [activeProfile, setActiveProfile] = useState<'pme' | 'familiar' | 'senior' | 'individual'>('pme');

  const profileData = {
    pme: {
      title: 'Empresarial & PME (a partir de 2 vidas)',
      highlight: 'Economia de até 40% com CNPJ ou MEI ativo',
      operators: ['Porto Saúde', 'Bradesco', 'SulAmérica', 'Amil'],
      quoteLabel: 'Cotar Plano Empresarial com Desconto',
      targetPlan: 'Empresarial / PME',
      badge: 'Maior Economia Tributária',
    },
    familiar: {
      title: 'Plano Familiar Completo',
      highlight: 'Redução unificada de carências para cônjuge e filhos',
      operators: ['Amil', 'Unimed', 'Porto Saúde', 'Assim Saúde'],
      quoteLabel: 'Cotar Plano Familiar para Dependentes',
      targetPlan: 'Plano Familiar',
      badge: 'Desconto Progressivo',
    },
    senior: {
      title: 'Plano Especializado Sênior (49+ e 60+)',
      highlight: 'Medicina preventiva, geriatras dedicados e sem coparticipação preventiva',
      operators: ['MedSênior', 'Prevent Senior', 'Leve Saúde'],
      quoteLabel: 'Cotar Plano Sênior Acolhedor',
      targetPlan: 'Plano Sênior',
      badge: 'Cuidado & Longevidade',
    },
    individual: {
      title: 'Individual & Coletivo por Adesão',
      highlight: 'Opções regionais e nacionais com acomodação em apartamento',
      operators: ['Assim Saúde', 'Amil', 'Unimed', 'Leve Saúde'],
      quoteLabel: 'Cotar Plano Individual / Adesão',
      targetPlan: 'Plano Individual',
      badge: 'Contratação Descomplicada',
    },
  };

  const currentProfile = profileData[activeProfile];
  const whatsappClean = settings.whatsapp.replace(/\D/g, '') || '5521965352050';

  // Direct quick chips on Diogo Baltazar's card
  const handleQuickChipClick = (promptText: string, planType: string) => {
    const url = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(`Olá, Diogo! ${promptText}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative bg-[#071B35] text-white overflow-hidden py-16 sm:py-24 border-b border-white/10">
      {/* 1. Ultra-lightweight Particle Constellation */}
      <ParticlesCanvas quantity={36} color="rgba(200, 164, 93, 0.35)" />

      {/* 2. Innovative Aurora Gradient Mesh (Pure CSS GPU-accelerated) */}
      <div className="absolute top-0 left-1/3 w-[650px] h-[650px] bg-gradient-to-tr from-[#123D70]/40 via-[#C8A45D]/15 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-[#0a2540] to-transparent rounded-full blur-[90px] pointer-events-none" />

      {/* 3. Subtle Kinetic Watermark Layer with Company Name (Non-intrusive, luxury ambient backdrop) */}
      <div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex flex-col justify-between py-4 sm:py-8"
        aria-hidden="true"
      >
        {/* Kinetic Band 1: Stroke Typography (Top Flow) */}
        <div className="flex whitespace-nowrap opacity-[0.04] sm:opacity-[0.05] animate-marquee-slow will-change-transform">
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={`band1-${idx}`} 
              className="flex items-center text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-[0.25em] text-transparent shrink-0 pr-8"
              style={{ WebkitTextStroke: '1.5px #C8A45D' }}
            >
              <span>BALTAZAR CONSULTORIA DE SAÚDE</span>
              <span className="mx-6 text-2xl text-[#C8A45D]/40">✦</span>
              <span>PLANOS DE SAÚDE & SEGUROS</span>
              <span className="mx-6 text-2xl text-[#C8A45D]/40">✦</span>
              <span>NITERÓI • RJ • SP</span>
              <span className="mx-6 text-2xl text-[#C8A45D]/40">✦</span>
            </div>
          ))}
        </div>

        {/* Central Ambient Brand Typography (Watermark Centerpiece) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] sm:opacity-[0.035] pointer-events-none">
          <div className="text-center transform -rotate-3 scale-110 sm:scale-125 select-none">
            <span className="text-[11vw] font-black tracking-tighter uppercase text-white block leading-none drop-shadow-2xl">
              BALTAZAR
            </span>
            <span className="text-[3vw] font-black tracking-[0.45em] uppercase text-[#C8A45D] block -mt-2 sm:-mt-4">
              CONSULTORIA DE SAÚDE
            </span>
          </div>
        </div>

        {/* Kinetic Band 2: Filled Typography Reversed (Bottom Flow) */}
        <div className="flex whitespace-nowrap opacity-[0.03] sm:opacity-[0.04] animate-marquee-reverse will-change-transform">
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={`band2-${idx}`} 
              className="flex items-center text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-[0.3em] text-white shrink-0 pr-8"
            >
              <span>CONSULTOR BALTAZAR</span>
              <span className="mx-6 text-xl text-[#20C66B]/50">●</span>
              <span>EXCELÊNCIA & TRANSPARÊNCIA</span>
              <span className="mx-6 text-xl text-[#20C66B]/50">●</span>
              <span>ECONOMIA ESTRATÉGICA</span>
              <span className="mx-6 text-xl text-[#20C66B]/50">●</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Interactive Authority Badge with Live Beacon */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#C8A45D]/40 backdrop-blur-md text-xs font-semibold text-[#C8A45D]">
              <span className="w-2 h-2 rounded-full bg-[#20C66B] inline-block animate-ping" />
              <span>Consultoria Ativa em Niterói, RJ e SP</span>
              <span className="text-white/30">·</span>
              <span className="text-white font-medium">Análise 100% Gratuita</span>
            </div>

            {/* Dynamic Headline with Smooth Text Transition */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              O plano de saúde ideal começa com uma{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#C8A45D] via-[#f7e7c4] to-[#C8A45D] drop-shadow-sm transition-all duration-500">
                {rotatingWords[wordIndex]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Descubra opções personalizadas com análise minuciosa de carências cumpridas, hospitais de sua preferência e economia real na mensalidade.
            </p>

            {/* INNOVATION 1: Interactive Live Profile Switcher directly in Hero */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl space-y-3.5">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-[#C8A45D]">
                  <Zap className="w-3.5 h-3.5" />
                  Simule o Diagnóstico Instantâneo:
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {currentProfile.badge}
                </span>
              </div>

              {/* Profile Toggle Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'pme', label: 'Empresas & MEI', icon: Building2 },
                  { id: 'familiar', label: 'Famílias', icon: Users },
                  { id: 'senior', label: 'Sênior 49+', icon: HeartHandshake },
                  { id: 'individual', label: 'Individual', icon: User },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeProfile === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveProfile(item.id as any)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-[#C8A45D] text-[#071B35] shadow-lg scale-102 ring-2 ring-white/20'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Profile Summary Banner */}
              <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-t border-white/10">
                <div className="space-y-0.5">
                  <div className="text-white font-extrabold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{currentProfile.highlight}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Operadoras mais indicadas: <strong className="text-slate-200">{currentProfile.operators.join(' · ')}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenQuote(currentProfile.targetPlan)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1.5 border border-white/20"
                >
                  <span>Simular Este Perfil</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => onOpenQuote(currentProfile.targetPlan)}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#C8A45D] hover:bg-[#b08e49] text-[#071B35] font-black text-sm tracking-wide shadow-2xl hover:shadow-[#C8A45D]/30 transition-all cursor-pointer group"
              >
                <span>Solicitar Cotação Completa</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(settings.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#20C66B] hover:bg-emerald-600 text-white font-bold text-sm shadow-xl transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>

            {/* Quick Metrics Bar with Animated Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xl font-black text-[#C8A45D]">
                  <AnimatedCounter to={16} prefix="+" />
                </div>
                <div className="text-[11px] text-slate-300 font-medium">Operadoras RJ/SP</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xl font-black text-emerald-400">
                  <AnimatedCounter to={40} prefix="até " suffix="%" />
                </div>
                <div className="text-[11px] text-slate-300 font-medium">Economia em PME</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xl font-black text-white">100%</div>
                <div className="text-[11px] text-slate-300 font-medium">Isenção de Custos</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xl font-black text-[#C8A45D]">Portabilidade</div>
                <div className="text-[11px] text-slate-300 font-medium">Regras da ANS</div>
              </div>
            </div>
          </div>

          {/* Right Column: INNOVATION 2 — Executive Interactive Consultant Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-[#123D70]/80 via-[#071B35]/95 to-[#051325] border border-white/20 rounded-3xl p-7 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Magic UI Border Beam with Golden Accent */}
              <BorderBeam size={240} duration={9} colorFrom="#C8A45D" colorTo="#38bdf8" />

              {/* Ambient Golden Radial Corner */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#C8A45D]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Top Consultant Profile Header */}
              <div className="flex items-center gap-4 border-b border-white/15 pb-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C8A45D] shadow-xl shadow-black/40 bg-[#071B35]">
                    <img
                      src="https://i.postimg.cc/DZ74cPyV/Whats-App-Image-2026-11-10-at-14-43-40.jpg"
                      alt="Diogo Baltazar"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Real-time online pulse indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#20C66B] border-2 border-[#071B35] flex items-center justify-center animate-pulse" title="Disponível para atendimento">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    <span>Diogo Baltazar</span>
                  </h2>
                  <p className="text-xs text-[#C8A45D] font-bold">Consultor de Planos de Saúde e Seguros</p>
                  <p className="text-[11px] text-slate-300 mt-0.5 flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3 text-[#C8A45D]" />
                    <span>Niterói · Atendimento RJ e SP</span>
                  </p>
                </div>
              </div>

              {/* Status & Availability Notice */}
              <div className="py-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-white">Status da Consultoria:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Atendimento Online Ativo
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Orientação técnica sem compromisso para contratação nova, migração de operadora ou auditoria de custos.
                </p>
              </div>

              {/* INNOVATION 3: Click-to-Chat Quick Topics on the Card */}
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8A45D] block">
                  Escolha o que você precisa agora:
                </span>

                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickChipClick('Gostaria de reduzir os custos do plano de saúde da minha empresa (PME).', 'Empresarial / PME')}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#C8A45D]/50 text-xs text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">💼 Reduzir custos da minha empresa (PME)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickChipClick('Gostaria de orientações sobre planos para a terceira idade / sênior.', 'Plano Sênior')}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#C8A45D]/50 text-xs text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">👵 Plano acolhedor para pais idosos / 49+</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickChipClick('Quero trocar de plano de saúde aproveitando carências da ANS.', 'Plano Familiar')}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#C8A45D]/50 text-xs text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">🔄 Trocar de plano com portabilidade ANS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                  </button>
                </div>
              </div>

              {/* Direct Card Bottom CTA */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onOpenQuote()}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#C8A45D] to-[#b08e49] hover:from-[#b08e49] hover:to-[#C8A45D] text-[#071B35] rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Simulador de Cotação Inteligente</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
