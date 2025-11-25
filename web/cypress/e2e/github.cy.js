describe('Gerenciamento de perfis no Github', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do Github', () => {
        cy.get('#name').type('Teste')
        cy.get('#username').type('teste')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.get('#name').type('Teste')
        cy.get('#username').type('testeqa')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'Teste')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('td', 'teste')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')

    })

    it('Deve poder remover um perfil do Github', () => {
      
        const profile = {
            name: 'Teste',
            username: 'teste',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.name)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile').find('button[title="Remover perfil"]').click()

        cy.contains('table tbody', profile.username)
            .should('not.exist')
    })

    it('Deve validar o link do Github', () => {
      
        const profile = {
            name: 'Teste',
            username: 'papitodev',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.name)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile').find('a')
            .should('have.attr', 'href', 'https://github.com/' + profile.username)
            .and('have.attr', 'target', '_blank')


    })

})