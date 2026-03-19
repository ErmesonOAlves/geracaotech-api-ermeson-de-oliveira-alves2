# 🛒 Geração Tech E-commerce API

API RESTful para gerenciamento de e-commerce (Usuários, Produtos, Categorias) com autenticação JWT e documentação interativa.

---

## 🚀 Tecnologias
- **Node.js** | **Express** | **Sequelize (MySQL)**
- **JWT** (Autenticação) | **Argon2** (Hash de senhas)
- **Jest** & **Supertest** (Testes automatizados)

---

## 📖 Documentação da API (Swagger)
Esta API utiliza **Swagger** para documentação interativa. Você pode explorar e testar todos os endpoints diretamente pelo navegador.

- **URL de Documentação:** `http://localhost:3099/api-docs`

---

## ⚙️ Instalação e Execução

### 1. Preparação
```bash
git clone <url-do-repositorio>
npm install
cp .env.example .env # Configure suas chaves no .env
```

### 2. Banco de Dados
Sincronize as tabelas com o script do Sequelize:
```bash
npm run db:sync
```

### 3. Rodar a Aplicação
```bash
npm run dev # Modo desenvolvimento (hot reload)
```

---

## 📡 Endpoints Principais

| Recurso | Método | Endpoint | Protegido |
| :--- | :--- | :--- | :--- |
| **Auth** | POST | `/v1/user/token` | ❌ |
| **Users** | GET/POST | `/v1/user`, `/v1/user/search`, `/v1/user/:id` | 🔒 (PUT/DEL) |
| **Categories** | ALL | `/v1/category`, `/v1/category/:id` | 🔒 (C/U/D) |
| **Products** | ALL | `/v1/product`, `/v1/product/search`, `/v1/product/:id` | 🔒 (C/U/D) |

> Para mais detalhes sobre payloads e respostas, acesse o **Swagger UI**.

---

## 🧪 Testes
Execute a suíte de testes unitários e de integração:
```bash
npm test
```

---

## 🔒 Segurança
- Autenticação JWT com expiração.
- Senhas protegidas com Argon2 + Pepper.
- Transações SQL para integridade de dados.
- Validação e sanitização de entradas.

---

## 📝 Licença
Projeto final do programa **Geração Tech - Back-end**.