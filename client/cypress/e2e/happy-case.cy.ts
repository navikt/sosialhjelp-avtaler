/// <reference types="cypress" />
describe('happy-case', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
})
