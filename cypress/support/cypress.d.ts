// cypress/support/cypress.d.ts

declare namespace Cypress {
    interface Chainable {
      lighthouse(
        thresholds?: object,
        options?: object,
        config?: object
      ): Chainable<void>;
    }
  }
  