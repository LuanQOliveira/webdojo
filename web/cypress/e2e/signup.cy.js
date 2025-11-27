describe('Cadastro', () => {
    beforeEach(() => {
        cy.goToSignup()
    
    })
           

    it('Deve cadastrar um novo usuário', () => {
        cy.get('#name').type('Teste teste')
        cy.get('#email').type('Teste@gmail.com')
        cy.get('#password').type('Connect*')

        cy.contains('button', 'Criar conta').click()

        //cy.wait('@postSignup')

        cy.contains('Conta criada com sucesso!').should('be.visible')
    })
})