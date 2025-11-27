// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Configure Cypress to retry requests if API is not ready
Cypress.Commands.overwrite('request', (originalFn, ...args) => {
  return originalFn(...args).catch((err) => {
    // If connection refused, retry after a delay
    if (err.message && err.message.includes('ECONNREFUSED')) {
      cy.log('⏳ API not ready, retrying in 1 second...')
      cy.wait(1000)
      return originalFn(...args)
    }
    throw err
  })
})