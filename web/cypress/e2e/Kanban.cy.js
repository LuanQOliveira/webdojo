describe('Kanban Board', () => {
    it('Deve mover uma tarefa de "To Do" e atualizar o board', () => {
        cy.login()
        cy.contains('Kanban').click()

        const dataTransfer = new DataTransfer();

        cy.contains('div[draggable=true]', 'Documentar API')
            .should('exist')
            .trigger('dragstart', { dataTransfer })

        cy.get('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (4)')
           
        cy.get('.column-done')   
            .and('include.text', 'Documentar API')
            .and('include.text', 'Criar documentação da API com Swagger')
        

        


    })
})