import React from 'react';
import { 
  Instagram, 
  MessageSquare, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Quote, 
  Heart, 
  Sparkles, 
  Phone 
} from 'lucide-react';
import { SiteSettings } from '../types';
import { BorderBeam } from './ui/BorderBeam';
import { SpotlightCard } from './ui/SpotlightCard';

interface AboutSectionProps {
  settings: SiteSettings;
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onOpenQuote }) => {
  const whatsappClean = settings.whatsapp.replace(/\D/g, '') || '5521965352050';
  const diogoPhotoUrl = 'https://i.postimg.cc/DZ74cPyV/Whats-App-Image-2026-11-10-at-14-43-40.jpg';

  return (
    <section id="sobre" className="py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Professional Card with Diogo Baltazar's Real Photo */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#071B35] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/20 overflow-hidden group">
              <BorderBeam size={220} duration={12} colorFrom="#C8A45D" colorTo="#38bdf8" />
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#C8A45D]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col items-center text-center space-y-4">
                {/* Real Photograph with Gold Trim & Verified Status */}
                <div className="relative">
                  <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#C8A45D] shadow-2xl shadow-black/50 relative bg-slate-900">
                    <img
                      src={diogoPhotoUrl}
                      alt="Diogo Baltazar - Consultor de Planos de Saúde e Seguros"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071B35]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Active Beacon Badge */}
                  <div className="absolute -bottom-2 right-4 px-3 py-1 bg-[#071B35] border border-[#C8A45D] rounded-full flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#20C66B] animate-pulse" />
                    <span className="text-[10px] font-bold text-white tracking-wide">Consultor Ativo</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">Diogo Baltazar</h3>
                  <p className="text-xs text-[#C8A45D] font-bold uppercase tracking-wider mt-0.5">
                    Consultor de Planos de Saúde e Seguros
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 mt-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" />
                    <span>Niterói · Atendimento em todo RJ e SP</span>
                  </div>
                </div>

                {/* Social Badges */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/consultor_baltazar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white border border-white/15 transition-all shadow-xs"
                  >
                    <Instagram className="w-4 h-4 text-[#C8A45D]" />
                    <span className="font-semibold">@consultor_baltazar</span>
                  </a>
                </div>

                {/* Direct Contact Button */}
                <a
                  href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent('Olá, Diogo! Li sua mensagem no site e gostaria de conversar sobre meu plano de saúde.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#20C66B] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Falar Diretamente Comigo no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Personal First-Person Letter Written by Diogo Baltazar */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#123D70] tracking-wider uppercase">
              <Quote className="w-4 h-4 text-[#C8A45D]" />
              <span>Uma Mensagem Pessoal de Diogo Baltazar</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071B35] tracking-tight leading-tight">
              "Meu compromisso não é com metas de operadoras. É com a sua tranquilidade."
            </h2>

            {/* Letter content in warm, human, personal first-person voice */}
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              <p>
                <strong>Olá! Sou Diogo Baltazar.</strong> Se você chegou até aqui, muito provavelmente já sentiu na pele o quanto é desgastante tentar escolher ou renegociar um plano de saúde. São tabelas complexas, prazos confusos de carência e aumentos que pesam no orçamento sem aviso prévio.
              </p>
              
              <p>
                Quando fundei a <strong>Consultor Baltazar</strong>, decidi fazer diferente. Em Niterói, no Rio de Janeiro e em São Paulo, o meu trabalho é sentar ao seu lado — seja em uma conversa de WhatsApp, ligação ou reunião — e fazer um raio-x honesto da sua realidade:
              </p>

              <div className="bg-slate-50 border-l-4 border-[#C8A45D] p-4 sm:p-5 rounded-r-2xl space-y-2 text-xs sm:text-sm text-slate-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Para você e sua família:</strong> Encontramos hospitais de confiança com aproveitamento das carências que você já cumpriu no plano anterior.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Para a sua empresa (PME):</strong> Reduzimos até 40% dos custos utilizando seu CNPJ ou MEI sem abrir mão de hospitais de referência.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Para a melhor idade (49+):</strong> Indicamos operadoras acolhedoras com foco em geriatria preventiva e sem barreiras de idade.</span>
                </div>
              </div>

              <p>
                Aqui não existe robô de atendimento nem pressão de venda. Se o melhor para você for permanecer no seu plano atual, eu serei o primeiro a te dizer isso com total transparência.
              </p>

              <p className="font-serif italic text-slate-800 pt-1">
                "Conte comigo para cuidar daquilo que você tem de mais precioso: a saúde de quem você ama."
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-serif font-black text-xl text-[#071B35] tracking-tight">
                  Diogo Baltazar
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Consultor de Planos de Saúde e Seguros · Niterói, RJ e SP
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 bg-[#071B35] hover:bg-[#123D70] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Solicitar Meu Estudo Gratuito
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
