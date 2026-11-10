import React, { useState } from 'react';
import { MessageSquare, Instagram, X } from 'lucide-react';
import { recordEvent, SiteSettings } from '../firebase';

interface FloatingSocialActionsProps {
  settings: SiteSettings;
}

export const FloatingSocialActions: React.FC<FloatingSocialActionsProps> = ({ settings }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  const whatsappClean = settings.whatsapp.replace(/\D/g, '') || '5521965352050';
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(settings.whatsappMessage)}`;
  const instagramUrl = 'https://www.instagram.com/consultor_baltazar/';

  const handleWhatsAppClick = () => {
    recordEvent({
      eventType: 'whatsapp_click',
      path: window.location.pathname,
      label: 'Botao Flutuante WhatsApp',
    });
  };

  const handleInstagramClick = () => {
    recordEvent({
      eventType: 'page_view',
      path: window.location.pathname,
      label: 'Clique Instagram Flutuante',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Tooltip hint above buttons */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#071B35] text-white text-xs font-semibold py-2 px-3.5 rounded-2xl shadow-2xl border border-[#C8A45D]/40 animate-bounce-subtle">
          <span className="w-2 h-2 rounded-full bg-[#20C66B] animate-ping" />
          <span>Fale direto conosco nas redes oficiais!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1 p-0.5 rounded cursor-pointer"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Button 1: Instagram Oficial */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleInstagramClick}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all group relative border-2 border-white/90"
        title="Acessar Instagram @consultor_baltazar"
        aria-label="Instagram oficial Consultor Baltazar"
      >
        <Instagram className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm group-hover:rotate-6 transition-transform" />
        <span className="absolute right-16 bg-[#071B35] text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-white/10">
          @consultor_baltazar
        </span>
      </a>

      {/* Button 2: WhatsApp Oficial */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#20C66B] hover:bg-[#1eb35f] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all group relative border-2 border-white/90"
        title="Falar no WhatsApp (21) 96535-2050"
        aria-label="WhatsApp oficial Diogo Baltazar"
      >
        {/* Pulsing beacon */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-white/20 drop-shadow-sm group-hover:-rotate-6 transition-transform" />
        <span className="absolute right-16 bg-[#071B35] text-white text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-white/10">
          (21) 96535-2050
        </span>
      </a>
    </div>
  );
};
