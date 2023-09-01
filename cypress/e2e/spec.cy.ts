import { nanoid } from "nanoid";

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Login failed", () => {
    cy.get("input[name='usernameInput']").type("johny");
    cy.get("input[name='passwordInput']").type("12345");
    cy.contains("Log in").click();
    cy.contains("Invalid username or password");
  });

  // it("Login OK", () => {
  //   cy.get("input[name='usernameInput']").type("user1");
  //   cy.get("input[name='passwordInput']").type("1234");
  //   cy.contains("button", "Log in").click();
  //   cy.url().should("include", "/dashboard");
  //   cy.contains("user1");
  // });
});

describe("Logout", () => {
  // beforeEach(() => {
  //   cy.login();
  // });
  // it("Logout OK", () => {
  //   cy.contains("button", "Logout").click();
  //   cy.contains("Log in");
  // });
});

describe("Add Expense", () => {
  // beforeEach(() => {
  //   cy.login();
  //   cy.get('a[href="/expense"]').click();
  //   //poison here
  // });
  // it("Add Expense Failed", () => {
  //   //open modal
  //   cy.contains("button", "Add Expense").click();
  //   //click add expense button (on modal)
  //   cy.contains("button", "Add Expense").click();
  //   cy.contains("Title cannot be empty");
  //   cy.contains("Amount must be larger than 0");
  // });
  // it("Add Expense OK", () => {
  //   //open modal
  //   cy.contains("button", "Add Expense").click();
  //   //random input
  //   const title = nanoid();
  //   const amount = Math.floor(Math.random() * 10000);
  //   //fill input
  //   cy.get('[data-cy="expense-title-input"]').type(title);
  //   cy.get('[data-cy="expense-amount-input"]').type(amount.toString());
  //   cy.get('[data-cy="add-expense-button"]').click();
  //   cy.get('[data-cy="expense-title"]').last().contains(title);
  //   cy.get('[data-cy="expense-amount"]').last().contains(amount.toString());
  //   //poison
  // });
});

describe("Delete Expense", () => {
  // beforeEach(() => {
  //   cy.login();
  //   cy.get('a[href="/expense"]').click();
  //   cy.scrollTo("bottom", { ensureScrollable: false });
  // });
  // it("Delete Expense Cancel OK", () => {
  //   cy.on("window:confirm", () => false);
  //   cy.get('[data-cy="expense-title"]')
  //     .last()
  //     .then(($span) => {
  //       const expenseTitle = $span.text();
  //       cy.get('[data-cy="delete-button"]').last().click();
  //       cy.get('[data-cy="expense-title"]').last().contains(expenseTitle);
  //     });
  // });
  // it("Delete Expense Confirm OK", () => {
  //   cy.on("window:confirm", () => true);
  //   cy.get('[data-cy="expense-title"]')
  //     .last()
  //     .then(($span) => {
  //       const expenseTitle = $span.text();
  //       cy.get('[data-cy="delete-button"]').last().click();
  //       cy.contains("Expense is deleted");
  //       cy.contains(expenseTitle).should("not.exist");
  //     });
  // });
});
