import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  FileText, 
  HeartHandshake, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';

interface DiferenciaisSectionProps {
  onOpenQuote: () => void;
}

export const DiferenciaisSection: React.FC<DiferenciaisSectionProps> = ({ onOpenQuote }) => {
  const diferenciais = [
    {
      num: '01',
      icon: Search,
      title: 'Análise Consultiva Isenta',
      description: 'Não empurramos uma operadora específica. Estudamos os hospitais e médicos que você mais frequenta em Niterói, RJ ou SP para recomendar o plano mais adequado.',
      highlight: 'Sem vínculos com metas de vendas',
    },
    {
      num: '02',
      icon: Clock,
      title: 'Aproveitamento de Carência',
      description: 'Fazemos o levantamento das regras de portabilidade da ANS para que você migre de plano sem precisar cumprir novos períodos de carência quando elegível.',
      highlight: 'Economia de tempo e continuidade médica',
    },
    {
      num: '03',
      icon: DollarSign,
      title: 'Economia Inteligente & PME',
      description: 'Orientamos como utilizar CNPJ ou MEI (a partir de 2 vidas) para obter tabelas corporativas com redução expressiva da mensalidade em comparação a contratos de pessoa física.',
      highlight: 'Até 40% de redução na mensalidade',
    },
    {
      num: '04',
      icon: FileText,
      title: 'Assessoria Documental Completa',
      description: 'Cuidamos de toda a montagem do processo, envio da documentação, conferência de propostas e acompanhamento até a emissão da sua carteirinha ativa.',
      highlight: 'Zero dor de cabeça burocrática',
    },
    {
      num: '05',
      icon: HeartHandshake,
      title: 'Atendimento Humanizado',
      description: 'Contato direto com o consultor Diogo Baltazar. Sem robôs impessoais ou transferências infinitas em centrais telefônicas.',
      highlight: 'WhatsApp direto com o especialista',
    },
    {
      num: '06',
      icon: ShieldCheck,
      title: 'Suporte no Pós-Venda',
      description: 'Permanecemos ao seu lado após a assinatura para sanar dúvidas sobre autorizações, rede credenciada, reajustes anuais e inclusão de dependentes.',
      highlight: 'Acompanhamento durante todo o contrato',
    },
  ];

  return (
    <section id="diferenciais" className="py-24 bg-slate-50/80 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#123D70] tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-[#C8A45D]" />
            <span>Por Que Contratar com o Consultor Baltazar?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071B35] tracking-tight">
            Consultoria Estratégica Faz Toda a Diferença
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Contratar ou trocar de plano de saúde não precisa ser um processo desgastante. Veja como nossa assessoria protege seu bolso e a saúde de quem você ama.
          </p>
        </div>

        {/* Robust Grid with SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {diferenciais.map((item, idx) => {
            const Icon = item.icon;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(200, 164, 93, 0.14)"
                className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#C8A45D]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row with Icon & Editorial Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#071B35] to-[#123D70] text-[#C8A45D] flex items-center justify-center shadow-md border border-[#C8A45D]/30 group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-serif font-black text-2xl text-slate-300 group-hover:text-[#C8A45D] transition-colors">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#123D70] transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Highlight Callout Box */}
        <div className="mt-16 bg-gradient-to-r from-[#071B35] via-[#123D70] to-[#071B35] rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8A45D]">
              Auditoria de Plano Atual
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Já possui plano de saúde e sente que está pagando caro?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Envie sua fatura atual para uma auditoria sem custo. Verificamos se há opções equivalentes ou superiores no mercado com mensalidade menor e aproveitamento de carências pela ANS.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#C8A45D] hover:bg-[#b08e49] text-[#071B35] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl hover:shadow-[#C8A45D]/20 transition-all shrink-0 cursor-pointer"
          >
            <span>Fazer Auditoria Gratuita</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
