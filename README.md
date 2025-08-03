
# Módulo de Pedidos – Sistema de Vendas

Este projeto é um módulo de **Pedidos** para um sistema de vendas, desenvolvido com Angular. Ele implementa as funcionalidades de:

- Efetuar Pedido
- Cancelar Pedido
- Listar Pedidos

---

## Requisitos Atendidos

### Funcionais

- Não é possível pedir produtos inexistentes
- Não é possível pedir quantidades maiores que o estoque
- Pedidos são atômicos e concorrência segura
- Pedido possui descrição, quantidade e preço unitário
- Histórico de pedidos é mantido
- Apenas pedidos ativos são listados

### Não Funcionais

- Persistência via JSON (simulado com `json-server`)
- Boas práticas de API REST (verbo, status, estrutura)
- Testes unitários implementados
- Código seguindo princípios **SOLID**, **DDD** e **Clean Architecture**

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
npx json-server --watch db.json --port 3000
```

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

---

## Testes Inclusos

- EfetuarPedidoComponent
  - Pedido válido
  - Estoque excedido
  - Formulário inválido

- PedidoService
  - Listar pedidos
  - Efetuar pedido
  - Cancelar pedido

---

## Boas Práticas Aplicadas

- Angular CLI, Lazy Loading, Reactive Forms
- Arquitetura em camadas (Core, Features)
- Clean Code, separação por domínio
- Testes com Jasmine e Karma
- SCSS como pré-processador

---

## 🧾 Licença

Uso educacional e demonstrativo.
