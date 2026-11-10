import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Building2, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  X, 
  HelpCircle, 
  CheckCircle2, 
  TrendingUp, 
  ChevronRight 
} from 'lucide-react';
import { MODALIDADES_DATA } from '../data/modalidades';
import { ModalidadeInfo } from '../types';
import { SpotlightCard } from './ui/SpotlightCard';

interface ModalidadesSectionProps {
  onSelectModalidadeToQuote: (planType: string) => void;
}

export const ModalidadesSection: React.FC<ModalidadesSectionProps> = ({
  onSelectModalidadeToQuote,
}) => {
  const [selectedModalidade, setSelectedModalidade] = useState<ModalidadeInfo | null>(null);

  const getCardTheme = (id: string) => {
    switch (id) {
      case 'empresarial':
        return {
          accentColor: '#C8A45D',
          badgeText: 'Mais Vantajoso (Até 40% OFF)',
          topGradient: 'from-[#C8A45D] via-[#e5c98d] to-[#123D70]',
          iconBg: 'from-[#071B35] to-[#123D70]',
          popular: true,
        };
      case 'senior':
        return {
          accentColor: '#C8A45D',
          badgeText: 'Especialista 49+ & 60+',
          topGradient: 'from-[#123D70] via-[#C8A45D] to-[#071B35]',
          iconBg: 'from-[#123D70] to-[#071B35]',
          popular: true,
        };
      case 'familiar':
        return {
          accentColor: '#123D70',
          badgeText: 'Famílias & Dependentes',
          topGradient: 'from-[#123D70] via-[#2563eb] to-[#071B35]',
          iconBg: 'from-[#071B35] to-[#1e3a8a]',
          popular: false,
        };
      case 'odonto':
        return {
          accentColor: '#20C66B',
          badgeText: 'Carência Zero Urgência',
          topGradient: 'from-[#20C66B] via-[#10b981] to-[#071B35]',
          iconBg: 'from-[#064e3b] to-[#071B35]',
          popular: false,
        };
      case 'individual':
        return {
          accentColor: '#123D70',
          badgeText: 'Pessoa Física & Adesão',
          topGradient: 'from-[#071B35] via-[#123D70] to-[#C8A45D]',
          iconBg: 'from-[#071B35] to-[#123D70]',
          popular: false,
        };
      default:
        return {
          accentColor: '#C8A45D',
          badgeText: 'Proteção Patrimonial',
          topGradient: 'from-[#071B35] to-[#C8A45D]',
          iconBg: 'from-[#071B35] to-[#123D70]',
          popular: false,
        };
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'User': return User;
      case 'Users': return Users;
      case 'Building2': return Building2;
      case 'HeartHandshake': return HeartHandshake;
      case 'Sparkles': return Sparkles;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="modalidades" className="py-24 bg-gradient-to-b from-slate-50 to-slate-100/70 border-b border-slate-200 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#C8A45D]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#123D70] tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-[#C8A45D]" />
            <span>Soluções Especializadas Sob Medida</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071B35] tracking-tight">
            Modalidades de Planos e Proteção
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Selecione a categoria mais adequada para sua família ou empresa e conte com a orientação técnica de Diogo Baltazar para economizar com segurança.
          </p>
        </div>

        {/* Enhanced Robust Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {MODALIDADES_DATA.map((modalidade) => {
            const Icon = getIcon(modalidade.iconName);
            const theme = getCardTheme(modalidade.id);

            return (
              <SpotlightCard
                key={modalidade.id}
                spotlightColor="rgba(200, 164, 93, 0.15)"
                className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#C8A45D]/60 hover:-translate-y-2 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between group relative"
              >
                {/* Top Radiant Gradient Line */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.topGradient} rounded-t-3xl`} 
                />

                <div>
                  {/* Top Header Row with Icon & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-6 pt-1">
                    {/* Elevated 3D Icon container */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.iconBg} text-[#C8A45D] flex items-center justify-center shadow-lg shadow-[#071B35]/15 border border-[#C8A45D]/30 group-hover:scale-110 group-hover:border-[#C8A45D] transition-all duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Prominent Badge */}
                    <span className="text-[11px] font-bold text-[#071B35] bg-gradient-to-r from-amber-50 to-amber-100/90 border border-amber-200/80 px-3 py-1 rounded-full shadow-2xs">
                      {theme.badgeText}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#071B35] tracking-tight group-hover:text-[#123D70] transition-colors">
                    {modalidade.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 mb-3.5">
                    <span className="text-xs font-semibold text-[#C8A45D] tracking-wide">
                      {modalidade.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {modalidade.description}
                  </p>

                  {/* Highlights Checklist with Enhanced Micro-Pills */}
                  <div className="space-y-2.5 mb-7 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                    {modalidade.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-medium leading-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Dual Robust Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedModalidade(modalidade)}
                    className="text-xs font-bold text-slate-600 hover:text-[#071B35] flex items-center gap-1.5 transition-colors py-2 px-1 rounded-lg hover:bg-slate-100/70"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-[#C8A45D] transition-colors" />
                    <span>Ver Detalhes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectModalidadeToQuote(modalidade.title)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#071B35] hover:bg-[#123D70] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all group-hover:bg-[#C8A45D] group-hover:text-[#071B35]"
                  >
                    <span>Cotar Agora</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      {selectedModalidade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#071B35] px-6 py-5 text-white flex items-center justify-between border-b border-[#123D70]">
              <div>
                <span className="text-xs font-bold text-[#C8A45D] uppercase tracking-wider">
                  Guia Consultivo do Beneficiário
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                  {selectedModalidade.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedModalidade(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-5 text-sm text-slate-700">
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#071B35] mb-1.5">
                  Como Funciona a Contratação
                </h4>
                <p className="text-xs leading-relaxed text-slate-600">
                  {selectedModalidade.details.comoFunciona}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Quem Pode Contratar</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedModalidade.details.quemPodeContratar}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Rede Credenciada</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedModalidade.details.redeCredenciada}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Carências e Portabilidade</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedModalidade.details.carenciasEPortabilidade}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Acomodação (Enfermaria vs Quarto)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedModalidade.details.acomodacao}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <h4 className="text-xs font-bold text-slate-900 mb-1">Política de Coparticipação</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedModalidade.details.coparticipacao}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2.5">Operadoras Recomendadas para este Perfil:</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedModalidade.recommendedOperators.map((op, i) => (
                    <span key={i} className="px-3.5 py-1.5 bg-slate-100 text-slate-800 rounded-xl font-semibold border border-slate-200">
                      {op}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedModalidade(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Voltar à página
              </button>

              <button
                type="button"
                onClick={() => {
                  const title = selectedModalidade.title;
                  setSelectedModalidade(null);
                  onSelectModalidadeToQuote(title);
                }}
                className="px-6 py-3 bg-[#C8A45D] hover:bg-[#b08e49] text-[#071B35] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
              >
                Solicitar Cotação Desta Modalidade
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
