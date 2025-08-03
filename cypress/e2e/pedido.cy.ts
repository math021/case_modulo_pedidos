describe('Efetuar Pedido', () => {
  it('Deve efetuar um pedido com sucesso', () => {
    cy.visit('http://localhost:4200/pedidos/novo');

    cy.get('select[formcontrolname=produtoId]', { timeout: 10000 }).should('exist');
    cy.get('select[formcontrolname=produtoId]').select('3');
    cy.get('input[formcontrolname=descricao]').type('Pedido via Cypress');
    cy.get('input[formcontrolname=quantidade]').clear().type('2');
    cy.get('button[type=submit]').should('not.be.disabled');
    cy.get('button[type=submit]').click();

    cy.contains('Pedido efetuado com sucesso!').should('be.visible');
  });
});

describe('Deve manter o botão desabilitado após form invalido', () => {
  it('Deve exibir erro ao solicitar quantidade maior que o estoque disponível', () => {
    cy.visit('http://localhost:4200/pedidos/novo');

    cy.get('select[formcontrolname=produtoId]').should('exist').select('1');
    cy.get('input[formcontrolname=precoUnitario]').should('not.have.value', '0');
    cy.get('input[formcontrolname=descricao]').type('Pedido com quantidade inválida');
    cy.get('input[formcontrolname=quantidade]').clear().type('999');
    cy.get('button[type=submit]').should('be.disabled');
  });
});

