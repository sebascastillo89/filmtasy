describe("Single character page", () => {
  describe("Not found", () => {
    beforeEach(() => {
      cy.server();
      cy.route("/api/people/1111").as("getChar");
      cy.visit("/characters/1111");
      cy.wait("@getChar");
    });

    it("When character does not exists, should render 404", () => {
      cy.contains("Found, page could not be");
    });

    it("When click return home link, then redirect to home", () => {
      cy.get("a.not-found").click();
      cy.url().should("eq", Cypress.config().baseUrl);
    });
  });

  describe("Fetching a single character", () => {
    it("When character is being fetched, should render spinner", () => {
      cy.server();
      cy.route("/api/people/1").as("getChar");
      cy.visit("/characters/1");
      cy.get(".card-body").should("not.exist");
      cy.get("div.filmtasySpinner").should("exist");
    });
  });

  describe("Showing character data", () => {
    beforeEach(() => {
      cy.server();
      cy.route("/api/people/1").as("getChar");
      cy.visit("/characters/1");
      cy.wait("@getChar");
    });

    it("When the character fetched, should render character", () => {
      cy.get("div.filmtasySpinner").should("not.exist");
      cy.get(".card-body").should("exist");
      cy.get(".card-title").should("exist");
      cy.get(".card-subtitle").should("exist");
      cy.get(".empty-star").should("exist");
    });

    describe("Favourite characters", () => {
      beforeEach(() => {
        cy.server();
        cy.route("/api/people/1").as("getChar");
        cy.visit("/characters/1");
        cy.wait("@getChar");
      });

      it("When clicks on empty star , then fills the star", () => {
        cy.get(".filled-star").should("not.exist");
        cy.get(".empty-star").first().click();
        cy.get(".filled-star").should("exist");
      });

      it("When clicks on filled star , then empties the star", () => {
        cy.get(".empty-star").first().click();
        cy.get(".filled-star").first().click();
        cy.get(".filled-star").should("not.exist");
      });

      it("When clear cache, then favorite preferences be removed", () => {
        cy.get(".empty-star").first().click();
        cy.get("a.favLink").click();
        cy.get(".clear-cache").click();
        cy.visit("/characters/1");
        cy.wait(500); //Wait FakeSpinner, character is cached

        // Check there are no favorites
        cy.get(".filled-star").should("not.exist");
      });
    });
  });
});
