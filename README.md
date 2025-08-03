# Módulo de Pedidos – Sistema de Vendas

Este projeto é um módulo de **Pedidos** para um sistema de vendas, desenvolvido com Angular. Ele implementa as funcionalidades de:

- **Efetuar Pedido** com seleção de produto, quantidade, descrição e preço.
- **Cancelar Pedido**, mantendo o histórico, sem excluir registros da base de dados.
- **Listar Apenas Pedidos Ativos** com atualização dinâmica.
- **Validação de Estoque** antes de confirmar os pedidos.

---

## Tecnologias e Ferramentas

- Angular
- Reactive Forms
- `json-server` como backend fake (persistência em arquivo `db.json`)
- Cypress (testes E2E)
- Testes unitários com Jasmine e Karma

---

## Requisitos Funcionais

| Requisito                                                                             | Implementação                                                                         |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Não pode ser possível efetuar pedidos de produtos que não existam.                    | Validação via seleção de lista de produtos existentes.                                |
| Não é possível efetuar pedidos com quantidades maiores que os disponíveis no estoque. | Validação feita diratamente no componente com exibição de erro.                       |
| Garantir que Pedidos concorrentes não quebrem a base (Atomicidade).                   | Simulação com validação antes do envio ao backend.                                    |
| Um Pedido deve ter uma descrição, quantidade e preço unitário.                        | Campos são obrigatórios e validados.                                                  |
| Deve ser mantido o histórico dos pedidos.                                             | Pedidos são apenas cancelados, não removidos da base de dados.                        |
| A Listagem dos pedidos deve ser somente de pedidos ativos.                            | É feito o filtro `status=ativo` na requisição de listar os pedidos via `json-server`. |

---

## Requisitos Não Funcionais

| Requisito                                                                                                                     | Implementação                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| A Base deve ser em arquivo (JSON, CSV, XML etc.).                                                                             | Utilizando `json-server` com `db.json`.                                                                        |
| Usar boas práticas de criação de API (verbos, nomenclatura, códigos de retorno, documentação etc.).                           | Verbos REST sendo usados nas requisições (`GET`, `POST`, `PATCH`), nomencalturas claras e tratamento de códigos de retorno HTTP. Documentação incluída abaixo com exemplos.|
| Criação testes (Unitários, integrados etc.).                                                                                  | Testes unitários com Jasmine e testes e2e de cobertura integrada com Cypress.                                                                        |
| Crie sua solução usando as boas práticas cabíveis (DDD, SOLID, 12 Fatores, Patterns ou qualquer outra que julgue necessário). | Separação de responsabilidades (DDD leve), Organização por domínios (`core`, `features`), separação de responsabilidades, services injetáveis, mensagens reativas, DDD leve.                                                         |

---

## Exemplos de Requisições da API

> Essas rotas são expostas pelo `json-server` utilizado como backend simulado.

### Listar produtos

```
GET http://localhost:3000/produtos
```

**Resposta esperada:**

```json
[
  {
    "id": 1,
    "nome": "Notebook Lenovo",
    "preco": 3500,
    "estoque": 10
  },
  {
    "id": 2,
    "nome": "Carregador ",
    "preco": 140,
    "estoque": 31
  },
  {
    "id": 3,
    "nome": "Mouse Logitech",
    "preco": 150,
    "estoque": 65
  },
  {
    "id": 4,
    "nome": "Monitor Dell",
    "preco": 1100,
    "estoque": 40
  }
]
```

---

### Listar produtos por ID

```
GET http://localhost:3000/produtos/1
```

**Resposta esperada:**

```json
[
  {
    "id": 1,
    "nome": "Notebook Lenovo",
    "preco": 3500,
    "estoque": 10
  }
]
```

---

### Recalcular estoque de um produto

```
PATCH http://localhost:3000/produtos/1
```

**Body:**

```json
{
  "estoque": 9
}
```

---

### Efetuar um pedido

```
POST http://localhost:3000/pedidos
```

**Body:**

```json
{
  "id": 1,
  "produto": {
    "id": 1,
    "nome": "Notebook Lenovo",
    "preco": 3500,
    "estoque": 10
  },
  "descricao": "Pedido de teste",
  "quantidade": 2,
  "precoUnitario": 3500,
  "status": "ativo"
}
```

---

### Listar apenas pedidos ativos

```
GET http://localhost:3000/pedidos?status=ativo
```

**Resposta esperada:**

```json
[
  {
    "id": 1,
    "produto": {
      "id": 1,
      "nome": "Notebook Lenovo",
      "preco": 3500,
      "estoque": 10
    },
    "descricao": "Pedido de notebook para os Itubers de TI",
    "quantidade": 2,
    "precoUnitario": 3500,
    "status": "ativo"
  },
  {
    "id": 2,
    "produto": {
      "id": 2,
      "nome": "Carregador ",
      "preco": 140,
      "estoque": 15
    },
    "descricao": "Pedido de carregadores os Itubers de TI",
    "quantidade": 5,
    "precoUnitario": 150,
    "status": "ativo"
  },
  {
    "id": 3,
    "produto": {
      "id": 3,
      "nome": "Mouse Logitech",
      "preco": 150,
      "estoque": 50
    },
    "descricao": "Pedido de mouses para os Itubers de TI",
    "quantidade": 5,
    "precoUnitario": 150,
    "status": "ativo"
  },
  {
    "id": 6,
    "produto": {
      "id": 4,
      "nome": "Monitor Dell",
      "preco": 1100,
      "estoque": 50
    },
    "descricao": "Compra de monitores para os Itubers de INR",
    "quantidade": 10,
    "precoUnitario": 1100,
    "status": "ativo"
  }
]
```

---

### Cancelar pedido

```
PATCH http://localhost:3000/pedidos/3
```

**Body:**

```json
{
  "status": "cancelado"
}
```

---

## Como Rodar

### Pré-requisitos

- Node.js 14+
- Angular CLI
- json-server

### 1. Instalar dependências

```powershell
npm install
```

### 2. Iniciar backend simulado (json-server)

```powershell
npm run json-server
```

Acesse em: [http://localhost:3000](http://localhost:3000)

### 3. Rodar aplicação Angular

```powershell
npm start
```

Acesse em: [http://localhost:4200](http://localhost:4200)

---

## Rodar Testes

### Executar testes unitários com Karma + Jasmine

```powershell
npm test
```

### Gerar relatório de cobertura

```powershell
ng test --code-coverage
```

Abra `coverage/index.html` no navegador.

---

## Estrutura do Projeto

```
src/
  app/
    core/
      models/             # Interfaces de domínio
      services/           # Serviços (API)
    features/
      components/
        efetuar-pedidos/           # Componentes: listar-pedidos.html, listar-pedidos.ts, listar-pedidos.spec.ts e listar-pedidos.scss
        listar-pedidos/            # Componentes: efetuar-pedido.html, efetuar-pedido.ts, efetuar-pedido.spec.ts e efetuar-pedido.scss
```
