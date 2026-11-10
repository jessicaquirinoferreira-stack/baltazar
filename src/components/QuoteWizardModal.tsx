import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Users, 
  Building2, 
  HeartHandshake, 
  Sparkles, 
  User, 
  Send 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { createLead, recordEvent, SiteSettings } from '../firebase';

interface QuoteWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanType?: string;
  settings: SiteSettings;
  campaignSource?: string;
}

export const QuoteWizardModal: React.FC<QuoteWizardModalProps> = ({
  isOpen,
  onClose,
  initialPlanType,
  settings,
  campaignSource = 'site_organico',
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  // Form State
  const [planType, setPlanType] = useState<string>(initialPlanType || 'Plano Familiar');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('Niterói');
  const [state, setState] = useState<string>('RJ');
  const [beneficiariesCount, setBeneficiariesCount] = useState<number>(1);
  const [companyName, setCompanyName] = useState<string>('');
  const [companyLives, setCompanyLives] = useState<string>('');
  const [ageGroups, setAgeGroups] = useState<string>('');
  const [accommodation, setAccommodation] = useState<string>('Apartamento');
  const [coparticipation, setCoparticipation] = useState<string>('Tanto faz / Quero comparar');
  const [preferredOperators, setPreferredOperators] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const planOptions = [
    { id: 'Plano Individual', label: 'Plano Individual', icon: User, desc: 'Para 1 pessoa (física ou adesão)' },
    { id: 'Plano Familiar', label: 'Plano Familiar', icon: Users, desc: 'Para casal, filhos e dependentes' },
    { id: 'Empresarial / PME', label: 'Empresarial & PME', icon: Building2, desc: 'Com CNPJ/MEI a partir de 2 vidas' },
    { id: 'Plano Sênior', label: 'Plano Sênior 49+', icon: HeartHandshake, desc: 'Foco na terceira idade e prevenção' },
    { id: 'Plano Odontológico', label: 'Plano Odontológico', icon: Sparkles, desc: 'Prevenção e estética dental' },
    { id: 'Seguros', label: 'Seguro de Vida / Auto', icon: ShieldCheck, desc: 'Proteção patrimonial e pessoal' },
  ];

  const handleNextStep = () => {
    setErrorMsg(null);
    if (step === 1) {
      if (!planType) {
        setErrorMsg('Por favor, selecione uma modalidade de plano.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!name.trim()) {
        setErrorMsg('Por favor, informe seu nome completo.');
        return;
      }
      if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
        setErrorMsg('Por favor, informe um WhatsApp válido com DDD (ex: 21 99999-9999).');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const leadId = await createLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        city: city.trim() || 'Niterói',
        state: state || 'RJ',
        planType,
        beneficiariesCount: Number(beneficiariesCount) || 1,
        companyName: companyName.trim() || undefined,
        companyLives: companyLives.trim() || undefined,
        ageGroups: ageGroups.trim() || undefined,
        accommodation,
        coparticipation,
        preferredOperators: preferredOperators.trim() || undefined,
        notes: notes.trim() || undefined,
        source: campaignSource,
      });

      setSubmittedLeadId(leadId);
      setStep(5);

      // Trigger Confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#071B35', '#123D70', '#C8A45D', '#20C66B'],
        });
      } catch {
        // Safe fallback
      }

      // Record conversion event
      recordEvent({
        eventType: 'quote_submit',
        path: window.location.pathname,
        label: `${planType} - ${name}`,
      });
    } catch (err) {
      console.error('Erro ao enviar cotação:', err);
      setErrorMsg('Não foi possível registrar a cotação no momento. Você pode falar diretamente pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate contextual WhatsApp link
  const buildWhatsAppUrl = () => {
    const rawNumber = settings.whatsapp.replace(/\D/g, '') || '5521965352050';
    const text = `Olá, Diogo! Meu nome é ${name || 'visitante do site'}. Solicitei uma cotação no seu site para *${planType}* (${beneficiariesCount} vida(s), em ${city}/${state}). Gostaria de receber o estudo comparativo das opções!`;
    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#071B35] px-6 py-5 text-white flex items-center justify-between border-b border-[#123D70]">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#C8A45D] uppercase tracking-wider">
              <span>Consultor Baltazar</span>
              <span>·</span>
              <span>Cotação Inteligente</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">
              {step === 5 ? 'Cotação Solicitada com Sucesso!' : 'Solicitar Estudo Comparativo de Planos'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {step < 5 && (
          <div className="w-full bg-slate-100 h-1.5 flex">
            <div 
              className="bg-[#C8A45D] h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg flex items-center gap-2">
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Modalidade */}
          {step === 1 && (
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-1">
                Etapa 1 de 4 — Escolha a modalidade desejada:
              </p>
              <p className="text-xs text-slate-500 mb-4">
                Selecione a categoria que melhor se adapta à sua necessidade atual.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {planOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = planType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPlanType(opt.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                        isSelected 
                          ? 'border-[#071B35] bg-[#071B35]/5 shadow-sm ring-1 ring-[#071B35]' 
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#071B35] text-white' : 'bg-slate-100 text-slate-700'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{opt.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Dados Básicos */}
          {step === 2 && (
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-1">
                Etapa 2 de 4 — Seus dados para contato:
              </p>
              <p className="text-xs text-slate-500 mb-4">
                Utilizaremos apenas para enviar o estudo comparativo oficial, em total conformidade com a LGPD.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Oliveira"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp / Telefone com DDD <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(21) 99999-9999"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-2 sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Cidade de Residência / Atendimento
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Niterói, Rio de Janeiro..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Estado
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] bg-white"
                    >
                      <option value="RJ">RJ (Rio de Janeiro)</option>
                      <option value="SP">SP (São Paulo)</option>
                      <option value="Outro">Outro Estado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Vidas & Especificidades */}
          {step === 3 && (
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-1">
                Etapa 3 de 4 — Informações de beneficiários:
              </p>
              <p className="text-xs text-slate-500 mb-4">
                {planType === 'Empresarial / PME' 
                  ? 'Informe dados da empresa para aplicação da tabela empresarial (a partir de 2 vidas).'
                  : 'Informe a quantidade de vidas e faixas etárias para cálculo preciso da tabela.'}
              </p>

              {planType === 'Empresarial / PME' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Razão Social ou Nome Fantasia da Empresa
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ex: Oliveira & Filhos Consultoria"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Total de Vidas (Sócios + Colaboradores)
                      </label>
                      <input
                        type="text"
                        value={companyLives}
                        onChange={(e) => setCompanyLives(e.target.value)}
                        placeholder="Ex: 4 colaboradores + 2 sócios"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Possui MEI ativo (+ de 6 meses)?
                      </label>
                      <select
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] bg-white"
                      >
                        <option value="sim">Sim, MEI ou CNPJ regular</option>
                        <option value="nao">Não, pretendo abrir</option>
                        <option value="duvida">Tenho dúvidas sobre elegibilidade</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Quantidade de Vidas (Pessoas a serem incluídas)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBeneficiariesCount(num)}
                          className={`w-12 h-10 rounded-lg font-semibold text-sm border transition-colors ${
                            beneficiariesCount === num
                              ? 'bg-[#071B35] text-white border-[#071B35]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setBeneficiariesCount(6)}
                        className={`px-3 h-10 rounded-lg font-semibold text-sm border transition-colors ${
                          beneficiariesCount >= 6
                            ? 'bg-[#071B35] text-white border-[#071B35]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        6 ou mais
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Idades aproximadas dos beneficiários (sem dados médicos)
                    </label>
                    <input
                      type="text"
                      value={ageGroups}
                      onChange={(e) => setAgeGroups(e.target.value)}
                      placeholder="Ex: Titular 38 anos, cônjuge 35 anos, filho 8 anos"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Em respeito à sua privacidade e à LGPD, não solicitamos dados de saúde ou histórico clínico.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Preferências & Observações */}
          {step === 4 && (
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-1">
                Etapa 4 de 4 — Preferências de contratação:
              </p>
              <p className="text-xs text-slate-500 mb-4">
                Personalize os detalhes para que Diogo Baltazar selecione as opções exatas para você.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tipo de Acomodação
                    </label>
                    <select
                      value={accommodation}
                      onChange={(e) => setAccommodation(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] bg-white"
                    >
                      <option value="Apartamento">Apartamento (Quarto privativo)</option>
                      <option value="Enfermaria">Enfermaria (Quarto coletivo, menor custo)</option>
                      <option value="Ambos">Gostaria de ver as duas opções</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Coparticipação
                    </label>
                    <select
                      value={coparticipation}
                      onChange={(e) => setCoparticipation(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] bg-white"
                    >
                      <option value="Tanto faz / Quero comparar">Quero comparar valores</option>
                      <option value="Com coparticipação">Com coparticipação (mensalidade menor)</option>
                      <option value="Sem coparticipação">Sem coparticipação (valor 100% fixo)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Operadoras de preferência ou que já possui (opcional)
                  </label>
                  <input
                    type="text"
                    value={preferredOperators}
                    onChange={(e) => setPreferredOperators(e.target.value)}
                    placeholder="Ex: Amil, Porto Saúde, Bradesco, Assim, SulAmérica, Unimed..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Observações adicionais ou aproveitamento de carência
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Já possuo plano há 3 anos e quero trocar sem cumprir carência novamente..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Sucesso / Confirmação */}
          {step === 5 && (
            <div className="py-4 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-1">
                Solicitação Recebida com Sucesso!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                O consultor Diogo Baltazar já recebeu os seus dados e está montando o estudo comparativo com as melhores operadoras elegíveis.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto mb-6 text-left text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Modalidade:</span>
                  <span className="font-semibold text-slate-800">{planType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Beneficiário(s):</span>
                  <span className="font-semibold text-slate-800">{beneficiariesCount} vida(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cidade:</span>
                  <span className="font-semibold text-slate-800">{city}/{state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ID da Cotação:</span>
                  <span className="font-mono text-slate-700">{submittedLeadId?.slice(0, 8)}...</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#20C66B] hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Agilizar no WhatsApp do Diogo</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium text-sm rounded-xl transition-colors"
                >
                  Concluir e Voltar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls for steps 1-4 */}
        {step < 5 && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar etapa</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#071B35] hover:bg-[#123D70] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                <span>Avançar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C8A45D] hover:bg-[#b08e49] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Enviando dados...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Concluir e Receber Cotação</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
