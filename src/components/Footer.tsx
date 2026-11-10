import React from 'react';
import { Shield, Phone, MessageSquare, Instagram, Mail, MapPin, Lock, Heart } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenQuote: (planType?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenAdmin,
  onNavigateSection,
  onOpenQuote,
}) => {
  const currentYear = new Date().getFullYear();
  const whatsappClean = settings.whatsapp.replace(/\D/g, '') || '5521965352050';

  return (
    <footer className="bg-[#051325] text-white border-t border-white/10">
      {/* Top Banner CTA */}
      <div className="bg-gradient-to-r from-[#071B35] to-[#123D70] border-b border-white/10 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold text-[#C8A45D] uppercase tracking-wider">
            Atendimento Rápido e Sem Burocracia
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Vamos encontrar a melhor opção de plano para você?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Receba um comparativo personalizado com as opções de planos de saúde elegíveis para sua região em Niterói, Rio de Janeiro e São Paulo.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto px-6 py-3 bg-[#C8A45D] hover:bg-[#b08e49] text-[#071B35] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
            >
              Solicitar Minha Cotação
            </button>
            <a
              href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent(settings.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#20C66B] hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chamar no WhatsApp (21) 96535-2050</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigateSection('hero')}
              className="text-left focus:outline-none cursor-pointer"
            >
              <img
                src={settings.logoUrl || "https://i.postimg.cc/5tywzMpf/Logo-3D-Baltazar-Consultoria-de-Saude.png"}
                alt="Baltazar Consultoria de Saúde - Planos de Saúde e Seguros"
                className="h-14 sm:h-16 w-auto max-w-[260px] sm:max-w-[320px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
              />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consultoria independente especializada em planos de saúde individuais, familiares, empresariais, sênior, odontológicos e seguros. Atendimento de excelência em Niterói, RJ e SP.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://www.instagram.com/consultor_baltazar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#C8A45D] hover:border-[#C8A45D]/50 transition-colors"
                aria-label="Instagram @consultor_baltazar"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#20C66B] hover:border-[#20C66B]/50 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Modalidades */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Modalidades de Planos
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenQuote('Plano Individual')} className="hover:text-white transition-colors">
                  Planos Individuais e Adesão
                </button>
              </li>
              <li>
                <button onClick={() => onOpenQuote('Plano Familiar')} className="hover:text-white transition-colors">
                  Planos Familiares
                </button>
              </li>
              <li>
                <button onClick={() => onOpenQuote('Empresarial / PME')} className="hover:text-white transition-colors">
                  Planos Empresariais e PME
                </button>
              </li>
              <li>
                <button onClick={() => onOpenQuote('Plano Sênior')} className="hover:text-white transition-colors">
                  Planos para o Público Sênior 49+
                </button>
              </li>
              <li>
                <button onClick={() => onOpenQuote('Plano Odontológico')} className="hover:text-white transition-colors">
                  Planos Odontológicos
                </button>
              </li>
              <li>
                <button onClick={() => onOpenQuote('Seguros')} className="hover:text-white transition-colors">
                  Seguros de Vida e Patrimoniais
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navegação rápida */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateSection('hero')} className="hover:text-white transition-colors">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('operadoras')} className="hover:text-white transition-colors">
                  Catálogo de Operadoras
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('diferenciais')} className="hover:text-white transition-colors">
                  Diferenciais da Consultoria
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('sobre')} className="hover:text-white transition-colors">
                  Sobre Diogo Baltazar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('faq')} className="hover:text-white transition-colors">
                  Dúvidas Frequentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contato & Atendimento */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Canais Oficiais
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <span>Niterói, RJ · Atendimento em todo RJ e SP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/${whatsappClean}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: (21) 96535-2050
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <a href="https://www.instagram.com/consultor_baltazar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @consultor_baltazar
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Regulatory Info */}
        <div className="mt-12 pt-8 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong>Aviso Legal & Regulatório:</strong> Diogo Baltazar atua na condição de consultor independente de saúde suplementar e corretagem autorizada. As marcas de operadoras (Amil, Porto Saúde, Bradesco, SulAmérica, Unimed, Assim Saúde, MedSênior, Prevent Senior, Leve Saúde, etc.) são marcas registradas de suas respectivas titulares e são mencionadas a título meramente informativo para identificação dos produtos disponíveis no mercado. As tabelas de preços, coberturas, carências e aceitação dependem expressamente das normas contratuais e diretrizes da ANS (Agência Nacional de Saúde Suplementar).
          </p>
          <p>
            <strong>Privacidade e LGPD:</strong> Em cumprimento à Lei Geral de Proteção de Dados (Lei 13.709/2018), os dados fornecidos nos formulários de cotação são utilizados estritamente para a finalidade de cotação e contato comercial autorizado, sem solicitação de dados médicos sensíveis em formulários públicos.
          </p>
        </div>

        {/* Bottom copyright and discrete admin link */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} Consultor Baltazar · Diogo Baltazar. Todos os direitos reservados.
          </div>

          {/* Centralized discrete Admin Link */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors py-1 px-2.5 rounded hover:bg-white/5"
            title="Acesso Administrativo Restrito"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Painel Admin</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
