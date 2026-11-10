# CONSULTOR BALTAZAR — SITE INSTITUCIONAL PREMIUM & CRM
## Planos de Saúde, Odontológicos e Seguros (Niterói, RJ e SP)

Aplicação web completa desenvolvida para Diogo Baltazar, integrando presença digital de alto padrão, simulador inteligente de cotações, catálogo de operadoras, landing pages comerciais e Painel Administrativo com CRM e Firebase Firestore.

---

### 1. Como Instalar

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Instale todas as dependências
npm install
```

---

### 2. Como Configurar o Firebase

O projeto já está integrado à infraestrutura do Firebase Cloud Firestore e Authentication através do arquivo gerado automaticamente:
`firebase-applet-config.json`

O arquivo contém:
- `projectId`: Projeto provisionado no Google Cloud / Firebase.
- `apiKey`: Chave de API pública segura do Firebase Web.
- `authDomain`: Domínio de autenticação para login Google e credenciais.
- `firestoreDatabaseId`: ID da instância do Cloud Firestore.

---

### 3. Como Configurar o Firestore & Regras de Segurança

As regras de segurança estão em `firestore.rules`.
Elas implementam:
- **Default Deny**: Proteção completa contra leitura/escrita não autorizada.
- **Coleções Públicas com Leitura Livre**: `siteSettings`, `operators`, `campaigns`.
- **Criação de Leads e Eventos com Validação**: Validação estrita de tipos e tamanhos de campos.
- **Área do Administrador**: Somente contas autenticadas como administradores autorizados (`jessicaq2204@gmail.com`, `admin@x.com` ou cadastradas na coleção `/admins/`) possuem permissão de alteração ou leitura de dados de leads.

Para reimplantar regras:
```bash
firebase deploy --only firestore:rules
```

---

### 4. Como Configurar o Vercel Blob

Para armazenar fotos em alta resolução e documentos de operadoras na Vercel:
1. Acesse o painel da sua conta na Vercel.
2. Navegue até a aba **Storage** e crie um novo **Blob Store**.
3. Obtenha a variável `BLOB_READ_WRITE_TOKEN`.
4. Adicione às variáveis de ambiente da Vercel (`BLOB_READ_WRITE_TOKEN`).

---

### 5. Como Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz baseado no `.env.example`:

```env
GEMINI_API_KEY="SUA_CHAVE_OPCIONAL"
APP_URL="https://seu-dominio.com.br"
```

---

### 6. Como Acessar o Painel Administrativo

1. Clique no link discreto **"Painel Admin"** localizado no rodapé do site ou no menu móvel.
2. Credenciais master iniciais:
   - **E-mail**: `admin@x.com`
   - **Senha**: `admin4321`
3. Alternativamente, entre com sua conta Google (`jessicaq2204@gmail.com`).

No painel você poderá:
- Acompanhar gráficos de cotações e taxas de conversão.
- Filtrar e alterar status de leads (Novo, Em atendimento, Cotação enviada, Convertido).
- Iniciar conversa direta no WhatsApp com os dados do cliente em 1 clique.
- Exportar relatórios em formato CSV.
- Cadastrar novas operadoras e campanhas de anúncios.
- Alterar telefones, textos e cores do site.

---

### 7. Como Executar Localmente

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```
Acesse em: `http://localhost:3000`

---

### 8. Como Publicar na Vercel

```bash
# Instalar a CLI da Vercel (se necessário)
npm i -g vercel

# Realizar o deploy de produção
vercel --prod
```

Ou conecte seu repositório GitHub diretamente na plataforma da Vercel. O framework Vite com React será detectado automaticamente.

---

### 9. Como Conectar Domínio Próprio

1. No dashboard da Vercel (ou Cloud Run), vá em **Settings > Domains**.
2. Adicione seu domínio (ex: `consultorbaltazar.com.br` e `www.consultorbaltazar.com.br`).
3. Adicione os apontamentos DNS fornecidos (CNAME e Registro A) no seu provedor de domínio (Registro.br, GoDaddy, Cloudflare, etc.).

---

### 10. Como Testar as Integrações

1. Abra a página inicial e clique em **"Solicitar Minha Cotação"**.
2. Preencha uma cotação teste e envie.
3. Observe a animação de celebração e o botão de direcionamento para o WhatsApp do Diogo Baltazar (`(21) 96535-2050`).
4. Abra o **Painel Admin** no rodapé para visualizar a cotação registrada no Firestore em tempo real.
