describe('Listar Pedidos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/pedidos');
  });

  it('Deve carregar e exibir a lista de pedidos ativos', () => {
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.at.least', 1);
  });

  it('Deve cancelar um pedido com sucesso', () => {
    cy.get('button').contains('Cancelar').first().click();

    cy.contains('cancelado com sucesso').should('be.visible');
  });
});
