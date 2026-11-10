import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ExternalLink, 
  Instagram, 
  Building2, 
  Users, 
  ShieldCheck, 
  Check, 
  CornerDownLeft 
} from 'lucide-react';
import { SiteSettings } from '../types';

interface VirtualAssistantWidgetProps {
  settings: SiteSettings;
  onOpenQuote: (planType?: string) => void;
}

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  actions?: {
    type: 'whatsapp' | 'instagram' | 'quote';
    label: string;
    payload?: string;
  }[];
  timestamp: string;
}

export const VirtualAssistantWidget: React.FC<VirtualAssistantWidgetProps> = ({
  settings,
  onOpenQuote,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasUnread, setHasUnread] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Professional real human photo for the assistant
  const assistantPhotoUrl = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
  const whatsappClean = settings.whatsapp.replace(/\D/g, '') || '5521965352050';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Olá! 👋 Sou a Mariana, assistente do Diogo Baltazar. Estou aqui para tirar suas dúvidas sobre planos de saúde e te direcionar para nossos canais oficiais. Como posso te ajudar agora?',
      actions: [
        { type: 'whatsapp', label: 'Conversar com Diogo no WhatsApp' },
        { type: 'instagram', label: 'Ver Instagram @consultor_baltazar' },
      ],
      timestamp: 'Agora',
    },
  ]);

  const quickTopics = [
    {
      label: '💼 Como funciona o desconto para empresas/MEI?',
      response: 'Empresas e MEIs ativos há mais de 6 meses têm acesso a tabelas empresariais a partir de 2 vidas (titular + sócio, funcionário ou dependente), com redução de até 40% na mensalidade em relação a planos individuais! O Diogo pode emitir a simulação exata para você pelo WhatsApp.',
      actions: [{ type: 'whatsapp', label: 'Pedir Estudo PME no WhatsApp', payload: 'Gostaria de simular plano empresarial/PME com desconto.' }],
    },
    {
      label: '🔄 Como trocar de plano sem cumprir carência?',
      response: 'Se você já possui plano de saúde regulamentado pela ANS há pelo menos 2 anos, pode ter direito à Portabilidade Especial de Carências. O Diogo Baltazar analisa seu histórico no sistema da ANS gratuitamente para você migrar sem carências.',
      actions: [{ type: 'whatsapp', label: 'Consultar Portabilidade no WhatsApp', payload: 'Quero verificar se tenho direito à portabilidade de carências.' }],
    },
    {
      label: '👵 Quais são os planos para idosos / 49+?',
      response: 'Trabalhamos com operadoras especializadas no público sênior (como MedSênior, Prevent Senior e Leve Saúde) com unidades próprias de medicina preventiva, geriatras dedicados e sem coparticipação em consultas preventivas.',
      actions: [{ type: 'whatsapp', label: 'Ver Opções Sênior com o Diogo', payload: 'Gostaria de opções de planos de saúde para o público sênior.' }],
    },
    {
      label: '💰 Quanto custa a consultoria do Diogo?',
      response: 'A consultoria de Diogo Baltazar é 100% gratuita para você! Todo o estudo comparativo, análise de carências e simulação de tabelas não geram nenhuma taxa ou compromisso financeiro.',
      actions: [{ type: 'quote', label: 'Solicitar Cotação Gratuita' }],
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Agora',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Formulate intelligent response
    setTimeout(() => {
      let botResponse = 'Perfeito! Para esse tipo de solicitação, o consultor Diogo Baltazar faz a análise direta de tabelas e carências. O canal mais rápido e personalizado é o WhatsApp dele:';
      let actions: Message['actions'] = [
        { type: 'whatsapp', label: 'Falar com Diogo no WhatsApp', payload: text },
        { type: 'instagram', label: 'Visitar nosso Instagram' },
      ];

      const lower = text.toLowerCase();
      if (lower.includes('empresa') || lower.includes('cnpj') || lower.includes('mei') || lower.includes('pme')) {
        botResponse = 'Para planos empresariais e MEI, conseguimos reduções expressivas a partir de 2 vidas em operadoras como Porto Saúde, Bradesco, Amil e SulAmérica. Chame o Diogo no WhatsApp para receber o estudo corporativo!';
      } else if (lower.includes('carência') || lower.includes('portabilidade') || lower.includes('trocar')) {
        botResponse = 'Excelente pergunta! A portabilidade de carências é uma das nossas especialidades. O Diogo verifica as regras vigentes da ANS para você migrar de operadora sem cumprir carência novamente.';
      } else if (lower.includes('idoso') || lower.includes('senior') || lower.includes('sênior') || lower.includes('mãe') || lower.includes('pai')) {
        botResponse = 'Temos planos desenhados com todo o carinho e acolhimento para pessoas a partir de 49 e 60 anos, com foco em medicina preventiva e geriatria especializada no RJ e SP.';
      } else if (lower.includes('preço') || lower.includes('quanto custa') || lower.includes('valor')) {
        botResponse = 'Os valores variam conforme as faixas etárias dos beneficiários e a abrangência hospitalar desejada. A consultoria do Diogo é 100% gratuita. Posso abrir o simulador de cotação ou te conectar direto no WhatsApp!';
        actions = [
          { type: 'quote', label: 'Abrir Simulador de Cotação' },
          { type: 'whatsapp', label: 'Falar com Diogo no WhatsApp', payload: 'Gostaria de uma cotação de valores de plano de saúde.' },
        ];
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: botResponse,
        actions,
        timestamp: 'Agora',
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  const handleActionClick = (action: NonNullable<Message['actions']>[number]) => {
    if (action.type === 'whatsapp') {
      const msg = action.payload || 'Olá, Diogo! Falei com a Mariana no site e gostaria de orientação para um plano de saúde.';
      window.open(`https://wa.me/${whatsappClean}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'instagram') {
      window.open('https://www.instagram.com/consultor_baltazar/', '_blank', 'noopener,noreferrer');
    } else if (action.type === 'quote') {
      setIsOpen(false);
      onOpenQuote();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start pointer-events-auto">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[330px] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-fade-in">
          {/* Header */}
          <div className="bg-[#071B35] p-4 text-white flex items-center justify-between border-b border-[#123D70]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={assistantPhotoUrl}
                  alt="Mariana - Assistente Virtual"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#C8A45D] shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#20C66B] border-2 border-[#071B35]" />
              </div>

              <div>
                <div className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>Mariana</span>
                  <span className="text-[10px] font-semibold text-[#071B35] bg-[#C8A45D] px-2 py-0.2 rounded-full">
                    Assistente
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Consultor Baltazar · Online agora</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fechar assistente"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#071B35] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Attached Quick Actions */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-2 flex flex-col gap-1.5 w-[85%]">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleActionClick(act)}
                        className={`py-2 px-3 rounded-xl text-left font-bold text-[11px] flex items-center justify-between transition-all cursor-pointer shadow-2xs ${
                          act.type === 'whatsapp'
                            ? 'bg-[#20C66B] hover:bg-emerald-600 text-white'
                            : act.type === 'instagram'
                            ? 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white'
                            : 'bg-[#C8A45D] hover:bg-[#b08e49] text-[#071B35]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {act.type === 'whatsapp' && <MessageSquare className="w-3.5 h-3.5" />}
                          {act.type === 'instagram' && <Instagram className="w-3.5 h-3.5" />}
                          {act.type === 'quote' && <Sparkles className="w-3.5 h-3.5" />}
                          <span>{act.label}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Quick suggested topics buttons */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Perguntas Frequentes:
              </span>
              <div className="space-y-1.5">
                {quickTopics.map((topic, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setMessages((prev) => [
                        ...prev,
                        { id: Date.now().toString(), sender: 'user', text: topic.label, timestamp: 'Agora' },
                        {
                          id: (Date.now() + 1).toString(),
                          sender: 'assistant',
                          text: topic.response,
                          actions: topic.actions as any,
                          timestamp: 'Agora',
                        },
                      ]);
                    }}
                    className="w-full text-left p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Digite sua dúvida aqui..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-2 bg-[#071B35] hover:bg-[#123D70] disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button on the Left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white hover:bg-slate-50 text-[#071B35] pl-2 pr-4 py-2 rounded-full shadow-2xl border-2 border-[#C8A45D] hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        aria-label="Abrir assistente virtual Mariana"
      >
        <div className="relative">
          <img
            src={assistantPhotoUrl}
            alt="Mariana - Assistente Virtual"
            className="w-10 h-10 rounded-full object-cover border border-[#C8A45D]"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#20C66B] border-2 border-white animate-pulse" />
        </div>

        <div className="text-left hidden sm:block">
          <div className="font-extrabold text-xs text-[#071B35] leading-tight flex items-center gap-1">
            <span>Mariana</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#20C66B]" />
          </div>
          <div className="text-[10px] text-slate-500 font-medium">Assistente Virtual</div>
        </div>

        {hasUnread && !isOpen && (
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8A45D] animate-ping" />
        )}
      </button>
    </div>
  );
};
