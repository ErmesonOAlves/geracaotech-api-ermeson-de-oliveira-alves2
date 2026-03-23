# Geração Tech E-commerce API

API RESTful para gerenciamento de plataforma de e-commerce com gerenciamento completo de usuários, produtos e categorias.

---

## Sumário

- [Recursos](#recursos)
- [Tecnologias](#tecnologias)
- [Documentação da API](#documentação-da-api)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação](#autenticação)
- [Esquemas](#esquemas)
- [Testes](#testes)
- [Segurança](#segurança)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

---

## Recursos

- **Gerenciamento de Usuários**: Criação, atualização, exclusão e busca de usuários com paginação
- **Gerenciamento de Categorias**: CRUD completo de categorias de produtos
- **Gerenciamento de Produtos**: CRUD completo de produtos com suporte a múltiplas imagens e opções
- **Autenticação JWT**: Sistema de autenticação seguro com tokens de acesso
- **Documentação Interativa**: Swagger UI para exploração e teste dos endpoints
- **Testes Automatizados**: Suite de testes unitários e de integração com Jest
- **Banco de Dados**: PostgreSQL (Neon) com ORM Sequelize e transações para integridade de dados

---

## Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Banco de Dados | PostgreSQL (Neon) |
| ORM | Sequelize |
| Autenticação | JWT (JSON Web Tokens) |
| Hash de Senhas | Argon2 |
| Documentação | Swagger (OpenAPI 3.0) |
| Testes | Jest + Supertest |
| Validação | Custom Middlewares |

---

## Documentação da API

A documentação completa e interativa está disponível através do Swagger UI.

**URL**: `http://localhost:3099/api-docs`

Através do Swagger você pode:
- Visualizar todos os endpoints disponíveis
- Testar cada endpoint diretamente no navegador
- Ver os esquemas de requisição e resposta
- Verificar códigos de erro e suas descrições

---

## Pré-requisitos

- Node.js (v18+)
- PostgreSQL (via Neon)
- npm ou yarn

---

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/ErmesonOAlves/geracaotech-api-ermeson-de-oliveira-alves2

# Instalar dependências
npm install
```

---

## Configuração

Copie o arquivo de exemplo e configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Configure as seguintes variáveis no arquivo `.env`:

| Variável | Descrição |
|----------|------------|
| `PORT` | Porta do servidor (padrão: 3099) |
| `DB_HOST` | Host do banco de dados |
| `DB_USER` | Usuário do banco de dados |
| `DB_PASS` | Senha do banco de dados |
| `DB_NAME` | Nome do banco de dados |
| `JWT_SECRET` | Chave secreta para tokens JWT |
| `JWT_EXPIRES_IN` | Tempo de expiração do token |

---

## Executando o Projeto

### Sincronizar Banco de Dados

```bash
npm run db:sync
```

### Desenvolvimento (Hot Reload)

```bash
npm run dev
```

### Produção

```bash
npm start
```

---

## Endpoints da API

### Auth

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|-------------|
| POST | `/v1/user/token` | Gera token JWT para autenticação | Não |

### Usuários

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|-------------|
| GET | `/v1/user/search` | Lista usuários com paginação | Não |
| GET | `/v1/user/:id` | Busca usuário por ID | Não |
| POST | `/v1/user` | Cria novo usuário | Não |
| PUT | `/v1/user/:id` | Atualiza usuário | Sim |
| DELETE | `/v1/user/:id` | Remove usuário | Sim |

### Categorias

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|-------------|
| GET | `/v1/category/search` | Lista categorias com paginação | Não |
| GET | `/v1/category/:id` | Busca categoria por ID | Não |
| POST | `/v1/category` | Cria nova categoria | Sim |
| PUT | `/v1/category/:id` | Atualiza categoria | Sim |
| DELETE | `/v1/category/:id` | Remove categoria | Sim |

### Produtos

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|-------------|
| GET | `/v1/product/search` | Lista produtos com paginação | Não |
| GET | `/v1/product/:id` | Busca produto por ID | Não |
| POST | `/v1/product` | Cria novo produto | Sim |
| PUT | `/v1/product/:id` | Atualiza produto | Sim |
| DELETE | `/v1/product/:id` | Remove produto | Sim |

---

## Autenticação

A API utiliza autenticação Bearer Token (JWT). Para endpoints protegidos, inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

### Obter Token

Envie uma requisição POST para `/v1/user/token` com as credenciais:

```json
{
  "email": "usuario@exemplo.com",
  "password": "sua_senha"
}
```

---

## Esquemas

### UserTokenRequest

```json
{
  "email": "string",
  "password": "string"
}
```

### UserCreate

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

### UserUpdate

```json
{
  "name": "string",
  "email": "string"
}
```

### CategoryCreate

```json
{
  "name": "string"
}
```

### CategoryUpdate

```json
{
  "name": "string"
}
```

### ProductCreate

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "categoryId": "number"
}
```

### ProductUpdate

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "categoryId": "number"
}
```

---

## Testes

Execute a suite de testes:

```bash
npm test
```

Os testes cobrem:
- Validação de entrada
- Autenticação e autorização
- CRUD de recursos
- Casos de erro

---

## Segurança

- **Autenticação JWT**: Tokens com tempo de expiração configurável
- **Hash de Senhas**: Algoritmo Argon2 com pepper para proteção adicional
- **Transações SQL**: Garantia de integridade referencial
- **Validação de Entrada**: Sanitização e validação de todos os dados recebidos
- **Endpoints Protegidos**: operações de escrita requerem autenticação

---

## Estrutura do Projeto

```
src/
├── config/          # Configurações (DB, password)
├── controllers/     # Controladores das rotas
├── docs/           # Documentação Swagger
├── middlewares/     # Middlewares (autenticação)
├── models/          # Modelos Sequelize
├── routes/          # Definição de rotas
├── services/        # Lógica de negócio
├── scripts/         # Scripts utilitários
├── app.js          # Configuração do Express
└── server.js       # Inicialização do servidor
```

---

## Deploy

A aplicação está atualmente hospedada e disponível para uso sem necessidade de baixar o código:

- **Frontend (GitHub Pages)**: https://ermesonoalves.github.io/geracaotech-api-ermeson-de-oliveira-alves2/frontend.html
- **Backend API (Render)**: https://geracaotech-api-ermeson-de-oliveira.onrender.com

O frontend no GitHub Pages está configurado para conectar-se à API hospedada no Render, permitindo o uso completo da aplicação diretamente pelo navegador.

---

## Licença

Projeto final do curso **Geração Tech - Desenvolvedor Web Full Stack **.
