import { ModalidadeInfo } from '../types';

export const MODALIDADES_DATA: ModalidadeInfo[] = [
  {
    id: 'individual',
    title: 'Plano Individual e Adesão',
    subtitle: 'Proteção pessoal sob medida',
    description: 'Soluções pensadas para você que busca assistência médica de qualidade para si, seja por contratação direta ou coletivo por adesão através da sua categoria profissional.',
    targetAudience: 'Estudantes, profissionais liberais, autônomos e servidores públicos.',
    iconName: 'User',
    highlights: [
      'Aproveitamento de carências cumpridas',
      'Opções com cobertura regional RJ/SP ou nacional',
      'Acomodação em enfermaria ou apartamento privativo',
      'Com ou sem coparticipação inteligente'
    ],
    details: {
      comoFunciona: 'A contratação pode ser realizada diretamente com operadoras que oferecem planos individuais ou por intermédio de entidades de classe e administradoras de benefícios (coletivo por adesão), garantindo condições diferenciadas.',
      quemPodeContratar: 'Qualquer pessoa física, comprovando vínculo estudantil ou profissional (quando aplicável por adesão). Não exige CNPJ.',
      redeCredenciada: 'Acesso a consultórios, laboratórios renomados e hospitais de referência em Niterói, Rio de Janeiro e São Paulo.',
      carenciasEPortabilidade: 'Prazos legais da ANS (24h urgência, 30 dias consultas/exames simples, 180 dias internações). Realizamos estudo prévio para compra ou portabilidade de carências do seu plano anterior.',
      acomodacao: 'Opção de quarto coletivo (enfermaria, mais econômico) ou quarto individual (apartamento com direito a acompanhante).',
      coparticipacao: 'Você pode optar por planos tradicionais (mensalidade fixa integral) ou coparticipativos (mensalidade reduzida com pequenas taxas por procedimento utilizado).'
    },
    recommendedOperators: ['Amil', 'Assim Saúde', 'Unimed', 'Leve Saúde', 'Supermed']
  },
  {
    id: 'familiar',
    title: 'Plano Familiar',
    subtitle: 'Segurança e carinho para quem você ama',
    description: 'Garanta a tranquilidade de cônjuge, filhos e dependentes com planos estruturados para todas as fases da vida da sua família, unindo pediatria, maternidade e suporte completo.',
    targetAudience: 'Casais com ou sem filhos, famílias com dependentes de diferentes idades.',
    iconName: 'Users',
    highlights: [
      'Desconto progressivo por quantidade de beneficiários',
      'Cobertura obstétrica e pediátrica especializada',
      'Estudo unificado de carências para toda a família',
      'Programas de medicina preventiva familiar'
    ],
    details: {
      comoFunciona: 'Um único contrato engloba o titular e seus dependentes legais (cônjuge, companheiro, filhos, enteados ou dependentes econômicos), simplificando a gestão e gerando economia.',
      quemPodeContratar: 'Famílias com pelo menos 1 titular e dependentes comprovados conforme critérios da operadora selecionada.',
      redeCredenciada: 'Rede selecionada com hospitais infantis, maternidades de referência e prontos-socorros 24h próximos à sua residência.',
      carenciasEPortabilidade: 'Possibilidade de redução de carências mediante apresentação do histórico do plano de saúde anterior de todos os membros.',
      acomodacao: 'Apartamento privativo é altamente recomendado para famílias com crianças ou idosos, proporcionando privacidade e conforto.',
      coparticipacao: 'Pode ser configurado para atender a rotina da sua família, equilibrando o custo mensal e a frequência de uso.'
    },
    recommendedOperators: ['Amil', 'Assim Saúde', 'Unimed', 'Porto Saúde', 'SulAmérica']
  },
  {
    id: 'empresarial',
    title: 'Planos Empresariais & PME',
    subtitle: 'O melhor custo-benefício a partir de 2 vidas',
    description: 'Empresas, comércios, escritórios e profissionais com CNPJ (inclusive MEI) têm acesso às melhores tabelas do mercado, com redução expressiva em relação a contratos de pessoa física.',
    targetAudience: 'MEI (com + de 6 meses ativo), microempresas, PMEs e médias/grandes empresas (RJ e SP).',
    iconName: 'Building2',
    highlights: [
      'Valores até 30% a 40% menores que planos individuais',
      'Disponível a partir de 2 ou 3 vidas (sócios, dependentes ou funcionários)',
      'Isenção ou redução expressiva de carências',
      'Retenção de talentos e valorização da equipe'
    ],
    details: {
      comoFunciona: 'O contrato é firmado entre a pessoa jurídica e a operadora. Podem ser incluídos sócios, administradores, empregados registrados (CLT), estagiários e seus respectivos dependentes.',
      quemPodeContratar: 'Empresas ativas com CNPJ regular. MEIs necessitam ter no mínimo 6 meses de registro na Receita Federal para elegibilidade contratual.',
      redeCredenciada: 'Acesso às mais completas redes do país, incluindo hospitais de ponta como Copa D\'Or, Samaritano, Quinta D\'Or, Albert Einstein e Sírio-Libanês dependendo da categoria.',
      carenciasEPortabilidade: 'Contratos a partir de 30 vidas possuem isenção total de carências (inclusive parto e doenças preexistentes). Para PMEs (2 a 29 vidas), há tabelas promocionais de carência reduzida.',
      acomodacao: 'A empresa pode diferenciar a categoria de acomodação por nível hierárquico (ex: enfermaria para operacional e apartamento para diretoria).',
      coparticipacao: 'A coparticipação com limitador mensal é a ferramenta mais eficaz para controlar o reajuste anual por sinistralidade na sua empresa.'
    },
    recommendedOperators: ['Porto Saúde', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Unimed']
  },
  {
    id: 'senior',
    title: 'Plano para o Público Sênior',
    subtitle: 'Atenção, acolhimento e medicina preventiva 49+',
    description: 'Planos estruturados especificamente para as necessidades da melhor idade, com foco em programas preventivos, geriatria integrada, acompanhamento contínuo e sem limite máximo de idade.',
    targetAudience: 'Pessoas com 49 anos ou mais, idosos e filhos buscando a melhor assistência para seus pais.',
    iconName: 'HeartHandshake',
    highlights: [
      'Sem coparticipação para consultas e exames preventivos',
      'Oficinas de saúde, longevidade e nutrição',
      'Equipe multidisciplinar e geriatras dedicados',
      'Rede hospitalar adaptada à mobilidade e acolhimento'
    ],
    details: {
      comoFunciona: 'Operadoras especializadas como MedSênior, Prevent Senior e Leve Saúde oferecem planos focados no envelhecimento ativo e saudável, com unidades próprias de atendimento ambulatorial.',
      quemPodeContratar: 'Pessoas a partir de 49 anos de idade (dependendo da operadora) sem necessidade de vínculo com empresas.',
      redeCredenciada: 'Centros médicos de prevenção exclusivos no Rio, Niterói e São Paulo, além de leitos hospitalares especializados em geriatria.',
      carenciasEPortabilidade: 'Análise cuidadosa de aproveitamento de carências já cumpridas para evitar descontinuidade de tratamentos.',
      acomodacao: 'Opções em enfermaria ou apartamento, com instalações adaptadas para segurança e acessibilidade do paciente idoso.',
      coparticipacao: 'A maioria dos planos sênior prioriza a ausência de coparticipação em atendimentos preventivos, estimulando o cuidado constante.'
    },
    recommendedOperators: ['MedSênior', 'Prevent Senior', 'Leve Saúde', 'Assim Saúde']
  },
  {
    id: 'odonto',
    title: 'Planos Odontológicos',
    subtitle: 'A saúde começa pela boca com prevenção e estética',
    description: 'Garanta dentes saudáveis e um sorriso confiante com planos odontológicos completos para limpeza, restaurações, canal, gengiva, emergências 24h e ortodontia.',
    targetAudience: 'Indivíduos, famílias e empresas que desejam adicionar benefício dental.',
    iconName: 'Sparkles',
    highlights: [
      'Mensalidades extremamente acessíveis a partir de valores baixos',
      'Carência zero ou reduzida para consultas e emergências',
      'Ampla rede de dentistas credenciados em todo o RJ e SP',
      'Opções com cobertura ortodôntica (aparelho e manutenção)'
    ],
    details: {
      comoFunciona: 'Contratação simples com documentação simplificada. O beneficiário tem acesso imediato à rede de clínicas e consultórios credenciados.',
      quemPodeContratar: 'Pessoas físicas individuais, famílias ou empresas (com valores ainda menores por funcionário).',
      redeCredenciada: 'Clínicas odontológicas modernas e consultórios particulares credenciados próximos ao seu trabalho ou moradia.',
      carenciasEPortabilidade: 'Geralmente carência de 24h para urgências e emergências. Procedimentos como próteses simples e canal seguem regras da ANS.',
      acomodacao: 'Não se aplica a planos odontológicos ambulatoriais.',
      coparticipacao: 'Grande maioria opera sem coparticipação, facilitando idas regulares ao dentista.'
    },
    recommendedOperators: ['Amil Dental', 'Porto Odonto', 'SulAmérica Odonto', 'Bradesco Dental', 'HSMED']
  },
  {
    id: 'seguros',
    title: 'Seguros Pessoais e Corporativos',
    subtitle: 'Proteção patrimonial e familiar completa',
    description: 'Soluções complementares de proteção: Seguro de Vida com cobertura para doenças graves e invalidez, Seguro Auto, Seguro Residencial e Seguro Patrimonial Empresarial.',
    targetAudience: 'Profissionais autônomos, chefes de família, empresas e investidores.',
    iconName: 'ShieldCheck',
    highlights: [
      'Seguro de vida resgatável e tradicional',
      'Indenização em vida para diagnóstico de doenças graves',
      'Proteção financeira para a continuidade da família',
      'Consultoria de riscos patrimoniais'
    ],
    details: {
      comoFunciona: 'Estudo personalizado do seu patrimônio e perfil de risco para desenhar uma apólice sob medida, garantindo capital segurado compatível com sua renda e objetivos.',
      quemPodeContratar: 'Pessoas físicas de 18 a 70 anos e pessoas jurídicas buscando proteger sócios ou operações.',
      redeCredenciada: 'Parcerias com as maiores seguradoras do mercado brasileiro e global.',
      carenciasEPortabilidade: 'Prazos contratuais definidos na apólice (muitos sem carência para acidentes pessoais).',
      acomodacao: 'Não aplicável.',
      coparticipacao: 'Franquias personalizáveis conforme a modalidade de seguro escolhida.'
    },
    recommendedOperators: ['Porto Seguro', 'SulAmérica Seguros', 'Bradesco Seguros', 'Omint Seguros']
  }
];
