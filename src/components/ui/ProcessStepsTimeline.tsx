import React from 'react';
import { Search, FileSpreadsheet, ShieldCheck, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface ProcessStepsTimelineProps {
  onOpenQuote: () => void;
}

export const ProcessStepsTimeline: React.FC<ProcessStepsTimelineProps> = ({ onOpenQuote }) => {
  const steps = [
    {
      step: '01',
      title: 'Diagnóstico das Necessidades',
      desc: 'Mapeamos suas preferências de hospitais, laboratórios, médicos de confiança e a localidade de residência ou trabalho.',
      icon: Search,
      badge: 'Etapa 1',
    },
    {
      step: '02',
      title: 'Estudo Técnico Comparativo',
      desc: 'Apresentamos um comparativo detalhado com valores, acomodações e opções com e sem coparticipação das operadoras elegíveis.',
      icon: FileSpreadsheet,
      badge: 'Etapa 2',
    },
    {
      step: '03',
      title: 'Carências & Portabilidade ANS',
      desc: 'Avaliamos o tempo de permanência no plano anterior para aplicar redução ou isenção total de prazos de carência da ANS.',
      icon: ShieldCheck,
      badge: 'Etapa 3',
    },
    {
      step: '04',
      title: 'Implantação Ágil & Pós-Venda',
      desc: 'Cuidamos do envio seguro da documentação até a emissão da sua carteirinha ativa, permanecendo ao seu lado no pós-venda.',
      icon: UserCheck,
      badge: 'Etapa 4',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#123D70] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C8A45D]" />
            <span>Passo a Passo</span>
            <span aria-hidden="true">·</span>
            <span>Segurança Total</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071B35] tracking-tight">
            Como Funciona a Consultoria Baltazar
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Um processo claro, ético e sem atritos para você ou sua empresa contratar com 100% de confiança.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(18, 61, 112, 0.12)"
                className="bg-slate-50/90 p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#123D70]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif font-black text-3xl text-[#C8A45D] group-hover:scale-110 transition-transform">
                      {s.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#071B35] shadow-xs group-hover:bg-[#071B35] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#123D70] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                    {s.badge}
                  </span>

                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#123D70] transition-colors mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#071B35] hover:bg-[#123D70] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <span>Iniciar Diagnóstico Gratuito Agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
