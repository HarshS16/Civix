describe('Application Navigation', () => {
  it('should load the home page successfully', () => {
    // Visit the base URL of the frontend application
    cy.visit('http://localhost:5173'); // Adjust port if needed

    // Assert that the main heading is visible on the page
    cy.contains('h1', 'Welcome to Civix').should('be.visible');
  });
});
