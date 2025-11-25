describe('Simulando Mousehover', () => {
    it('Deve mostrar o texto ao passar o mouse em cima do link do instagram', () => {
       cy.login()

        cy.get('[data-cy="instagram-link"]')
    }
)
})