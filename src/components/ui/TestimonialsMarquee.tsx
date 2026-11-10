import React from 'react';
import { Star, ShieldCheck, Quote, MapPin } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const TestimonialsMarquee: React.FC = () => {
  const testimonials = [
    {
      initials: 'EG',
      name: 'Eduardo Guimarães',
      role: 'Sócio-Diretor, Guimarães & Associados',
      location: 'Niterói - RJ',
      tag: 'Plano Empresarial (6 vidas)',
      quote: 'Estávamos pagando um valor astronômico no plano antigo. O Diogo fez um estudo comparativo minucioso e migrou nossa empresa para a Porto Saúde com 34% de economia e sem nenhuma carência para a equipe.',
      rating: 5,
    },
    {
      name: 'Camila & Rodrigo Silveira',
      initials: 'CS',
      role: 'Família com 2 filhos',
      location: 'Icaraí, Niterói - RJ',
      tag: 'Plano Familiar com Portabilidade',
      quote: 'Precisávamos trocar de operadora antes do nascimento do nosso segundo filho. O Consultor Baltazar conduziu todo o processo de portabilidade da ANS com maestria e segurança total.',
      rating: 5,
    },
    {
      name: 'Dona Maria de Lourdes',
      initials: 'ML',
      role: 'Aposentada, 68 anos',
      location: 'Rio de Janeiro - RJ',
      tag: 'Plano Sênior Especializado',
      quote: 'Meu filho entrou em contato com o Diogo para encontrar um plano com atendimento carinhoso e médicos geriatras. Hoje tenho um centro médico preventivo perto de casa e sem coparticipação em consultas.',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#123D70] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#C8A45D]" />
            <span>Satisfação Comprovada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071B35] tracking-tight">
            Experiências Reais de Quem Contratou Conosco
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Acompanhe o que nossos clientes atendidos em Niterói, Rio de Janeiro e São Paulo dizem sobre a consultoria de Diogo Baltazar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(200, 164, 93, 0.15)"
              className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#C8A45D]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Rating & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#C8A45D]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current drop-shadow-xs" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#123D70] bg-blue-50/90 border border-blue-200/50 px-3 py-1 rounded-full shadow-2xs">
                    {t.tag}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-[#C8A45D]/40 mb-3" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#071B35] to-[#123D70] text-[#C8A45D] font-bold text-xs flex items-center justify-center border border-[#C8A45D]/40 shadow-xs">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-[#071B35]">{t.name}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{t.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" />
                  <span>{t.location}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
