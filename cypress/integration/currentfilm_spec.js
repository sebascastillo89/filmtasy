const FILM_1_CHARS_COUNT = 18;

describe("Single film page", () => {
  describe("Not found", () => {
    beforeEach(() => {
      cy.server();
      cy.route("/api/films/1111").as("getFilm");
      cy.visit("/films/1111");
      cy.wait("@getFilm");
    });

    it("When film does not exists, should render 404", () => {
      cy.contains("Found, page could not be");
    });

    it("When click return home link, then redirect to home", () => {
      cy.get("a.not-found").click();
      cy.url().should("eq", Cypress.config().baseUrl);
    });
  });

  describe("Fetching a single film", () => {
    it("When film is being fetched, should render spinner", () => {
      cy.server();
      cy.route("/api/films/1").as("getFilm");
      cy.visit("/films/1");
      cy.get(".card-body").should("not.exist");
      cy.get("div.filmtasySpinner").should("exist");
    });
  });

  describe("Showing film data", () => {
    beforeEach(() => {
      cy.server();
      cy.route("/api/films/1").as("getFilm");
      cy.route("/api/people/**").as("getCharacter");
      cy.visit("/films/1");
      cy.wait("@getFilm");
    });

    it("When the film fetched, should render film card", () => {
      cy.get("div.filmtasySpinner").should("exist");
      cy.get(".card-body").should("exist");
      cy.get(".card-title").should("exist");
      cy.get(".card-subtitle").should("exist");
      cy.get(".empty-star").should("exist");
    });

    it("When the film fetched, should fetchs characters", () => {
      cy.route("/api/people/**").as("getCharacter");
      cy.wait("@getCharacter").then((xhr) => {
        cy.get("div.filmtasySpinner").should("not.exist");
        cy.get(".char-link-name")
          .its("length")
          .should("eq", FILM_1_CHARS_COUNT);
      });
    });
  });

  describe("Clicks on character", () => {
    beforeEach(() => {
      cy.server();
      cy.route("/api/films/1").as("getFilm");
      cy.route("/api/people/**").as("getCharacter");
      cy.visit("/films/1");
      cy.wait("@getFilm");
      cy.wait("@getCharacter");
    });

    it("When clicks on character, then nav to character page", () => {
      cy.get("a.char-link-name").first().click();
      cy.url().should("include", "/characters/1");
    });
  });

  describe("Favourite films", () => {
    beforeEach(() => {
      cy.server();
      cy.route("/api/films/1").as("getFilm");
      cy.route("/api/people/**").as("getCharacter");
      cy.visit("/films/1");
      cy.wait("@getFilm");
      cy.wait("@getCharacter");
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
      cy.visit("/films/1");
      cy.wait(500); //Wait FakeSpinner, film is cached

      // Check there are no favorites
      cy.get(".filled-star").should("not.exist");
    });
  });

  describe("Favourite characters", () => {
    beforeEach(() => {
      cy.server();
      cy.route("/api/films/1").as("getFilm");
      cy.route("/api/people/**").as("getCharacter");
      cy.visit("/films/1");
      cy.wait("@getFilm");
      cy.wait("@getCharacter");
    });

    it("When select characters and mark as favourite, then come back to film data and check fav star", () => {
      cy.get(".char-link-name").first().click();
      cy.get(".empty-star").first().click();

      cy.visit("/films/1");
      cy.wait(500); //Wait FakeSpinner, character is cached

      cy.get(".empty-star").should("exist"); //Film is not fav
      cy.get(".filled-star").should("exist"); // First char is fav
    });

    it("When clicks the empty star, then add the film to fav page, then come back to the film page, then the star is empty", () => {
      cy.get(".empty-star").first().click();
      cy.get("a.favLink").click();
      cy.get(".clear-cache").click();
      cy.visit("/films/1");

      cy.get(".filled-star").should("not.exist");
      cy.get(".empty-star").should("exist");
    });

    describe("Breadcrumb", () => {
      it("When click in breadcumb home link, should render films board", () => {
        cy.get(".char-link-name").first().click();
        cy.get(".empty-star").first().click();
        cy.get(".link-to-home").first().click();

        cy.url().should("eq", Cypress.config().baseUrl);
        cy.visit("/films/1");
        cy.get(".empty-star").should("exist"); //Film is not fav
        cy.get(".filled-star").should("exist"); // First char is fav
      });

      it("When click in breadcumb film link, should render film card and characters", () => {
        cy.get(".char-link-name").first().click();
        cy.get(".empty-star").first().click();
        cy.get(".link-to-film").first().click();

        cy.url().should("includes", "/films/1");
        cy.wait(500); //Wait FakeSpinner, character is cached
        cy.get(".empty-star").should("exist"); //Film is not fav
        cy.get(".filled-star").should("exist"); // First char is fav
      });
    });
  });
});
