import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  LogOut, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Megaphone, 
  Building2, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  ArrowLeft, 
  X, 
  TrendingUp, 
  Eye, 
  Copy, 
  Check, 
  Sparkles, 
  Image as ImageIcon 
} from 'lucide-react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  getLeads, 
  updateLeadStatus, 
  deleteLead, 
  getOperators, 
  saveOperator, 
  getSiteSettings, 
  saveSiteSettings, 
  getCampaigns, 
  saveCampaign, 
  Lead, 
  Operator, 
  SiteSettings, 
  Campaign 
} from '../firebase';

interface AdminPanelProps {
  onClose: () => void;
  siteSettings: SiteSettings;
  onRefreshSettings: () => void;
  onOpenCampaign: (campaign: Campaign) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onClose,
  siteSettings,
  onRefreshSettings,
  onOpenCampaign,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loginEmail, setLoginEmail] = useState<string>('admin@x.com');
  const [loginPassword, setLoginPassword] = useState<string>('admin4321');
  const [authError, setAuthError] = useState<string | null>(null);

  // Tabs: 'dashboard' | 'leads' | 'content' | 'operators' | 'campaigns' | 'media'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'content' | 'operators' | 'campaigns' | 'media'>('dashboard');

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsFilter, setLeadsFilter] = useState<string>('Todos');
  const [leadsSearch, setLeadsSearch] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadStatusToUpdate, setLeadStatusToUpdate] = useState<Lead['status']>('Novo');
  const [leadNotesToUpdate, setLeadNotesToUpdate] = useState<string>('');

  // Operators state
  const [operators, setOperators] = useState<Operator[]>([]);
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null);
  const [isAddingOperator, setIsAddingOperator] = useState<boolean>(false);

  // Settings state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(siteSettings);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Campaigns state
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newCampaignTitle, setNewCampaignTitle] = useState<string>('');
  const [newCampaignSlug, setNewCampaignSlug] = useState<string>('');
  const [newCampaignPlan, setNewCampaignPlan] = useState<string>('Empresarial / PME');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Listen to auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email || 'Administrador');
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch data on login
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    const [fetchedLeads, fetchedOperators, fetchedCampaigns, fetchedSettings] = await Promise.all([
      getLeads(),
      getOperators(),
      getCampaigns(),
      getSiteSettings(),
    ]);

    // Provide rich sample leads if freshly initialized database
    if (fetchedLeads.length === 0) {
      setLeads([
        {
          id: 'lead-sample-1',
          name: 'Renata Vasconcellos',
          phone: '(21) 98765-4321',
          email: 'renata@exemplo.com.br',
          city: 'Niterói',
          state: 'RJ',
          planType: 'Empresarial / PME',
          beneficiariesCount: 4,
          companyName: 'Vasconcellos Arquitetura Ltda',
          companyLives: '4 vidas (2 sócios + 2 estagiários)',
          accommodation: 'Apartamento',
          coparticipation: 'Com coparticipação',
          preferredOperators: 'Porto Saúde, SulAmérica',
          notes: 'Possui MEI há 1 ano e deseja migrar do plano individual.',
          status: 'Novo',
          source: 'site_organico',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: 'lead-sample-2',
          name: 'Marcos Aurelio Mendes',
          phone: '(21) 99812-3456',
          email: 'marcos.mendes@gmail.com',
          city: 'Rio de Janeiro',
          state: 'RJ',
          planType: 'Plano Sênior',
          beneficiariesCount: 2,
          ageGroups: 'Titular 64 anos, esposa 61 anos',
          accommodation: 'Apartamento',
          notes: 'Interesse especial em rede preventiva em Niterói ou Botafogo (MedSênior ou Prevent).',
          status: 'Em atendimento',
          source: 'campanha_plano-senior',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
        {
          id: 'lead-sample-3',
          name: 'Mariana Duarte',
          phone: '(21) 97123-9988',
          city: 'Niterói',
          state: 'RJ',
          planType: 'Plano Familiar',
          beneficiariesCount: 3,
          ageGroups: 'Casal 34 anos, filho 3 anos',
          accommodation: 'Apartamento',
          preferredOperators: 'Amil, Unimed',
          status: 'Cotação enviada',
          source: 'instagram_bio',
          createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        },
      ]);
    } else {
      setLeads(fetchedLeads);
    }

    setOperators(fetchedOperators);
    setCampaigns(fetchedCampaigns);
    setSettingsForm(fetchedSettings);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    // Verified master admin credentials requested by master prompt
    if (loginEmail === 'admin@x.com' && loginPassword === 'admin4321') {
      setIsAuthenticated(true);
      setUserEmail('admin@x.com (Master Diogo Baltazar)');
      return;
    }
    setAuthError('Credenciais inválidas. Verifique o e-mail ou utilize o login com conta Google.');
  };

  const handleGoogleLogin = async () => {
    setAuthError(null);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setIsAuthenticated(true);
      setUserEmail(res.user.email || 'Admin');
    } catch (err) {
      console.error(err);
      setAuthError('Falha na autenticação Google. Você pode entrar com as credenciais master.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {
      // safe fallback
    }
    setIsAuthenticated(false);
  };

  // Lead actions
  const handleOpenLeadModal = (lead: Lead) => {
    setSelectedLead(lead);
    setLeadStatusToUpdate(lead.status);
    setLeadNotesToUpdate(lead.adminNotes || '');
  };

  const handleSaveLeadUpdates = async () => {
    if (!selectedLead?.id) return;
    try {
      await updateLeadStatus(selectedLead.id, leadStatusToUpdate, leadNotesToUpdate);
      setLeads((prev) =>
        prev.map((l) =>
          l.id === selectedLead.id
            ? { ...l, status: leadStatusToUpdate, adminNotes: leadNotesToUpdate }
            : l
        )
      );
      setSelectedLead(null);
    } catch (err) {
      console.error('Falha ao atualizar lead:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Deseja realmente excluir este lead permanentemente?')) return;
    try {
      await deleteLead(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
    } catch (err) {
      console.error('Falha ao excluir lead:', err);
    }
  };

  // Export leads to CSV
  const exportLeadsCsv = () => {
    const headers = ['ID', 'Data', 'Nome', 'WhatsApp', 'Email', 'Cidade', 'Estado', 'Modalidade', 'Vidas', 'Status', 'Origem', 'Notas_Admin'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleDateString('pt-BR'),
      `"${l.name.replace(/"/g, '""')}"`,
      l.phone,
      l.email || '',
      `"${l.city}"`,
      l.state,
      `"${l.planType}"`,
      l.beneficiariesCount,
      l.status,
      l.source,
      `"${(l.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_consultor_baltazar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Content save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccessMsg(null);
    try {
      await saveSiteSettings(settingsForm);
      setSaveSuccessMsg('Configurações salvas no Firestore com sucesso!');
      onRefreshSettings();
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err) {
      console.error('Falha ao salvar configurações:', err);
    }
  };

  // Operator save
  const handleSaveOperator = async (op: Operator) => {
    try {
      await saveOperator(op);
      setOperators((prev) => {
        const exists = prev.some((o) => o.id === op.id);
        if (exists) {
          return prev.map((o) => (o.id === op.id ? op : o));
        }
        return [...prev, op];
      });
      setEditingOperator(null);
      setIsAddingOperator(false);
    } catch (err) {
      console.error('Falha ao salvar operadora:', err);
    }
  };

  // Campaign create
  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignTitle.trim() || !newCampaignSlug.trim()) return;

    const formattedSlug = newCampaignSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      title: newCampaignTitle.trim(),
      slug: formattedSlug,
      headline: `Planos de Saúde ${newCampaignTitle}`,
      subheadline: 'Análise consultiva completa e as melhores tabelas de operadoras no Rio e Niterói.',
      targetAudience: 'Público Geral RJ e SP',
      planType: newCampaignPlan,
      active: true,
      utmSource: 'campanha_custom',
      utmMedium: 'link',
      utmCampaign: formattedSlug,
      viewsCount: 0,
      leadsCount: 0,
      createdAt: new Date().toISOString(),
    };

    await saveCampaign(newCamp);
    setCampaigns((prev) => [newCamp, ...prev]);
    setNewCampaignTitle('');
    setNewCampaignSlug('');
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = leadsFilter === 'Todos' || lead.status === leadsFilter;
    const matchesSearch =
      !leadsSearch ||
      lead.name.toLowerCase().includes(leadsSearch.toLowerCase()) ||
      lead.phone.includes(leadsSearch) ||
      lead.city.toLowerCase().includes(leadsSearch.toLowerCase()) ||
      lead.planType.toLowerCase().includes(leadsSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate KPIs
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'Novo').length;
  const inProgressCount = leads.filter((l) => l.status === 'Em atendimento' || l.status === 'Cotação enviada' || l.status === 'Em negociação').length;
  const convertedCount = leads.filter((l) => l.status === 'Convertido').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedCount / totalLeads) * 100) : 0;

  // Render Login view if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-[#071B35] p-6 text-white text-center">
            <img
              src="https://i.postimg.cc/5tywzMpf/Logo-3D-Baltazar-Consultoria-de-Saude.png"
              alt="Baltazar Consultoria de Saúde"
              className="h-14 w-auto max-w-[240px] mx-auto mb-2 object-contain drop-shadow-md"
            />
            <p className="text-xs text-[#C8A45D] font-bold uppercase tracking-wider">
              Painel Administrativo Restrito
            </p>
          </div>

          <div className="p-6">
            {authError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                {authError}
              </div>
            )}

            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  E-mail de Acesso
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Senha Master
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#071B35] hover:bg-[#123D70] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
              >
                Entrar com Credenciais Master
              </button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">ou</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Entrar com Conta Google</span>
            </button>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={onClose}
                className="hover:text-slate-700"
              >
                Voltar ao site público
              </button>
              <span>Acesso restrito</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col overflow-hidden">
      {/* Top Admin Header */}
      <header className="bg-[#071B35] text-white border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="https://i.postimg.cc/5tywzMpf/Logo-3D-Baltazar-Consultoria-de-Saude.png"
            alt="Baltazar Consultoria de Saúde"
            className="h-11 w-auto object-contain drop-shadow-sm"
          />
          <div className="border-l border-white/15 pl-3">
            <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>Painel Administrativo</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                Firebase Conectado
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">{userEmail}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ver Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors"
            title="Sair do painel"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Admin Body */}
      <div className="flex-1 flex overflow-hidden bg-slate-100">
        {/* Sidebar Nav */}
        <aside className="w-60 bg-white border-r border-slate-200 p-3 space-y-1 shrink-0 hidden md:block overflow-y-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-[#071B35] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard & Métricas</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'leads'
                ? 'bg-[#071B35] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Gestão de Leads (CRM)</span>
            </div>
            {newLeadsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#C8A45D] text-[#071B35] text-[10px] font-bold flex items-center justify-center">
                {newLeadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'content'
                ? 'bg-[#071B35] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Conteúdo & Contatos</span>
          </button>

          <button
            onClick={() => setActiveTab('operators')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'operators'
                ? 'bg-[#071B35] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Catálogo de Operadoras</span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'campaigns'
                ? 'bg-[#071B35] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Campanhas & Landing Pages</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'media'
                ? 'bg-[#071B35] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Arquivos & Mídia</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Mobile Tab Select */}
          <div className="md:hidden mb-4">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
            >
              <option value="dashboard">Dashboard & Métricas</option>
              <option value="leads">Gestão de Leads ({leads.length})</option>
              <option value="content">Conteúdo & Contatos</option>
              <option value="operators">Catálogo de Operadoras</option>
              <option value="campaigns">Campanhas & Landing Pages</option>
              <option value="media">Arquivos & Mídia</option>
            </select>
          </div>

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Visão Geral de Desempenho</h3>
                <p className="text-xs text-slate-500">Métricas em tempo real de captação e cotações.</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#071B35]" />
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total de Leads</div>
                  <div className="text-3xl font-black text-[#071B35] mt-1.5">{totalLeads}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">Registrados no Firestore</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#C8A45D]" />
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Novas Cotações</div>
                  <div className="text-3xl font-black text-[#C8A45D] mt-1.5">{newLeadsCount}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Aguardando 1º contato</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#123D70]" />
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Em Negociação</div>
                  <div className="text-3xl font-black text-[#123D70] mt-1.5">{inProgressCount}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">Cotação enviada / análise</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Taxa de Conversão</div>
                  <div className="text-3xl font-black text-emerald-600 mt-1.5">{conversionRate}%</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">{convertedCount} clientes fechados</div>
                </div>
              </div>

              {/* Breakdown tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Modalidades mais procuradas */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Demanda por Modalidade de Plano</h4>
                  <div className="space-y-2 text-xs">
                    {['Empresarial / PME', 'Plano Familiar', 'Plano Individual', 'Plano Sênior', 'Plano Odontológico', 'Seguros'].map((type) => {
                      const count = leads.filter((l) => l.planType === type).length;
                      const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                      return (
                        <div key={type} className="space-y-1">
                          <div className="flex justify-between text-slate-700">
                            <span className="font-medium">{type}</span>
                            <span className="text-slate-500">{count} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#071B35] h-full" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status Breakdown */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Funil de Atendimento (Status)</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { status: 'Novo', color: 'bg-amber-500' },
                      { status: 'Em atendimento', color: 'bg-blue-500' },
                      { status: 'Cotação enviada', color: 'bg-purple-500' },
                      { status: 'Convertido', color: 'bg-emerald-500' },
                      { status: 'Não convertido', color: 'bg-slate-400' },
                    ].map((item) => {
                      const count = leads.filter((l) => l.status === item.status).length;
                      const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                      return (
                        <div key={item.status} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                            <span className="font-medium text-slate-800">{item.status}</span>
                          </div>
                          <span className="font-bold text-slate-700">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CRM / LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Central de Atendimento & Cotações</h3>
                  <p className="text-xs text-slate-500">Gerencie todos os contatos recebidos com envio direto ao WhatsApp.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={exportLeadsCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Pesquisar por nome, WhatsApp, cidade ou modalidade..."
                    value={leadsSearch}
                    onChange={(e) => setLeadsSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={leadsFilter}
                    onChange={(e) => setLeadsFilter(e.target.value)}
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                  >
                    <option value="Todos">Todos os Status</option>
                    <option value="Novo">Novo</option>
                    <option value="Em atendimento">Em atendimento</option>
                    <option value="Cotação enviada">Cotação enviada</option>
                    <option value="Convertido">Convertido</option>
                    <option value="Não convertido">Não convertido</option>
                  </select>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="py-3 px-4">Nome & Contato</th>
                        <th className="py-3 px-4">Modalidade & Vidas</th>
                        <th className="py-3 px-4">Local</th>
                        <th className="py-3 px-4">Data</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            Nenhuma cotação encontrada para estes filtros.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => {
                          const whatsappDirect = lead.phone.replace(/\D/g, '');
                          const defaultMsg = `Olá, ${lead.name}! Sou Diogo Baltazar, consultor de planos de saúde. Recebi sua solicitação de cotação para ${lead.planType} e preparei uma proposta personalizada. Podemos conversar?`;
                          return (
                            <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-900">{lead.name}</div>
                                <div className="text-[11px] text-slate-500">{lead.phone}</div>
                                {lead.companyName && (
                                  <div className="text-[10px] text-blue-600 font-medium">{lead.companyName}</div>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-medium text-slate-800">{lead.planType}</span>
                                <div className="text-[11px] text-slate-400">{lead.beneficiariesCount} vida(s)</div>
                              </td>
                              <td className="py-3 px-4 text-slate-600">
                                {lead.city}/{lead.state}
                              </td>
                              <td className="py-3 px-4 text-slate-500">
                                {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                    lead.status === 'Novo'
                                      ? 'bg-amber-100 text-amber-800'
                                      : lead.status === 'Convertido'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : lead.status === 'Em atendimento'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {lead.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right space-x-1.5">
                                <a
                                  href={`https://wa.me/55${whatsappDirect}?text=${encodeURIComponent(defaultMsg)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded border border-emerald-200 text-[11px] font-semibold transition-colors"
                                  title="Iniciar conversa no WhatsApp com template"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>WhatsApp</span>
                                </a>

                                <button
                                  onClick={() => handleOpenLeadModal(lead)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded text-[11px] font-semibold transition-colors"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Editar</span>
                                </button>

                                <button
                                  onClick={() => lead.id && handleDeleteLead(lead.id)}
                                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                                  title="Excluir lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTENT & SETTINGS */}
          {activeTab === 'content' && (
            <div className="space-y-4 max-w-3xl">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Gerenciador de Conteúdo do Site</h3>
                <p className="text-xs text-slate-500">
                  Atualize textos institucionais, telefones, WhatsApp e canais de atendimento.
                </p>
              </div>

              {saveSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Profissional</label>
                    <input
                      type="text"
                      value={settingsForm.consultantName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, consultantName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline Institucional</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>
                </div>

                {/* Logo URL with Live Preview */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">URL da Logo Oficial (PNG transparente 3D)</label>
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <input
                      type="url"
                      placeholder="https://i.postimg.cc/5tywzMpf/Logo-3D-Baltazar-Consultoria-de-Saude.png"
                      value={settingsForm.logoUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, logoUrl: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                    <div className="bg-[#071B35] p-2 rounded-lg border border-white/10 flex items-center justify-center shrink-0 min-w-[140px] h-12 shadow-inner">
                      <img
                        src={settingsForm.logoUrl || "https://i.postimg.cc/5tywzMpf/Logo-3D-Baltazar-Consultoria-de-Saude.png"}
                        alt="Preview Logo"
                        className="max-h-8 max-w-[130px] object-contain drop-shadow"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Comercial</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Telefone Comercial</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Instagram (@)</label>
                    <input
                      type="text"
                      value={settingsForm.instagram}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mensagem Padrão do WhatsApp</label>
                  <textarea
                    rows={2}
                    value={settingsForm.whatsappMessage}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappMessage: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Título Principal do Hero</label>
                  <input
                    type="text"
                    value={settingsForm.heroTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Texto de Apoio do Hero</label>
                  <textarea
                    rows={3}
                    value={settingsForm.heroSubtitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Cidade Sede</label>
                    <input
                      type="text"
                      value={settingsForm.city}
                      onChange={(e) => setSettingsForm({ ...settingsForm, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Regiões Atendidas</label>
                    <input
                      type="text"
                      value={settingsForm.coverageRegions}
                      onChange={(e) => setSettingsForm({ ...settingsForm, coverageRegions: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#071B35] hover:bg-[#123D70] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Alterações no Site</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: OPERATORS */}
          {activeTab === 'operators' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Gerenciador de Operadoras</h3>
                  <p className="text-xs text-slate-500">Cadastre, edite ou ative/desative marcas exibidas no site público.</p>
                </div>

                <button
                  onClick={() => {
                    setEditingOperator({
                      id: `op-${Date.now()}`,
                      name: '',
                      slug: '',
                      category: 'individual',
                      modalities: 'Individual, Familiar, PME',
                      coverage: 'RJ e SP',
                      description: '',
                      badge: 'Disponível',
                      featured: false,
                      active: true,
                      order: operators.length + 1,
                    });
                    setIsAddingOperator(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#071B35] hover:bg-[#123D70] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nova Operadora</span>
                </button>
              </div>

              {/* Operators List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {operators.map((op) => (
                  <div key={op.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-slate-900">{op.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${op.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                          {op.active ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">{op.modalities}</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{op.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                      <button
                        onClick={() => {
                          const updated = { ...op, active: !op.active };
                          handleSaveOperator(updated);
                        }}
                        className="text-xs text-slate-600 hover:text-slate-900"
                      >
                        {op.active ? 'Desativar' : 'Ativar'}
                      </button>

                      <button
                        onClick={() => {
                          setEditingOperator(op);
                          setIsAddingOperator(false);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#123D70] hover:text-[#071B35]"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Editar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CAMPAIGNS & LANDING PAGES */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Campanhas & Landing Pages Comerciais</h3>
                <p className="text-xs text-slate-500">
                  Crie páginas com URLs customizadas para campanhas no Instagram, Facebook, Google Ads ou WhatsApp.
                </p>
              </div>

              {/* Create Campaign Box */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  Criar Nova Landing Page de Campanha
                </h4>
                <form onSubmit={handleCreateCampaign} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Título da Campanha</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Planos Sênior Niterói"
                      value={newCampaignTitle}
                      onChange={(e) => {
                        setNewCampaignTitle(e.target.value);
                        setNewCampaignSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                      }}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Slug / URL Amigável</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: planos-senior-niteroi"
                      value={newCampaignSlug}
                      onChange={(e) => setNewCampaignSlug(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Modalidade em Destaque</label>
                    <div className="flex gap-2">
                      <select
                        value={newCampaignPlan}
                        onChange={(e) => setNewCampaignPlan(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="Empresarial / PME">Empresarial / PME</option>
                        <option value="Plano Familiar">Plano Familiar</option>
                        <option value="Plano Individual">Plano Individual</option>
                        <option value="Plano Sênior">Plano Sênior</option>
                        <option value="Plano Odontológico">Plano Odontológico</option>
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#071B35] text-white font-semibold text-xs rounded-lg hover:bg-[#123D70] transition-colors shrink-0"
                      >
                        Criar
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Campaign Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map((camp) => {
                  const landingUrl = `${window.location.origin}/?campanha=${camp.slug}`;
                  const isCopied = copiedSlug === camp.slug;
                  return (
                    <div key={camp.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-semibold text-[#123D70] bg-blue-50 px-2 py-0.5 rounded">
                            {camp.planType}
                          </span>
                          <h4 className="font-bold text-base text-slate-900 mt-1">{camp.title}</h4>
                          <p className="text-xs text-slate-500">{camp.targetAudience}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${camp.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                          {camp.active ? 'Ativa' : 'Pausada'}
                        </span>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
                        <span className="truncate mr-2">/?campanha={camp.slug}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(landingUrl);
                            setCopiedSlug(camp.slug);
                            setTimeout(() => setCopiedSlug(null), 2000);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-[#123D70] hover:text-[#071B35] shrink-0"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copiado!' : 'Copiar Link'}</span>
                        </button>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          {camp.leadsCount || 0} cotações geradas
                        </span>

                        <button
                          onClick={() => {
                            onClose();
                            onOpenCampaign(camp);
                          }}
                          className="inline-flex items-center gap-1 text-[#071B35] font-semibold hover:text-[#C8A45D]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Visualizar Landing Page</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: MEDIA / FILES */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Gerenciador de Arquivos & Mídia</h3>
                <p className="text-xs text-slate-500">
                  Armazenamento de imagens institucionais de Diogo Baltazar, logotipos de operadoras e banners.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Upload seguro de imagens para o armazenamento
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Suporte a PNG, JPG, WebP e SVG até 10MB
                    </p>
                  </div>
                  <label className="inline-block px-4 py-2 bg-[#071B35] text-white text-xs font-semibold rounded-lg hover:bg-[#123D70] cursor-pointer shadow-xs">
                    <span>Selecionar Arquivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          alert(`Arquivo "${file.name}" selecionado. Preparado para armazenamento.`);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-bold text-slate-900 mb-3">Ativos Padrão do Consultor:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                      <div className="w-10 h-10 rounded-lg bg-[#071B35] text-white flex items-center justify-center font-serif font-black mx-auto mb-2 text-sm">
                        DB
                      </div>
                      <span className="font-semibold text-slate-800 block text-[11px]">Avatar Diogo Baltazar</span>
                      <span className="text-[10px] text-slate-400">Padrão Institucional</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                      <div className="w-10 h-10 rounded-lg bg-[#C8A45D] text-[#071B35] flex items-center justify-center font-bold mx-auto mb-2 text-sm">
                        CB
                      </div>
                      <span className="font-semibold text-slate-800 block text-[11px]">Logotipo Baltazar</span>
                      <span className="text-[10px] text-slate-400">Versão Dourada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Lead Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100">
            <div className="bg-[#071B35] p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Atendimento do Lead: {selectedLead.name}</h3>
                <p className="text-xs text-[#C8A45D]">{selectedLead.planType} · {selectedLead.beneficiariesCount} vida(s)</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 grid grid-cols-2 gap-2 text-slate-700">
                <div>
                  <span className="text-slate-500 block">WhatsApp:</span>
                  <span className="font-semibold">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Localidade:</span>
                  <span className="font-semibold">{selectedLead.city}/{selectedLead.state}</span>
                </div>
                {selectedLead.companyName && (
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Empresa:</span>
                    <span className="font-semibold">{selectedLead.companyName}</span>
                  </div>
                )}
                {selectedLead.notes && (
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Mensagem do Cliente:</span>
                    <span className="text-slate-600">{selectedLead.notes}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status da Negociação</label>
                <select
                  value={leadStatusToUpdate}
                  onChange={(e) => setLeadStatusToUpdate(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Novo">Novo (Sem contato)</option>
                  <option value="Em atendimento">Em atendimento</option>
                  <option value="Aguardando retorno">Aguardando retorno do cliente</option>
                  <option value="Cotação enviada">Cotação enviada</option>
                  <option value="Em negociação">Em negociação</option>
                  <option value="Convertido">Convertido (Contrato Fechado)</option>
                  <option value="Não convertido">Não convertido / Declinado</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Anotações Internas do Consultor</label>
                <textarea
                  rows={3}
                  value={leadNotesToUpdate}
                  onChange={(e) => setLeadNotesToUpdate(e.target.value)}
                  placeholder="Ex: Liguei dia 10/11, cliente prefere Amil ou Porto. Aguarda retorno da esposa..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B35] resize-none"
                />
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleSaveLeadUpdates}
                className="px-5 py-2 bg-[#071B35] hover:bg-[#123D70] text-white font-semibold text-xs rounded-lg transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Operator Modal */}
      {editingOperator && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100">
            <div className="bg-[#071B35] p-5 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {isAddingOperator ? 'Nova Operadora' : `Editar: ${editingOperator.name}`}
              </h3>
              <button
                onClick={() => setEditingOperator(null)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nome da Operadora</label>
                <input
                  type="text"
                  required
                  value={editingOperator.name}
                  onChange={(e) => setEditingOperator({ ...editingOperator, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-') })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Categoria Principal</label>
                <select
                  value={editingOperator.category}
                  onChange={(e) => setEditingOperator({ ...editingOperator, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="todos">Todas as Modalidades</option>
                  <option value="empresarial">PME & Empresarial</option>
                  <option value="individual">Individual & Adesão</option>
                  <option value="senior">Público Sênior (49+)</option>
                  <option value="odonto">Odontológico</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Abrangência e Região</label>
                <input
                  type="text"
                  value={editingOperator.coverage}
                  onChange={(e) => setEditingOperator({ ...editingOperator, coverage: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Breve Descrição</label>
                <textarea
                  rows={2}
                  value={editingOperator.description}
                  onChange={(e) => setEditingOperator({ ...editingOperator, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Diferencial / Benefício Destacado</label>
                <input
                  type="text"
                  value={editingOperator.highlightBenefit || ''}
                  onChange={(e) => setEditingOperator({ ...editingOperator, highlightBenefit: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="opActive"
                  checked={editingOperator.active}
                  onChange={(e) => setEditingOperator({ ...editingOperator, active: e.target.checked })}
                  className="rounded text-[#071B35]"
                />
                <label htmlFor="opActive" className="text-xs text-slate-700 font-medium">
                  Operadora Ativa e Visível no Site Público
                </label>
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setEditingOperator(null)}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => handleSaveOperator(editingOperator)}
                className="px-5 py-2 bg-[#071B35] hover:bg-[#123D70] text-white font-semibold text-xs rounded-lg transition-colors"
              >
                Salvar Operadora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
