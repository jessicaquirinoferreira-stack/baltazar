import React from 'react';
import { X, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface ComparisonMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planName: string) => void;
}

export const ComparisonMatrixModal: React.FC<ComparisonMatrixModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  if (!isOpen) return null;

  const comparisonColumns = [
    {
      title: 'Individual / Adesão',
      badge: 'Pessoa Física',
      minLives: '1 pessoa',
      cnpjReq: 'Não (comprovante de profissão/estudante)',
      carens: 'Padrão ANS (estudo prévio de redução)',
      costIndex: 'Tabela Padrão PF',
      dependents: 'Contratos individuais separados',
      copart: 'Opcional (fixo ou coparticipação)',
    },
    {
      title: 'Familiar',
      badge: 'Famílias',
      minLives: '2 ou mais vidas',
      cnpjReq: 'Não (apenas titulares e dependentes)',
      carens: 'Possível compra conjunta de carências',
      costIndex: 'Desconto progressivo por dependente',
      dependents: 'Cônjuge, filhos, enteados',
      copart: 'Recomendado com limitador mensal',
    },
    {
      title: 'Empresarial & PME',
      badge: 'Melhor Custo',
      minLives: '2 ou 3 vidas (conforme operadora)',
      cnpjReq: 'Sim (MEI com +6 meses ou ME/LTDA)',
      carens: 'Redução expressiva (isenta com 30+ vidas)',
      costIndex: 'Até 35% a 40% menor que PF',
      dependents: 'Sócios, funcionários CLT e famílias',
      copart: 'Flexível por categoria hierárquica',
    },
    {
      title: 'Plano Sênior',
      badge: 'Especialista 49+',
      minLives: '1 pessoa',
      cnpjReq: 'Não',
      carens: 'Aproveitamento de plano anterior',
      costIndex: 'Focado em custo-benefício geriátrico',
      dependents: 'Individual ou casal sênior',
      copart: 'Geralmente isento em prevenção',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#071B35] px-6 py-5 text-white flex items-center justify-between border-b border-[#123D70]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C8A45D] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Matriz Comparativa de Modalidades</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">
              Compare as Modalidades Lado a Lado
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fechar matriz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-y-auto overflow-x-auto flex-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-3 text-slate-500 font-semibold w-40">Critério</th>
                {comparisonColumns.map((col, idx) => (
                  <th key={idx} className="py-3 px-3">
                    <div className="font-bold text-sm text-[#071B35]">{col.title}</div>
                    <span className="text-[10px] font-semibold text-[#123D70] bg-blue-50 px-2 py-0.5 rounded">
                      {col.badge}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Mínimo de Vidas</td>
                {comparisonColumns.map((col, idx) => (
                  <td key={idx} className="py-3 px-3 font-medium text-slate-900">{col.minLives}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Exige CNPJ ou MEI?</td>
                {comparisonColumns.map((col, idx) => (
                  <td key={idx} className="py-3 px-3">{col.cnpjReq}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Regras de Carência</td>
                {comparisonColumns.map((col, idx) => (
                  <td key={idx} className="py-3 px-3">{col.carens}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Custo Comparado</td>
                {comparisonColumns.map((col, idx) => (
                  <td key={idx} className="py-3 px-3 font-bold text-emerald-700">{col.costIndex}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Dependentes Elegíveis</td>
                {comparisonColumns.map((col, idx) => (
                  <td key={idx} className="py-3 px-3">{col.dependents}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Coparticipação</td>
                {comparisonColumns.map((col, idx) => (
                  <td key={idx} className="py-3 px-3">{col.copart}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-3 font-semibold text-slate-500">Ação</td>
                {comparisonColumns.map((col, idx) => (
                  <td key={idx} className="py-4 px-3">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectPlan(col.title);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#071B35] hover:bg-[#123D70] text-white text-[11px] font-semibold rounded-lg shadow-xs transition-colors"
                    >
                      <span>Cotar {col.title.split(' ')[0]}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Fechar Comparador
          </button>
        </div>
      </div>
    </div>
  );
};
