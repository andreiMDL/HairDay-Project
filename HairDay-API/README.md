# 💈 HairDay-API (Backend)

API Restful desenvolvida em Node.js puro para o sistema de agendamento de barbearia HairDay.

## Tecnologias

- Node.js
- Módulos nativos (HTTP, Crypto)
- bcryptjs (Para hashing de senhas)

## Rotas Principais

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/login` | Autenticação do usuário (verifica email/senha). |
| `POST` | `/users` | Cria um novo usuário (cliente). |
| `POST` | `/schedules` | Cria um novo agendamento, buscando o nome do cliente pelo `customer_id`. |
| `GET` | `/schedules` | Lista agendamentos. |
