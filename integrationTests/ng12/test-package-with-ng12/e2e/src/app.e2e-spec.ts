/// <reference types="cypress" />

describe('End-to-End tests', () => {
  it('should render app-test-form', async () => {
    console.log('process.env.NG_VERSION:', process.env.NG_VERSION);
    
    process.env.NG_VERSION = process.env.NG_VERSION || 'process-env-VERSION-not-set';
    console.log('process.env.NG_VERSION:', process.env.NG_VERSION);
    cy.visit('http://localhost:4200')
    
    const headerEl = cy.get('app-test-form h1');

    if (!headerEl) {
      throw Error('Did not find \'app-test-form h1\'. More than likely the component did not render as expected :(');
    }

    headerEl.should('have.text', `test-package-with-${process.env.NG_VERSION}`);
  });
});