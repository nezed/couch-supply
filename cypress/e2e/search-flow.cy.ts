describe("Search flow", () => {
  it("type search phrase", () => {
    cy.visit("/");
    cy.get('[data-test-id="filters"] #query').type("drama{enter}");
    cy.contains("h2", 'best featured shows about "drama"').should("be.visible");
  });

  it("type search phrase and just blurs", () => {
    cy.visit("/");
    cy.get('[data-test-id="filters"] #query').type("drama");
    cy.get('[data-test-id="filters"] #query').blur();
    cy.contains("h2", 'best featured shows about "drama"').should("be.visible");
  });
});
