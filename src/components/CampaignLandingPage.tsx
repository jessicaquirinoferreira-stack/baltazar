import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Building2, 
  HeartHandshake, 
  Users, 
  Sparkles, 
  Phone, 
  ArrowLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Campaign, SiteSettings, createLead, recordEvent } from '../firebase';

interface CampaignLandingPageProps {
  campaign: Campaign;
  settings: SiteSettings;
  onBackToHome: () => void;
}

export const CampaignLandingPage: React.FC<CampaignLandingPageProps> = ({
  campaign,
  settings,
  onBackToHome,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Niterói');
  const [state, setState] = useState('RJ');
  const [beneficiaries, setBeneficiaries] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const whatsappClean = settings.whatsapp.replace(/\D/g, '') || '5521965352050';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createLead({
        name,
        phone,
        email: email || undefined,
        city,
        state,
        planType: campaign.planType,
        beneficiariesCount: Number(beneficiaries) || 1,
        companyName: companyName || undefined,
        notes: notes || undefined,
        source: `campanha_${campaign.slug}`,
        campaignId: campaign.id,
      });

      setSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#071B35', '#123D70', '#C8A45D', '#20C66B'],
        });
      } catch {
        // Safe fallback
      }

      recordEvent({
        eventType: 'quote_submit',
        path: `/campanha/${campaign.slug}`,
        label: `${campaign.title} - ${name}`,
      });
    } catch (err) {
      console.error('Falha ao enviar cotação da campanha:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppUrl = () => {
    const text = `Olá, Diogo! Vim pela página especial de *${campaign.title}*. Meu nome é ${name || 'visitante'}. Gostaria de receber uma proposta para ${beneficiaries} vida(s) em ${city}/${state}.`;
    return `https://wa.me/${whatsappClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top micro bar */}
      <div className="bg-[#051325] py-2.5 px-4 text-xs text-slate-300 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Site Principal</span>
          </button>
          <span className="text-[#C8A45D] font-medium hidden sm:inline">
            Campanha Exclusiva Consultor Baltazar
          </span>
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-1 text-slate-300 hover:text-white"
          >
            <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>{settings.phone}</span>
          </a>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#071B35] to-[#123D70] text-white py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <img
              src="https://i.postimg.cc/5tywzMpf/Logo-3D-Baltazar-Consultoria-de-Saude.png"
              alt="Baltazar Consultoria de Saúde"
              className="h-12 sm:h-15 w-auto max-w-[240px] sm:max-w-[300px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)] mb-2"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C8A45D] inline-block">
              {campaign.targetAudience}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {campaign.headline}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed">
              {campaign.subheadline}
            </p>

            <div className="pt-2 space-y-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span>Análise consultiva gratuita conduzida por Diogo Baltazar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span>Estudo de carências cumpridas para migração sem prejuízo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span>As melhores tabelas do Rio de Janeiro e São Paulo</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-800 border border-slate-100">
              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Proposta Solicitada!</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Recebemos seu contato com sucesso. Diogo Baltazar entrará em contato com a tabela personalizada.
                  </p>
                  <div className="pt-2">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#20C66B] hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Falar no WhatsApp Agora</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-base text-[#071B35]">
                      Solicite Cotação Rápida
                    </h3>
                    <p className="text-xs text-slate-500">
                      Preencha os campos abaixo para receber a simulação.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp com DDD
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(21) 99999-9999"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Niterói"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                      />
                    </div>
                  </div>

                  {campaign.planType === 'Empresarial / PME' ? (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nome da Empresa ou MEI
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ex: Minha Empresa Ltda"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quantidade de Vidas (Pessoas)
                      </label>
                      <select
                        value={beneficiaries}
                        onChange={(e) => setBeneficiaries(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] bg-white"
                      >
                        <option value={1}>1 pessoa</option>
                        <option value={2}>2 pessoas</option>
                        <option value={3}>3 pessoas</option>
                        <option value={4}>4 pessoas</option>
                        <option value={5}>5 ou mais</option>
                      </select>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#C8A45D] hover:bg-[#b08e49] text-[#071B35] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors"
                  >
                    {isSubmitting ? 'Registrando...' : 'Receber Tabela Comparativa'}
                  </button>

                  <p className="text-[10px] text-center text-slate-400">
                    Seus dados estão protegidos conforme a LGPD. Sem spam.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Trust Footer */}
      <div className="py-8 text-center text-xs text-slate-500">
        <p>Diogo Baltazar · Consultoria Especializada em Planos de Saúde e Seguros · Niterói, RJ e SP</p>
      </div>
    </div>
  );
};
