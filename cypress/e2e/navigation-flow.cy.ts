describe("Search flow", () => {
  it("type search phrase", () => {
    cy.visit("/");
    cy.get('[data-test-id="show.link"]').contains("Breaking Bad").click();
    cy.get("h2").should("have.text", "Breaking Bad");
  });
});
