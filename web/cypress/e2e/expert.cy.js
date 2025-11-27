describe('Expert', () => {
    beforeEach(() => {
        cy.comecar()
    })

    it('Deve manipular o valor de um campo', () => {

        cy.get('#email').invoke('val', 'teste@gmail.com')
    })

    it('Não deve logar com senha inválida', () => {
        cy.submitLogin('papito@webdojo.com', 'katana321');

        cy.get('[data-sonner-toaster=true] div[class=title]')
            .should('be.visible')
            .should('have.text', 'Acesso negado! Tente novamente.');
    })
})