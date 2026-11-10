import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';
import { SpotlightCard } from './ui/SpotlightCard';

interface FaqSectionProps {
  settings: SiteSettings;
  onOpenQuote: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ settings, onOpenQuote }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'A consultoria e a elaboração do estudo comparativo têm algum custo?',
      a: 'Não. Nossa consultoria é 100% gratuita para você ou sua empresa. O trabalho de análise de perfil, comparação de tabelas de operadoras e simulação não gera nenhuma cobrança prévia ou compromisso financeiro.',
    },
    {
      q: 'Como funciona a portabilidade de carências para quem já tem plano de saúde?',
      a: 'Se você já possui um plano regulamentado pela ANS há pelo menos 2 anos (ou 3 anos se cumpriu cobertura parcial temporária), pode ter direito à Portabilidade Especial de Carências. Isso permite trocar de operadora para uma faixa de preço compatível sem cumprir novas carências para consultas, exames ou internações. Fazemos toda a checagem no Guia da ANS para você.',
    },
    {
      q: 'Quem tem MEI pode contratar plano de saúde empresarial com desconto?',
      a: 'Sim! Microempreendedores Individuais (MEI) com pelo menos 6 meses de registro ativo na Receita Federal podem contratar planos empresariais a partir de 2 vidas (titular + dependente legal, cônjuge, filho ou funcionário CLT). As mensalidades chegam a ser até 30% a 40% menores que os planos de pessoa física.',
    },
    {
      q: 'Plano com coparticipação vale a pena?',
      a: 'Geralmente sim, especialmente para quem não utiliza o plano com frequência excessiva ou para empresas que desejam conter o reajuste anual por sinistralidade. No plano coparticipativo, a mensalidade fixa é substancialmente menor (geralmente 20% a 30% mais barata) e você paga apenas uma pequena taxa caso realize consultas ou exames específicos, com limitadores mensais para proteger seu orçamento.',
    },
    {
      q: 'Qual é a diferença real entre Enfermaria e Apartamento privativo?',
      a: 'Na Enfermaria (quarto coletivo), caso haja necessidade de internação, você divide o quarto com outros pacientes do mesmo sexo e as visitas possuem horários mais restritos. No Apartamento (quarto individual), você tem banheiro exclusivo e direito a acompanhante 24 horas por dia, com maior privacidade e conforto.',
    },
    {
      q: 'Existe limite de idade para contratação de planos de saúde sênior?',
      a: 'Operadoras especializadas no público maduro (como MedSênior, Prevent Senior e Leve Saúde) estruturaram produtos desenhados especificamente para pessoas a partir de 49 anos, sem barreiras discriminatórias por idade, priorizando a medicina preventiva, acompanhamento gerátrico e controle de condições crônicas.',
    },
  ];

  const whatsappClean = settings.whatsapp.replace(/\D/g, '') || '5521965352050';

  return (
    <section id="faq" className="py-24 bg-slate-50/80 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#123D70] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-[#C8A45D]" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071B35] tracking-tight">
            Perguntas Frequentes sobre Planos de Saúde
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Respostas diretas e transparentes para as dúvidas mais comuns de contratação e portabilidade.
          </p>
        </div>

        {/* Robust Accordion with SpotlightCard */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <SpotlightCard
                key={idx}
                spotlightColor="rgba(200, 164, 93, 0.12)"
                className={`bg-white rounded-2xl border transition-all duration-300 shadow-xs ${
                  isOpen ? 'border-[#C8A45D] shadow-md ring-1 ring-[#C8A45D]/40' : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-[#071B35] hover:text-[#123D70] transition-colors cursor-pointer"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#C8A45D]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </SpotlightCard>
            );
          })}
        </div>

        {/* Bottom Callout Card */}
        <SpotlightCard
          spotlightColor="rgba(32, 198, 107, 0.12)"
          className="mt-14 text-center p-8 bg-white border border-slate-200/90 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-left space-y-1">
            <h4 className="text-base font-extrabold text-[#071B35]">
              Tem uma dúvida específica sobre seu plano de saúde?
            </h4>
            <p className="text-xs text-slate-500">
              Mande uma mensagem direta para Diogo Baltazar pelo WhatsApp com resposta rápida.
            </p>
          </div>
          <a
            href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent('Olá, Diogo! Tenho uma dúvida sobre contratação de plano de saúde e gostaria de sua orientação.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#20C66B] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </SpotlightCard>
      </div>
    </section>
  );
};
