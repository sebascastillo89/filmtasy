const FILMS_COUNTER = 6;

describe("Films page", () => {
  describe("Fetching films", () => {
    it("When films are being fetched, it should render the spinner. When films are fetched, it should render small cards", () => {
      cy.server();
      cy.route("/api/films/").as("getFilms");
      cy.visit("/");

      cy.url().should("eq", Cypress.config().baseUrl);
      cy.get("div.filmtasySpinner").should("exist");
      cy.get(".filmSmallCard").should("not.exist");

      cy.wait("@getFilms").then((xhr) => {
        cy.get("div.filmtasySpinner").should("not.exist");
        cy.get(".filmSmallCard").should("exist");
        cy.get(".empty-star").should("exist");
        cy.get(".card-title").should("exist");
        cy.get(".filled-star").should("not.exist");
      });
    });
  });

  describe("Showing film data", () => {
    it("When click Show more, it should render film card", () => {
      // Fetch films and click first show more link
      cy.server();
      cy.route("/api/films/").as("getFilms");
      cy.visit("/");
      cy.wait("@getFilms");
      cy.get(".showMore").first().click();

      // Ensure film card is rendered
      cy.url().should("includes", "/films/");
      cy.wait(1000); // Wait until (fake)spinner, film data is already cached
      cy.get(".card-title").should("exist");
      cy.get(".card-subtitle").should("exist");
      cy.get(".card-crawl").should("exist");
    });
  });

  describe("Favorite films", () => {
    beforeEach(() => {
      cy.server();
      cy.route("/api/films/").as("getFilms");
      cy.visit("/");
      cy.wait("@getFilms");
    });

    it("When click on empty star, it should mark the film as favorite in the films board", () => {
      cy.get(".empty-star").its("length").should("eq", FILMS_COUNTER);
      cy.get(".empty-star").first().click();

      cy.get(".empty-star")
        .its("length")
        .should("eq", FILMS_COUNTER - 1);
      cy.get(".filled-star").its("length").should("eq", 1);
    });

    it("When click on empty star, it should mark the film as favorite in the film card", () => {
      cy.get(".empty-star").first().click();
      cy.get(".showMore").first().click();
      cy.wait(500); // Wait until (fake)spinner, film data is already cached

      cy.get(".card-title").should("exist");
      cy.get(".card-subtitle").should("exist");
      cy.get(".card-crawl").should("exist");
      cy.get(".filled-star").should("exist");
    });

    it("When click on filled start, it should remove the film from favorites in the films board", () => {
      cy.get(".empty-star").first().click();
      cy.get(".filled-star").first().click();
      cy.get(".empty-star").its("length").should("eq", FILMS_COUNTER);
    });

    it("When click on filled start, it should remove the film from favorites in the film card", () => {
      cy.get(".empty-star").first().click();
      cy.get(".filled-star").first().click();
      cy.get(".showMore").first().click();
      cy.wait(500); // Wait until (fake)spinner, film data is already cached

      cy.get(".card-title").should("exist");
      cy.get(".card-subtitle").should("exist");
      cy.get(".card-crawl").should("exist");
      cy.get(".empty-star").should("exist");
    });

    it("When clear cache, then favorite preferences be removed", () => {
      cy.get(".empty-star").first().click();
      cy.get("a.favLink").click();
      cy.get(".clear-cache").click();
      cy.get("a.filmtasyLogo").click();

      // Check there are no favorites
      cy.get(".empty-star").its("length").should("eq", FILMS_COUNTER);
    });
  });
});
