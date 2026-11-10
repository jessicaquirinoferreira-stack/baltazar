import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { recordEvent, SiteSettings } from '../firebase';

interface FloatingWhatsAppProps {
  settings: SiteSettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappClean = settings.whatsapp.replace(/\D/g, '') || '5521965352050';
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(settings.whatsappMessage)}`;

  const handleClick = () => {
    recordEvent({
      eventType: 'whatsapp_click',
      path: window.location.pathname,
      label: 'Botao Flutuante WhatsApp',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs font-semibold py-2 px-3.5 rounded-xl shadow-xl border border-slate-200 animate-bounce-subtle">
          <span>Precisa de cotação rápida? Fale comigo!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5 rounded"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-[#20C66B] hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group relative"
        aria-label="Abrir WhatsApp com Diogo Baltazar"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        <MessageSquare className="w-7 h-7 fill-white/20" />
      </a>
    </div>
  );
};
