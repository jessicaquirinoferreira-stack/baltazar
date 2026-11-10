import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  CheckCircle, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  X, 
  Shield, 
  Search, 
  Hospital 
} from 'lucide-react';
import { Operator } from '../types';
import { SpotlightCard } from './ui/SpotlightCard';

interface OperatorsSectionProps {
  operators: Operator[];
  onSelectOperatorToQuote: (operatorName: string) => void;
}

export const OperatorsSection: React.FC<OperatorsSectionProps> = ({
  operators,
  onSelectOperatorToQuote,
}) => {
  const [filter, setFilter] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);

  const categories = [
    { id: 'todos', label: 'Todas as Operadoras' },
    { id: 'empresarial', label: 'PME & Empresarial' },
    { id: 'individual', label: 'Individual & Adesão' },
    { id: 'senior', label: 'Público Sênior (49+)' },
    { id: 'odonto', label: 'Odontológicos' },
  ];

  // Specific hospital references for RJ/SP to enrich cards
  const getHospitalNetwork = (slug: string) => {
    switch (slug) {
      case 'amil':
        return 'CHN Niterói · Amil Espaço Saúde · Quinta D\'Or';
      case 'porto-saude':
        return 'Hospital Icaraí · Samaritano · Copa Star';
      case 'bradesco-saude':
        return 'Rede D\'Or · Pro-Cardíaco · Sírio-Libanês';
      case 'sulamerica':
        return 'CHN Niterói · Quinta D\'Or · Albert Einstein';
      case 'unimed':
        return 'Hospital Unimed Niterói · Rede Própria RJ';
      case 'assim-saude':
        return 'Hospital de Clínicas Niterói · Casa de Saúde Santa Martha';
      case 'medsenior':
        return 'Centro de Prevenção Botafogo · Unidades Próprias 49+';
      case 'prevent-senior':
        return 'Rede Sancta Maggiore · Núcleos de Medicina Avançada';
      case 'leve-saude':
        return 'Clínicas Leve Niterói e Centro RJ';
      default:
        return 'Hospitais de Referência RJ & SP';
    }
  };

  const filteredOperators = operators.filter((op) => {
    if (!op.active) return false;
    const matchesCategory = filter === 'todos' || op.category === filter || op.category === 'todos';
    const matchesSearch =
      !searchTerm ||
      op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.coverage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.modalities.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="operadoras" className="py-24 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#C8A45D] tracking-wider uppercase">
            <Shield className="w-4 h-4 text-[#C8A45D]" />
            <span>Portfólio de Soluções</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071B35] tracking-tight">
            Operadoras e Seguradoras de Referência
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Consulte as marcas credenciadas mais consolidadas atuantes no Rio de Janeiro, Niterói e São Paulo para garantir assistência hospitalar de ponta.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-12">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  filter === cat.id
                    ? 'bg-[#071B35] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por operadora ou hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] bg-slate-50 shadow-2xs"
            />
          </div>
        </div>

        {/* Enhanced Operators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOperators.map((op) => (
            <SpotlightCard
              key={op.id}
              spotlightColor="rgba(18, 61, 112, 0.12)"
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-2xl hover:border-[#123D70]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#071B35] via-[#C8A45D] to-[#123D70] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header row with Logo Emblem and Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#071B35] to-[#123D70] border border-[#C8A45D]/30 flex items-center justify-center font-black text-[#C8A45D] text-sm shadow-md group-hover:scale-105 transition-transform">
                    {op.name.slice(0, 2).toUpperCase()}
                  </div>

                  {op.badge && (
                    <span className="text-[10px] font-bold text-[#123D70] bg-blue-50/90 border border-blue-200/60 px-2.5 py-1 rounded-full shadow-2xs">
                      {op.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#123D70] transition-colors">
                  {op.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                  <span className="truncate font-medium">{op.coverage}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {op.description}
                </p>

                {/* Hospital Reference Preview Tag */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 mb-3 text-[11px] text-slate-700 flex items-start gap-1.5">
                  <Hospital className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1 font-medium">{getHospitalNetwork(op.slug)}</span>
                </div>

                {op.highlightBenefit && (
                  <div className="p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-1.5 mb-4">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{op.highlightBenefit}</span>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedOperator(op)}
                  className="text-xs font-bold text-slate-600 hover:text-[#071B35] transition-colors py-1.5 px-1"
                >
                  Ver Rede
                </button>

                <button
                  type="button"
                  onClick={() => onSelectOperatorToQuote(op.name)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#071B35] hover:bg-[#123D70] text-white text-xs font-bold rounded-lg shadow-xs group-hover:bg-[#C8A45D] group-hover:text-[#071B35] transition-all"
                >
                  <span>Cotar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Regulatory Disclaimer */}
        <div className="mt-14 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center max-w-3xl mx-auto shadow-2xs">
          <p className="text-xs text-slate-500 leading-relaxed">
            * As marcas e operadoras acima são apresentadas como referência do portfólio de planos comercializados no mercado. O Consultor Baltazar atua como consultor independente, orientando a escolha mais adequada. Condições de aceitação, tabelas de preços e redes credenciadas estão sujeitas a confirmação e elegibilidade vigente de cada operadora conforme regras da ANS.
          </p>
        </div>
      </div>

      {/* Operator Detail Modal */}
      {selectedOperator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-[#071B35] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-[#C8A45D]/40 flex items-center justify-center text-white font-black text-lg">
                  {selectedOperator.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedOperator.name}</h3>
                  <p className="text-xs text-[#C8A45D] font-medium">{selectedOperator.modalities}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOperator(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Apresentação da Operadora</h4>
                <p className="leading-relaxed text-slate-600">{selectedOperator.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">Abrangência</span>
                  <span className="text-slate-600">{selectedOperator.coverage}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">Modalidades</span>
                  <span className="text-slate-600">{selectedOperator.modalities}</span>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 space-y-1">
                <span className="font-bold block">Hospitais & Centros de Referência:</span>
                <span className="text-blue-800">{getHospitalNetwork(selectedOperator.slug)}</span>
              </div>

              {selectedOperator.highlightBenefit && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Diferencial:</strong> {selectedOperator.highlightBenefit}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedOperator(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Fechar
              </button>

              <button
                type="button"
                onClick={() => {
                  const name = selectedOperator.name;
                  setSelectedOperator(null);
                  onSelectOperatorToQuote(name);
                }}
                className="px-6 py-2.5 bg-[#071B35] hover:bg-[#123D70] text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Solicitar Cotação {selectedOperator.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
