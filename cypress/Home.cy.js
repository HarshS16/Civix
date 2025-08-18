describe('Home Page', () => {
  it('should load successfully and display the welcome message', () => {
    // Visit the root of your application
    cy.visit('http://localhost:5173'); // Use your frontend's dev server URL

    cy.contains('h1', 'Welcome to Civix').should('be.visible');
  });
});
