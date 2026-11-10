# CATÁLOGO DE COMPONENTES & WEB DESIGNER SKILLS (EXPANDIDO)
## SITE PREMIUM — CONSULTOR BALTAZAR | PLANOS DE SAÚDE E SEGUROS

Este documento detalha o ecossistema completo de efeitos visuais, componentes interativos e padrões de engenharia frontend aplicados ao projeto de Diogo Baltazar.

---

## 1. Bibliotecas de Inspiração & Frameworks Visuais

| Biblioteca | URL Oficial | Utilização no Projeto |
|---|---|---|
| **Magic UI** | https://magicui.design/ | `BorderBeam.tsx` (borda animada com feixe de luz), microinterações |
| **Aceternity UI** | https://ui.aceternity.com/ | Inspiração para spotlight sutil, ambient glow e grids contrastantes |
| **React Bits** | https://www.reactbits.dev/ | Animações de contadores (`AnimatedCounter.tsx`), física de partículas |
| **Tailwind CSS v4** | https://tailwindcss.com/ | Estilização utilitária atômica, zero CSS inline, alta performance |
| **Lucide Icons** | https://lucide.dev/ | Iconografia consistente, limpa e padronizada |
| **Canvas Confetti** | https://www.npmjs.com/package/canvas-confetti | Comemoração de conversão ao submeter cotação |

---

## 2. Princípios de Performance: "Rápido, Leve e Robusto"

Para garantir que o site seja **extremamente rápido e leve**, mesmo com efeitos visuais avançados:
1. **Zero bibliotecas pesadas de 3D (sem Three.js/WebGL volumoso)**: Todo o efeito de partículas é renderizado em um elemento `<canvas>` nativo 2D com menos de 3KB de código.
2. **Pausa Automática em Segundo Plano**: O `ParticlesCanvas` utiliza a API nativa `IntersectionObserver` para pausar os loops de animação (`requestAnimationFrame`) quando a seção do Hero rolar para fora da tela.
3. **Aceleração por Hardware (GPU)**: As animações utilizam `transform`, `opacity` e `offset-path` (CSS puro), evitando `reflow` e `repaint` no DOM.
4. **Zero-Pill Discipline**: Tipografia limpa, hierarquia forte e ausência de caixas artificiais para dados textuais.

---

## 3. Catálogo de Efeitos e Componentes Instalados

### 3.1 `ParticlesCanvas.tsx`
- **Categoria**: Fundo Animado / Partículas Sutis
- **Localização**: `src/components/ui/ParticlesCanvas.tsx`
- **Descrição**: Cria uma rede estelar sutil em tom dourado (`rgba(200, 164, 93, 0.3)`) com conexões elásticas entre nós próximos.
- **Performance**: Executa a 60fps constantes sem travamento em dispositivos móveis.

### 3.2 `SpotlightCard.tsx` (Iluminação Radial de Cursor)
- **Categoria**: Efeito de Profundidade e Interação (Aceternity UI Pattern)
- **Localização**: `src/components/ui/SpotlightCard.tsx`
- **Descrição**: Acompanha as coordenadas `(x, y)` do mouse dentro do cartão para renderizar um feixe suave e refinado de luz que destaca os detalhes de cada plano ou operadora.

### 3.3 `BorderBeam.tsx`
- **Categoria**: Iluminação em Borda (Magic UI Pattern)
- **Localização**: `src/components/ui/BorderBeam.tsx`
- **Descrição**: Um feixe gradiente itinerante que percorre o contorno do cartão profissional de Diogo Baltazar utilizando `offset-path: rect()`.
- **Efeito Visual**: Destaque de alta sofisticação sem poluição visual.

### 3.4 `Hero.tsx` Inovador (Diagnóstico Instantâneo & Word Cycler)
- **Categoria**: Hero Interativo de Alta Conversão
- **Localização**: `src/components/Hero.tsx`
- **Recursos Inovadores**:
  - **Word Cycler**: Transição suave contínua das propostas de valor na manchete principal.
  - **Diagnostic Profile Switcher**: O visitante clica em PME, Familiar, Sênior ou Individual e o Hero adapta em tempo real os benefícios, operadoras sugeridas e o botão de ação.
  - **Interactive Consultant Card**: O card de Diogo Baltazar inclui status de atendimento online em tempo real e chips rápidos de perguntas frequentes que geram mensagens prontas no WhatsApp com 1 clique.

### 3.3 `AnimatedCounter.tsx`
- **Categoria**: Tipografia e Métricas Vivas
- **Localização**: `src/components/ui/AnimatedCounter.tsx`
- **Descrição**: Contador numérico progressivo com curva de desaceleração suave (`easeOutCubic`) que dispara quando entra na tela.
- **Valores**: +16 Operadoras, até 40% de Economia, 100% Gratuito.

### 3.4 `InteractiveCalculator.tsx` (Simulador de Economia em Tempo Real)
- **Categoria**: Ferramenta de Conversão Interativa
- **Localização**: `src/components/ui/InteractiveCalculator.tsx`
- **Descrição**: Simulador em página que permite ao visitante selecionar o perfil (PME, Familiar, Individual, Sênior), regular o slider de vidas (1 a 15+) e alternar tipo de acomodação (Apartamento/Enfermaria) e coparticipação.
- **Resultado em Tempo Real**: Calcula a mensalidade por vida estimada, a economia anual estimada e lista as operadoras mais recomendadas com botão de cotação direta.

### 3.5 `ComparisonMatrixModal.tsx` (Matriz Comparativa de Planos)
- **Categoria**: Tabela Comparativa Lado a Lado
- **Localização**: `src/components/ui/ComparisonMatrixModal.tsx`
- **Descrição**: Modal interativo que compara Individual vs Familiar vs PME vs Sênior em quesitos essenciais: carências, exigência de CNPJ, inclusão de dependentes e custo relativo.

### 3.6 `ProcessStepsTimeline.tsx`
- **Categoria**: Linha do Tempo Editorial
- **Localização**: `src/components/ui/ProcessStepsTimeline.tsx`
- **Descrição**: Demonstra as 4 etapas do atendimento consultivo com clareza (Diagnóstico, Comparativo, Portabilidade ANS e Pós-Venda).

### 3.7 `TestimonialsMarquee.tsx`
- **Categoria**: Prova Social & Casos de Sucesso
- **Localização**: `src/components/ui/TestimonialsMarquee.tsx`
- **Descrição**: Cartões de clientes reais atendidos em Niterói, Icaraí e Rio de Janeiro com classificação de 5 estrelas e detalhes de migração/portabilidade.

### 3.8 `QuoteWizardModal.tsx`
- **Categoria**: Formulário Multi-Etapas & Smart Lead Engine
- **Localização**: `src/components/QuoteWizardModal.tsx`
- **Descrição**: Wizard de 4 passos com validação em tempo real, envio direto ao Firebase Firestore, confetes (`canvas-confetti`) e link pré-formatado para o WhatsApp de Diogo Baltazar: `(21) 96535-2050`.

---

## 4. Recomendações para Extensões Futuras
- Adicionar cálculo de reembolso médio para planos corporativos premium (Omint, Bradesco Top Nacional, Porto Diamante).
- Integrar leitor de QR Code para compartilhamento imediato em reuniões presenciais em Niterói e RJ.
