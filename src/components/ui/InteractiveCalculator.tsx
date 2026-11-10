import React, { useState, useId } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Users, 
  User, 
  HeartHandshake 
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface InteractiveCalculatorProps {
  onOpenQuoteWithDetails: (planType: string) => void;
}

export const InteractiveCalculator: React.FC<InteractiveCalculatorProps> = ({
  onOpenQuoteWithDetails,
}) => {
  const [profile, setProfile] = useState<'pme' | 'familiar' | 'individual' | 'senior'>('pme');
  const [lives, setLives] = useState<number>(3);
  const [accommodation, setAccommodation] = useState<'apartamento' | 'enfermaria'>('apartamento');
  const [copart, setCopart] = useState<'com' | 'sem'>('com');
  const livesInputId = useId();

  // Dynamic estimate formulas based on standard ANS reference tables RJ/SP
  const calculateEstimate = () => {
    let basePerLife = 380;
    let savingsFactor = 0.28;

    if (profile === 'pme') {
      basePerLife = 290;
      savingsFactor = 0.35; // PME discount vs individual
    } else if (profile === 'familiar') {
      basePerLife = 360;
      savingsFactor = 0.22;
    } else if (profile === 'senior') {
      basePerLife = 850;
      savingsFactor = 0.25;
    } else {
      basePerLife = 410;
      savingsFactor = 0.18;
    }

    if (accommodation === 'enfermaria') {
      basePerLife *= 0.82;
    }
    if (copart === 'com') {
      basePerLife *= 0.78;
    }

    const estimatedMonthly = Math.round(basePerLife * lives);
    const estimatedYearlySavings = Math.round(estimatedMonthly * 12 * savingsFactor);

    return {
      monthlyPerLife: Math.round(basePerLife),
      totalMonthly: estimatedMonthly,
      yearlySavings: estimatedYearlySavings,
    };
  };

  const results = calculateEstimate();

  const getRecommendedOperators = () => {
    if (profile === 'pme') return ['Porto Saúde', 'Bradesco Saúde', 'SulAmérica', 'Amil'];
    if (profile === 'senior') return ['MedSênior', 'Prevent Senior', 'Leve Saúde'];
    if (profile === 'familiar') return ['Amil', 'Unimed', 'Assim Saúde', 'Porto Saúde'];
    return ['Assim Saúde', 'Amil', 'Unimed', 'Leve Saúde'];
  };

  return (
    <SpotlightCard
      spotlightColor="rgba(200, 164, 93, 0.16)"
      className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-12 shadow-xl relative overflow-hidden"
    >
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#C8A45D]/15 via-transparent to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 border-b border-slate-100 pb-7">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#123D70] uppercase tracking-wider mb-1.5">
            <Calculator className="w-4 h-4 text-[#C8A45D]" />
            <span>Simulador Interativo de Economia</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071B35] tracking-tight">
            Descubra o Potencial de Economia para seu Perfil
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Ajuste os parâmetros abaixo para simular a estimativa de custos e o aproveitamento de condições exclusivas.
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-50 to-emerald-100/80 text-emerald-900 text-xs font-bold px-4 py-2.5 rounded-2xl border border-emerald-200 shadow-2xs">
          <TrendingDown className="w-4 h-4 text-emerald-600" />
          <span>Até 35% a 40% de redução em contratos com CNPJ/MEI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Profile Selector */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2.5">
              1. Qual o perfil de contratação?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'pme', label: 'Empresarial & PME', icon: Building2 },
                { id: 'familiar', label: 'Familiar', icon: Users },
                { id: 'individual', label: 'Individual', icon: User },
                { id: 'senior', label: 'Sênior 49+', icon: HeartHandshake },
              ].map((p) => {
                const Icon = p.icon;
                const active = profile === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setProfile(p.id as any);
                      if (p.id === 'pme' && lives < 2) setLives(2);
                      if (p.id === 'individual') setLives(1);
                    }}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col items-start gap-2.5 transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-[#071B35] text-white border-[#071B35] shadow-lg shadow-[#071B35]/20 scale-102 ring-1 ring-[#C8A45D]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-[#C8A45D]' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold leading-tight">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lives slider */}
          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor={livesInputId} className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                2. Quantidade de Vidas (Beneficiários)
              </label>
              <span className="text-sm font-black text-white bg-[#071B35] px-3.5 py-1 rounded-xl shadow-xs">
                {lives} {lives === 1 ? 'vida' : 'vidas'}
              </span>
            </div>
            <input
              id={livesInputId}
              type="range"
              min={profile === 'pme' ? 2 : 1}
              max={15}
              value={lives}
              onChange={(e) => setLives(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C8A45D]"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-semibold mt-1.5">
              <span>{profile === 'pme' ? '2 vidas mín.' : '1 vida'}</span>
              <span>5 vidas</span>
              <span>10 vidas</span>
              <span>15+ vidas</span>
            </div>
          </div>

          {/* Accommodation & Copart Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                3. Acomodação Hospitalar
              </label>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setAccommodation('apartamento')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    accommodation === 'apartamento'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Apartamento
                </button>
                <button
                  type="button"
                  onClick={() => setAccommodation('enfermaria')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    accommodation === 'enfermaria'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Enfermaria
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                4. Modelo de Coparticipação
              </label>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setCopart('com')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    copart === 'com'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Com Copart
                </button>
                <button
                  type="button"
                  onClick={() => setCopart('sem')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    copart === 'sem'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sem Copart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Real-Time Results Card */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-[#071B35] via-[#123D70] to-[#071B35] rounded-3xl p-7 sm:p-8 text-white shadow-2xl border border-white/20 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold text-[#C8A45D] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Simulação Estimada
              </span>
              <span className="text-[11px] text-slate-300 font-semibold bg-white/10 px-2.5 py-0.5 rounded-full">
                Tabelas RJ/SP
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-300 font-medium">Estimativa a partir de:</div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                R$ {results.monthlyPerLife.toLocaleString('pt-BR')}{' '}
                <span className="text-xs font-normal text-slate-300">/ vida ao mês</span>
              </div>
              <div className="text-xs text-slate-300 mt-1 font-medium">
                Total para {lives} vida(s): <strong className="text-white">R$ {results.totalMonthly.toLocaleString('pt-BR')} /mês</strong>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl space-y-1 shadow-inner">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                <TrendingDown className="w-4 h-4" />
                <span>Economia Anual Estimada:</span>
              </div>
              <div className="text-2xl font-black text-emerald-300 tracking-tight">
                até R$ {results.yearlySavings.toLocaleString('pt-BR')} / ano
              </div>
              <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                Em relação à contratação avulsa sem assessoria e sem aproveitamento de carências.
              </p>
            </div>

            <div>
              <div className="text-xs text-slate-300 mb-2 font-bold uppercase tracking-wider">
                Operadoras Recomendadas:
              </div>
              <div className="flex flex-wrap gap-2">
                {getRecommendedOperators().map((op, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 bg-white/10 border border-white/15 rounded-lg text-slate-100 shadow-2xs"
                  >
                    {op}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenQuoteWithDetails(`Simulação ${profile.toUpperCase()} - ${lives} vida(s)`)}
              className="w-full py-4 px-5 bg-[#C8A45D] hover:bg-[#b08e49] text-[#071B35] font-black text-xs uppercase tracking-wider rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-[#C8A45D]/25"
            >
              <span>Solicitar Estudo Oficial Deste Perfil</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};
