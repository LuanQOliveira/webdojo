describe('Validações de Alertas em JavaScript', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')

    })

    it('Deve validar a mensagem de alerta', () => {

        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Olá QA, eu sou um Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()

    })

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (confirmText) => {
            expect(confirmText).to.equal('Aperte um botão!')
            return true;
        })

        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um diálogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (confirmText) => {
            expect(confirmText).to.equal('Aperte um botão!')
            return false;
        })

        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve interagir com o prompt, inserir um texto e validar uma mensagem', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Teste')
        })
        
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Olá Teste! Boas-vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })

})