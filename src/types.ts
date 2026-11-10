/**
 * Shared Type Definitions for Consultor Baltazar
 */
import { Operator, Lead, SiteSettings, Campaign } from './firebase';

export type { Operator, Lead, SiteSettings, Campaign };

export interface ModalidadeInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  targetAudience: string;
  iconName: string;
  highlights: string[];
  details: {
    comoFunciona: string;
    quemPodeContratar: string;
    redeCredenciada: string;
    carenciasEPortabilidade: string;
    acomodacao: string;
    coparticipacao: string;
  };
  recommendedOperators: string[];
}

export type ViewMode = 
  | 'home' 
  | 'modalidade-detail' 
  | 'operadoras' 
  | 'sobre' 
  | 'contato' 
  | 'campanha' 
  | 'admin';
