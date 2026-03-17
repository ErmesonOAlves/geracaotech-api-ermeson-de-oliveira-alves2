# 🛒 E-commerce API - Geração Tech

API RESTful completa para gerenciamento de e-commerce desenvolvida como projeto final do programa Geração Tech.

## 📋 Sobre o Projeto

Sistema backend robusto para e-commerce com funcionalidades de gerenciamento de usuários, produtos e categorias. Implementa autenticação JWT, validações de segurança e testes automatizados.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express 5** - Framework web
- **MySQL** - Banco de dados relacional
- **Sequelize** - ORM para Node.js
- **JWT** - Autenticação via tokens
- **Argon2** - Hash de senhas com pepper
- **Jest** - Framework de testes
- **Supertest** - Testes de integração HTTP
- **Faker.js** - Geração de dados fake para testes
- **Validator** - Validação de dados

## 📁 Estrutura do Projeto

```
finalprojectbackend/
├── src/
│   ├── config/
│   │   ├── connection.js          # Configuração do banco de dados
│   │   └── password.js            # Hash e verificação de senhas
│   ├── controllers/
│   │   ├── UserController.js      # Lógica de usuários
│   │   ├── CategoryController.js  # Lógica de categorias
│   │   └── ProductController.js   # Lógica de produtos
│   ├── middlewares/
│   │   └── authenticationMiddleware.js  # Validação JWT
│   ├── models/
│   │   ├── User.js                # Model de usuário
│   │   ├── Category.js            # Model de categoria
│   │   ├── Product.js             # Model de produto
│   │   ├── ProductImages.js       # Model de imagens
│   │   ├── ProductOptions.js      # Model de opções
│   │   ├── ProductCategories.js   # Tabela pivot
│   │   └── associations.js        # Relacionamentos
│   ├── routes/
│   │   ├── UsersRoutes.js         # Rotas de usuários
│   │   ├── CategoryRoutes.js      # Rotas de categorias
│   │   └── ProductRoutes.js       # Rotas de produtos
│   ├── scripts/
│   │   └── syncdatabase.js        # Script de sincronização do DB
│   ├── app.js                     # Configuração do Express
│   └── server.js                  # Inicialização do servidor
├── tests/
│   └── users/
│       └── user.test.js           # Testes de usuários
├── .env.example                   # Exemplo de variáveis de ambiente
├── package.json
└── README.md
```

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js (v18 ou superior)
- MySQL (v8 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd finalprojectbackend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DB_NAME=seu_banco_de_dados
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=127.0.0.1
SQL_PORT=3306
PORT=3099
PASSWORD_PEPPER=sua_chave_secreta_pepper
JWT_SECRET=sua_chave_jwt_minimo_32_caracteres
```

4. **Sincronize o banco de dados**
```bash
npm run db:sync
```

5. **Inicie o servidor**
```bash
# Desenvolvimento
npm run dev

# Produção
node src/server.js
```

## 📡 Endpoints da API

### 🔐 Autenticação

#### Login
```http
POST /v1/user/token
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 👤 Usuários

#### Criar Usuário
```http
POST /v1/user
Content-Type: application/json

{
  "firstname": "João",
  "surname": "Silva",
  "email": "joao@email.com",
  "password": "senha12345",
  "confirmpassword": "senha12345"
}
```

#### Listar Usuários
```http
GET /v1/user/search?limit=12&page=1
```

#### Buscar Usuário por ID
```http
GET /v1/user/:id
Authorization: Bearer {token}
```

#### Atualizar Usuário
```http
PUT /v1/user/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstname": "João",
  "surname": "Santos",
  "email": "joao.santos@email.com"
}
```

#### Deletar Usuário
```http
DELETE /v1/user/:id
Authorization: Bearer {token}
```

---

### 📂 Categorias

#### Criar Categoria
```http
POST /v1/category
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Eletrônicos",
  "slug": "eletronicos",
  "use_in_menu": true
}
```

#### Listar Categorias
```http
GET /v1/category/search?limit=12&page=1&use_in_menu=true
```

#### Buscar Categoria por ID
```http
GET /v1/category/:id
```

#### Atualizar Categoria
```http
PUT /v1/category/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Eletrônicos e Games",
  "slug": "eletronicos-games",
  "use_in_menu": true
}
```

#### Deletar Categoria
```http
DELETE /v1/category/:id
Authorization: Bearer {token}
```

---

### 🛍️ Produtos

#### Criar Produto
```http
POST /v1/product
Authorization: Bearer {token}
Content-Type: application/json

{
  "enabled": true,
  "name": "Notebook Gamer",
  "slug": "notebook-gamer",
  "stock": 10,
  "description": "Notebook para jogos",
  "price": 3500.00,
  "price_with_discount": 3200.00,
  "category_ids": [1, 2],
  "images": [
    {
      "content": "https://exemplo.com/imagem1.jpg"
    }
  ],
  "options": [
    {
      "title": "Cor",
      "shape": "square",
      "radius": 0,
      "type": "text",
      "values": ["Preto", "Prata"]
    }
  ]
}
```

#### Listar Produtos
```http
GET /v1/product/search?limit=12&page=1&match=notebook&price-range=1000-5000&category_ids=1,2
```

#### Buscar Produto por ID
```http
GET /v1/product/:id
```

#### Atualizar Produto
```http
PUT /v1/product/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Notebook Gamer Pro",
  "price": 3800.00,
  "stock": 15
}
```

#### Deletar Produto
```http
DELETE /v1/product/:id
Authorization: Bearer {token}
```

---

## 🧪 Testes

### Executar Testes
```bash
npm test
```

### Cobertura de Testes

- ✅ Criação de usuários
- ✅ Validação de senhas
- ✅ Validação de emails
- ✅ Autenticação JWT
- ✅ Listagem com paginação
- ✅ Busca por ID
- ✅ Tratamento de erros

---

## 🔒 Segurança

### Implementações de Segurança

- **Hash de Senhas**: Argon2 com pepper adicional
- **JWT**: Tokens com expiração de 15 minutos
- **Validação Obrigatória**: JWT_SECRET deve estar definido
- **Validação de Email**: Formato validado com biblioteca validator
- **Sanitização**: Inputs trimados e normalizados
- **Autenticação**: Rotas protegidas com middleware JWT
- **Validações**: Campos obrigatórios e formatos validados

### Boas Práticas

- Senhas nunca retornadas nas respostas
- Emails convertidos para lowercase
- Validação de IDs (apenas números positivos)
- Transações no banco de dados
- Mensagens de erro genéricas (não revelam detalhes)

---

## 📊 Modelos de Dados

### User
```javascript
{
  id: INTEGER (PK),
  firstname: STRING,
  surname: STRING,
  email: STRING (UNIQUE),
  password: STRING (HASHED),
  createdAt: DATE,
  updatedAt: DATE
}
```

### Category
```javascript
{
  id: INTEGER (PK),
  name: STRING,
  slug: STRING,
  use_in_menu: BOOLEAN,
  createdAt: DATE,
  updatedAt: DATE
}
```

### Product
```javascript
{
  id: INTEGER (PK),
  enabled: BOOLEAN,
  name: STRING,
  slug: STRING,
  stock: INTEGER,
  description: TEXT,
  price: FLOAT,
  price_with_discount: FLOAT,
  createdAt: DATE,
  updatedAt: DATE
}
```

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Sincronizar banco de dados
npm run db:sync

# Executar testes
npm test
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto foi desenvolvido como parte do programa Geração Tech.

---

## 👨‍💻 Autor

Desenvolvido como projeto final do programa Geração Tech - Back-end

---

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositóri