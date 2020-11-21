describe("Navigation Bar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("When click Films, then redirect to home", () => {
    cy.get("a.filmsLink").click();
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  it("When click About, then redirect to About page", () => {
    cy.get("a.aboutLink").click();
    cy.url().should("include", "/about");
  });

  it("When click Favourites, then redirect to Favourites page", () => {
    cy.get("a.favLink").click();
    cy.url().should("include", "/favourites");
  });

  it("When click logo, then redirect to home", () => {
    cy.get("a.filmtasyLogo").click();
    cy.url().should("eq", Cypress.config().baseUrl);
  });
});
