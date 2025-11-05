# 💈 HairDay - Sistema de Agendamento Full-Stack

Um sistema de agendamento de barbearia full-stack construído do zero, focado em uma arquitetura limpa e segura. O projeto implementa um frontend reativo em Vue.js 3 (Composition API) e um backend RESTful em Node.js puro (sem frameworks), com autenticação JWT.

O projeto foi inspirado no desafio "HairDay" proposto pela [Rocketseat](https://www.rocketseat.com.br/).

### ⚠️ Aviso Importante: Testando a Aplicação (Cold Start)

O backend deste projeto está hospedado no plano gratuito do **Render**.

Isso significa que o servidor "dorme" após 15 minutos de inatividade. Ao acessar o projeto pela primeira vez (para fazer login ou cadastro), a requisição **pode levar de 30 a 40 segundos** para "acordar" a API.

Por favor, aguarde este tempo inicial. As requisições seguintes serão rápidas!

---

## ✨ Funcionalidades Principais

* **Autenticação de Usuário:** Cadastro e Login com validação robusta de formulário (formato de email e força de senha).
* **Segurança:** Senhas de usuário hasheadas com `bcryptjs` no backend.
* **Autorização:** Rotas da API protegidas com **JSON Web Token (JWT)**.
* **Agendamentos:**
    * Criação de agendamentos com validação de concorrência (o backend impede agendamentos duplicados no mesmo horário/barbeiro).
    * Listagem de agendamentos (filtrada por usuário logado e por data).
    * Cancelamento de agendamentos (autenticado).
* **Notificações por Email:** Envio automático de emails de confirmação e cancelamento usando **SendGrid**.
* **Design Responsivo:** Componentes separados para a experiência de Login/Cadastro em Desktop e Mobile.

## 🛠️ Stack de Tecnologias

Este projeto foi construído como um **Monorepo**, dividido em duas pastas principais:

### 1. Frontend (`HairDay/`)
* **Framework:** Vue 3 (Composition API)
* **Build Tool:** Vite
* **Roteamento:** Vue Router
* **Gerenciamento de Estado:** Pinia
* **Cliente HTTP:** Axios (com Interceptors para anexar o JWT automaticamente)
* **Utilitários:** `dayjs` (datas), `email-validator` (validação)
* **Hospedagem:** Vercel

### 2. Backend (`HairDay-API/`)
* **Core:** Node.js puro (módulo `http` nativo)
* **Autenticação:** `jsonwebtoken` (JWT), `bcryptjs` (Hashing)
* **Envio de Emails:** `@sendgrid/mail`
* **Variáveis de Ambiente:** `dotenv`
* **Banco de Dados (Atual):** `db.json` (Sistema de persistência local simulado com `fs` do Node)
* **Hospedagem:** Render

---

## 🏛️ Arquitetura e Decisões Técnicas

* **Backend "Raw" (Puro):** A API foi construída intencionalmente sem frameworks (como Express ou Fastify) para um entendimento profundo de como o Node.js lida com requisições HTTP, middlewares (CORS, Auth), parsing de body (JSON) e roteamento.
* **Frontend Limpo (Composables):** Toda a lógica de autenticação (validação, chamadas de API, tratamento de erro, estado do formulário) foi extraída para um *composable* (`useAuth.js`). Isso permite que os componentes `LoginFormDesktop.vue` e `LoginFormMobile.vue` sejam "limpos" e reutilizem 100% da lógica de negócio.
* **API Centralizada (Services):** Um *service* (`api.js`) centraliza a instância do Axios. Ele usa *interceptors* para anexar automaticamente o token JWT (`Authorization: Bearer ...`) em todas as requisições seguras, limpando a lógica dos componentes.

## 🚀 Como Rodar Localmente

O projeto é um monorepo. Você precisará de **dois terminais** abertos para rodar o frontend e o backend simultaneamente.

### 1. Backend (API)

```bash
# 1. Navegue até a pasta do backend
cd HairDay-API

# 2. Instale as dependências
npm install

# 3. Crie o arquivo .env
# (Copie as chaves do .env do Render)
# Você precisará no mínimo de:
# JWT_SECRET=...
# SENDGRID_API_KEY=...
# VERIFIED_SENDER_EMAIL=...

# 4. Inicie o servidor
npm run server
# (API estará rodando em http://localhost:3000)

# 1. Em um NOVO terminal, navegue até a pasta do frontend
cd HairDay

# 2. Instale as dependências
# Se você receber erros do ESLint/Airbnb, use:
npm install --legacy-peer-deps

# 3. Crie o arquivo .env
# Crie um .env na raiz do HairDay com a URL da sua API local
echo "VITE_API_URL=http://localhost:3000" > .env

# 4. Inicie o app
npm run dev
# (Aplicação estará rodando em http://localhost:5173)
