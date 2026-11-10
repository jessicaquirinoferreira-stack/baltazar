/**
 * Firebase Client & Data Access Layer for Consultor Baltazar
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  collection, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User 
} from 'firebase/auth';
import rawConfig from '../firebase-applet-config.json';

// Resolved configuration with priority to .env (VITE_FIREBASE_*)
export const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || rawConfig.projectId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || rawConfig.appId,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || rawConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || rawConfig.authDomain,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || rawConfig.firestoreDatabaseId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || rawConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || rawConfig.messagingSenderId,
  measurementId: rawConfig.measurementId || '',
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword };

// Error handling conforming to Firebase Integration Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
    },
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection validation required by skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase configuration notice: client is offline.');
    }
    return false;
  }
}

// Data Models
export interface SiteSettings {
  id?: string;
  consultantName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
  instagram: string;
  email: string;
  city: string;
  coverageRegions: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  secondaryColor: string;
  accentGold: string;
  logoUrl?: string;
  updatedAt?: string;
}

export interface Operator {
  id: string;
  name: string;
  slug: string;
  category: 'individual' | 'empresarial' | 'senior' | 'odonto' | 'todos';
  modalities: string;
  coverage: string;
  description: string;
  badge?: string;
  logoUrl?: string;
  featured: boolean;
  active: boolean;
  order: number;
  highlightBenefit?: string;
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  state: string;
  planType: string;
  beneficiariesCount: number;
  companyName?: string;
  companyLives?: string;
  ageGroups?: string;
  accommodation?: string;
  coparticipation?: string;
  preferredOperators?: string;
  notes?: string;
  source: string;
  campaignId?: string;
  status: 'Novo' | 'Em atendimento' | 'Aguardando retorno' | 'Cotação enviada' | 'Em negociação' | 'Convertido' | 'Não convertido';
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  headline: string;
  subheadline: string;
  targetAudience: string;
  planType: string;
  active: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  viewsCount: number;
  leadsCount: number;
  createdAt: string;
}

export interface AnalyticsEvent {
  eventType: 'page_view' | 'quote_submit' | 'whatsapp_click' | 'operator_view' | 'plan_view';
  path: string;
  label?: string;
  timestamp: string;
}

// Default Seed Data
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  consultantName: 'Diogo Baltazar',
  tagline: 'Especialista em Planos de Saúde, Odontológicos e Seguros',
  phone: '(21) 96535-2050',
  whatsapp: '5521965352050',
  whatsappMessage: 'Olá, Diogo! Acessei seu site e gostaria de receber uma consultoria personalizada para planos de saúde.',
  instagram: 'consultor_baltazar',
  email: 'contato@consultorbaltazar.com.br',
  city: 'Niterói - RJ',
  coverageRegions: 'Niterói, Rio de Janeiro e São Paulo (RJ | SP)',
  heroTitle: 'O plano de saúde ideal começa com uma boa orientação.',
  heroSubtitle: 'Encontre soluções em planos de saúde e seguros com atendimento personalizado, análise criteriosa das suas necessidades e orientação estratégica para economizar com segurança.',
  primaryColor: '#071B35',
  secondaryColor: '#123D70',
  accentGold: '#C8A45D',
  logoUrl: 'https://i.postimg.cc/5tywzMpf/Logo-3D-Baltazar-Consultoria-de-Saude.png',
};

export const DEFAULT_OPERATORS: Operator[] = [
  {
    id: 'amil',
    name: 'Amil',
    slug: 'amil',
    category: 'todos',
    modalities: 'Individual, Familiar, PME e Empresarial',
    coverage: 'Nacional e Regional (RJ / SP)',
    description: 'Uma das maiores operadoras do país, com ampla rede de hospitais, laboratórios e programas de gestão de saúde.',
    badge: 'Rede Ampla',
    featured: true,
    active: true,
    order: 1,
    highlightBenefit: 'Amil Espaço Saúde e telemedicina 24h',
  },
  {
    id: 'porto-saude',
    name: 'Porto Saúde',
    slug: 'porto-saude',
    category: 'empresarial',
    modalities: 'Empresarial e PME a partir de 3 vidas',
    coverage: 'Nacional e Regional RJ/SP',
    description: 'Excelência em atendimento, programas de medicina preventiva e reembolso ágil com a tradição do grupo Porto.',
    badge: 'Alta Avaliação',
    featured: true,
    active: true,
    order: 2,
    highlightBenefit: 'Reembolso rápido e descontos em farmácias',
  },
  {
    id: 'bradesco-saude',
    name: 'Bradesco Saúde',
    slug: 'bradesco-saude',
    category: 'empresarial',
    modalities: 'PME e Grandes Empresas',
    coverage: 'Nacional com centros de referência',
    description: 'Líder no mercado corporativo brasileiro, reconhecida pela solidez, hospitais de ponta e ampla rede credenciada.',
    badge: 'Referência Premium',
    featured: true,
    active: true,
    order: 3,
    highlightBenefit: 'Acesso aos melhores hospitais do Brasil',
  },
  {
    id: 'sulamerica',
    name: 'SulAmérica Saúde',
    slug: 'sulamerica',
    category: 'empresarial',
    modalities: 'Empresarial, PME e Adesão',
    coverage: 'Nacional',
    description: 'Mais de 120 anos de tradição. Planos flexíveis com gestão integrada de saúde física e emocional.',
    badge: 'Tradição & Solidez',
    featured: true,
    active: true,
    order: 4,
    highlightBenefit: 'Orientação Médica Telefônica e app moderno',
  },
  {
    id: 'unimed',
    name: 'Unimed',
    slug: 'unimed',
    category: 'todos',
    modalities: 'Individual, Familiar, PME e Coletivo por Adesão',
    coverage: 'Regional Niterói/RJ e Nacional',
    description: 'Maior sistema cooperativo de saúde do mundo, com hospitais próprios e médicos cooperados em todo o território.',
    badge: 'Maior Cooperativa',
    featured: true,
    active: true,
    order: 5,
    highlightBenefit: 'Forte presença em Niterói e Grande Rio',
  },
  {
    id: 'assim-saude',
    name: 'Assim Saúde',
    slug: 'assim-saude',
    category: 'individual',
    modalities: 'Individual, Familiar e PME',
    coverage: 'Rio de Janeiro e Grande Rio',
    description: 'Maior rede própria de hospitais e centros médicos do RJ, proporcionando excelente custo-benefício regional.',
    badge: 'Custo-Benefício RJ',
    featured: true,
    active: true,
    order: 6,
    highlightBenefit: 'Ampla rede própria no Rio e Niterói',
  },
  {
    id: 'medsenior',
    name: 'MedSênior',
    slug: 'medsenior',
    category: 'senior',
    modalities: 'Individual Sênior (a partir de 49 anos)',
    coverage: 'RJ, SP e principais capitais',
    description: 'Especialista na terceira idade, com foco em medicina preventiva, oficinas de saúde e sem coparticipação em consultas.',
    badge: 'Especialista 49+',
    featured: true,
    active: true,
    order: 7,
    highlightBenefit: 'Centros de medicina preventiva exclusivos',
  },
  {
    id: 'prevent-senior',
    name: 'Prevent Senior',
    slug: 'prevent-senior',
    category: 'senior',
    modalities: 'Individual Sênior e Adulto',
    coverage: 'SP e RJ',
    description: 'Pioneira no atendimento ao público maduro, com rede hospitalar própria Sancta Maggiore e médicos geriatras dedicados.',
    badge: 'Dedicado ao Adulto+',
    featured: true,
    active: true,
    order: 8,
    highlightBenefit: 'Cuidado integrado sem limite de idade',
  },
  {
    id: 'leve-saude',
    name: 'Leve Saúde',
    slug: 'leve-saude',
    category: 'senior',
    modalities: 'Individual, Familiar e Sênior',
    coverage: 'Rio de Janeiro e Grande Rio',
    description: 'Operadora carioca moderna com foco em acolhimento, clínicas Leve e valores acessíveis para todas as idades.',
    badge: 'Acolhimento Carioca',
    featured: true,
    active: true,
    order: 9,
    highlightBenefit: 'Clínicas Leve próprias no RJ e Niterói',
  },
  {
    id: 'hapvida',
    name: 'Hapvida Notredame Intermédica',
    slug: 'hapvida',
    category: 'todos',
    modalities: 'Individual, Familiar e PME',
    coverage: 'Nacional com rede verticalizada',
    description: 'Maior grupo de saúde suplementar da América Latina, unindo rede própria estruturada e planos acessíveis.',
    badge: 'Líder Integrada',
    featured: false,
    active: true,
    order: 10,
    highlightBenefit: 'Centros clínicos próprios e ampla rede',
  },
  {
    id: 'omint',
    name: 'Omint',
    slug: 'omint',
    category: 'todos',
    modalities: 'Empresarial e Individual Premium',
    coverage: 'Nacional e Internacional',
    description: 'Padrão ouro em medicina suplementar e odontologia, com os mais altos tetos de reembolso e hospitais de elite.',
    badge: 'Padrão Ouro',
    featured: false,
    active: true,
    order: 11,
    highlightBenefit: 'Cobertura internacional e reembolso VIP',
  },
  {
    id: 'select-saude',
    name: 'Select Saúde',
    slug: 'select-saude',
    category: 'individual',
    modalities: 'Adesão e PME',
    coverage: 'Rio de Janeiro e São Paulo',
    description: 'Planos estruturados com atendimento digital e rede hospitalar qualificada nos principais polos.',
    badge: 'Digital & Prático',
    featured: false,
    active: true,
    order: 12,
    highlightBenefit: 'Atendimento ágil e portal do cliente completo',
  },
  {
    id: 'supermed',
    name: 'Supermed',
    slug: 'supermed',
    category: 'individual',
    modalities: 'Coletivo por Adesão para diversas categorias profissionais',
    coverage: 'RJ e SP',
    description: 'Administradora de benefícios que viabiliza contratação de operadoras de renome com condições especiais para profissionais.',
    badge: 'Administradora',
    featured: false,
    active: true,
    order: 13,
    highlightBenefit: 'Condições por conselhos e entidades de classe',
  },
  {
    id: 'blue',
    name: 'Blue Med Saúde',
    slug: 'blue',
    category: 'individual',
    modalities: 'Individual, Familiar e PME',
    coverage: 'Regional SP e RJ',
    description: 'Planos flexíveis com foco em atendimento humanizado e assistência médica contínua.',
    badge: 'Flexibilidade',
    featured: false,
    active: true,
    order: 14,
    highlightBenefit: 'Planos com e sem coparticipação',
  },
  {
    id: 'samoc',
    name: 'Samoc Saúde',
    slug: 'samoc',
    category: 'individual',
    modalities: 'Individual, Familiar e Sênior',
    coverage: 'Rio de Janeiro',
    description: 'Tradição médica no RJ com rede ambulatorial e hospitalar voltada ao cuidado familiar.',
    badge: 'Tradicional RJ',
    featured: false,
    active: true,
    order: 15,
    highlightBenefit: 'Centros médicos dedicados no Rio',
  },
  {
    id: 'hsmed',
    name: 'HSMED',
    slug: 'hsmed',
    category: 'odonto',
    modalities: 'Planos de Saúde e Odontológicos',
    coverage: 'RJ e Região Metropolitana',
    description: 'Soluções integradas em saúde e odontologia com foco em prevenção e atendimento de qualidade.',
    badge: 'Saúde & Odonto',
    featured: false,
    active: true,
    order: 16,
    highlightBenefit: 'Planos combinados saúde + odonto',
  },
];

export const DEFAULT_CAMPAIGNS: Campaign[] = [
  {
    id: 'campanha-pme',
    title: 'Planos de Saúde Empresariais & PME RJ/SP',
    slug: 'plano-empresarial',
    headline: 'Economia e Tranquilidade para sua Empresa',
    subheadline: 'Reduza os custos do plano de saúde corporativo em até 30% sem perder a qualidade da rede credenciada.',
    targetAudience: 'Empresas, MEIs e PMEs a partir de 2 vidas',
    planType: 'Empresarial / PME',
    active: true,
    utmSource: 'google_ads',
    utmMedium: 'cpc',
    utmCampaign: 'pme_saude_rj',
    viewsCount: 142,
    leadsCount: 18,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'campanha-senior',
    title: 'Planos de Saúde Sênior Especializados',
    slug: 'plano-senior',
    headline: 'Cuidado Dedicado para a Melhor Idade',
    subheadline: 'Orientação especializada para encontrar planos com medicina preventiva, geriatras de referência e carências reduzidas.',
    targetAudience: 'Público 49+, 60+ e familiares responsáveis',
    planType: 'Plano Sênior',
    active: true,
    utmSource: 'instagram',
    utmMedium: 'bio',
    utmCampaign: 'senior_niteroi',
    viewsCount: 215,
    leadsCount: 27,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'campanha-familiar',
    title: 'Planos Familiares com Aproveitamento de Carência',
    slug: 'plano-familiar',
    headline: 'Proteção Completa para Quem Você Mais Ama',
    subheadline: 'Análise gratuita do seu plano atual para migração segura aproveitando carências já cumpridas.',
    targetAudience: 'Famílias residentes em Niterói, RJ e SP',
    planType: 'Plano Familiar',
    active: true,
    utmSource: 'whatsapp',
    utmMedium: 'compartilhamento',
    utmCampaign: 'familiar_carencia',
    viewsCount: 98,
    leadsCount: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'campanha-odonto',
    title: 'Planos Odontológicos Completos',
    slug: 'plano-odontologico',
    headline: 'Sorria com Segurança e Cobertura Integral',
    subheadline: 'Consultas, limpezas, emergências e tratamentos especializados para você, sua família ou empresa.',
    targetAudience: 'Pessoas físicas e jurídicas',
    planType: 'Plano Odontológico',
    active: true,
    utmSource: 'facebook',
    utmMedium: 'ads',
    utmCampaign: 'odonto_promo',
    viewsCount: 64,
    leadsCount: 9,
    createdAt: new Date().toISOString(),
  },
];

// Lead Management
export async function createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const path = 'leads';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...leadData,
      status: 'Novo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function getLeads(): Promise<Lead[]> {
  const path = 'leads';
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(150));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead));
  } catch (error) {
    console.warn('Could not read leads remotely, returning empty or error context', error);
    return [];
  }
}

export async function updateLeadStatus(leadId: string, status: Lead['status'], adminNotes?: string): Promise<void> {
  const path = `leads/${leadId}`;
  try {
    const ref = doc(db, 'leads', leadId);
    const updatePayload: Record<string, any> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (adminNotes !== undefined) {
      updatePayload.adminNotes = adminNotes;
    }
    await updateDoc(ref, updatePayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteLead(leadId: string): Promise<void> {
  const path = `leads/${leadId}`;
  try {
    await deleteDoc(doc(db, 'leads', leadId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Operators Management
export async function getOperators(): Promise<Operator[]> {
  const path = 'operators';
  try {
    const snapshot = await getDocs(collection(db, path));
    if (snapshot.empty) {
      return DEFAULT_OPERATORS;
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Operator));
  } catch (error) {
    console.warn('Fallback to default operators:', error);
    return DEFAULT_OPERATORS;
  }
}

export async function saveOperator(operator: Operator): Promise<void> {
  const path = `operators/${operator.id}`;
  try {
    await setDoc(doc(db, 'operators', operator.id), {
      ...operator,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Site Settings Management
export async function getSiteSettings(): Promise<SiteSettings> {
  const path = 'siteSettings/global';
  try {
    const snapshot = await getDoc(doc(db, 'siteSettings', 'global'));
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as SiteSettings;
    }
    return DEFAULT_SITE_SETTINGS;
  } catch (error) {
    console.warn('Fallback to default settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const path = 'siteSettings/global';
  try {
    await setDoc(doc(db, 'siteSettings', 'global'), {
      ...settings,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Campaigns Management
export async function getCampaigns(): Promise<Campaign[]> {
  const path = 'campaigns';
  try {
    const snapshot = await getDocs(collection(db, path));
    if (snapshot.empty) {
      return DEFAULT_CAMPAIGNS;
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Campaign));
  } catch (error) {
    console.warn('Fallback to default campaigns:', error);
    return DEFAULT_CAMPAIGNS;
  }
}

export async function saveCampaign(campaign: Campaign): Promise<void> {
  const path = `campaigns/${campaign.id}`;
  try {
    await setDoc(doc(db, 'campaigns', campaign.id), campaign);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Analytics Event Recording
export async function recordEvent(event: Omit<AnalyticsEvent, 'timestamp'>): Promise<void> {
  const path = 'analyticsEvents';
  try {
    await addDoc(collection(db, path), {
      ...event,
      timestamp: new Date().toISOString(),
    });
  } catch {
    // Non-blocking for client experience
  }
}
