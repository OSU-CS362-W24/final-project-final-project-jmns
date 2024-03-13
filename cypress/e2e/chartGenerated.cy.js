

describe('Chart Generated', function() {
    it('Succesfully generates the chart', () => {
      cy.visit('http://localhost:8080/')

      cy.findByText("Line").click()

      cy.findByLabelText("Chart title").type("Age vs Time")
      cy.findByLabelText("X label").type("Time")
      cy.findByLabelText("Y label").type("Age")

      cy.findByLabelText("X").type("0")
      cy.findByLabelText("Y").type("0")
      cy.findByText("+").click()
      cy.get(':nth-child(6) > .x-value-input').type("1")
      cy.get(':nth-child(7) > .y-value-input').type("1")
      cy.findByText("+").click()
      cy.get(':nth-child(8) > .x-value-input').type("2")
      cy.get(':nth-child(9) > .y-value-input').type("2")
      cy.findByText("+").click()
      cy.get(':nth-child(10) > .x-value-input').type("3")
      cy.get(':nth-child(11) > .y-value-input').type("3")
      cy.findByText("+").click()
      cy.get(':nth-child(12) > .x-value-input').type("4")
      cy.get(':nth-child(13) > .y-value-input').type("4")

      cy.findByText("Generate chart").click()

      cy.get('#chart-img').should('exist')
    })
  })
  