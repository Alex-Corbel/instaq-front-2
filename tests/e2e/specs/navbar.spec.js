describe("Navbar Testing", () => {
  context("macbook-15 resolution", function() {
    beforeEach(() => {
      cy.viewport("macbook-15");
      cy.kcLogin("cypress-user", "rTNgk!V2J4Qjfyv6DN2D");
      cy.visit("/#/home");
    });

    afterEach(() => {
      cy.kcLogout();
    });

    it("isLogoVisible", () => {
      var logo = cy.get('a[id="logo"]');
      logo.should("be.visible");
      logo.contains("🍑");
    });

    it("isSearchVisible", () => {
      cy.get('div[id="search"]')
        .find("input")
        .should("be.visible");
      cy.get('div[id="search"]')
        .find('[data-icon="search"]')
        .should("have.class", "fa-search")
        .and("be.visible");
    });

    it("isInputType", () => {
      cy.get('div[id="search"]')
        .find("input")
        .type("test")
        .should("have.value", "test");
    });
  });

  context("iphone-x resolution", function() {
    beforeEach(() => {
      cy.viewport("iphone-x");
      cy.kcLogin("cypress-user", "rTNgk!V2J4Qjfyv6DN2D");
      cy.visit("/#/home");
    });

    afterEach(() => {
      cy.kcLogout();
    });

    it("isLogoVisible", () => {
      var logo = cy.get('a[id="logo"]');
      logo.should("be.visible");
      logo.contains("🍑");
    });

    it("isSearchNotVisible", () => {
      cy.get('div[id="search"]').should("not.be.visible");
      cy.get('div[id="search"]')
        .find("input")
        .should("not.be.visible");
      cy.get('div[id="search"]')
        .find('[data-icon="search"]')
        .and("not.be.visible");
    });
  });

  context("iphone-x landscape resolution", function() {
    beforeEach(() => {
      cy.viewport("iphone-x", "landscape");
      cy.kcLogin("cypress-user", "rTNgk!V2J4Qjfyv6DN2D");
      cy.visit("/#/home");
    });

    afterEach(() => {
      cy.kcLogout();
    });

    it("isLogoVisible", () => {
      var logo = cy.get('a[id="logo"]');
      logo.should("be.visible");
      logo.contains("🍑");
    });

    it("isSearchVisible", () => {
      cy.get('div[id="search"]')
        .find("input")
        .should("be.visible");
      cy.get('div[id="search"]')
        .find('[data-icon="search"]')
        .should("have.class", "fa-search")
        .and("be.visible");
    });

    it("isInputOkay", () => {
      cy.get('div[id="search"]')
        .find("input")
        .type("test")
        .should("have.value", "test");
    });
  });
});
