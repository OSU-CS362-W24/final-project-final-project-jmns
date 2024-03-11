

describe('Chart Generated', function() {
    it('Succesfully generates the chart', () => {
      cy.visit('http://localhost:8080/')

      cy.findByText("Line").click()

      cy.findByLabelText("Chart title").type("Age vs Time")
      cy.findByLabelText("X label").type("Age")
      cy.findByLabelText("Y label").type("Time")

      cy.findByLabelText("X").type("0")
      cy.findByLabelText("Y").type("0")

      cy.findByText("Generate chart").click()

      cy.get('#chart-img').should('exist')
    })
  })
  