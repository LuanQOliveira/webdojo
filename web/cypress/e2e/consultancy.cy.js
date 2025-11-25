describe('Formulário de Consultoria', () => {

    let consultancyForm;

    beforeEach(() => {
        cy.fixture('consultancyForm').then((data) => { consultancyForm = data })
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar uma consultoria individual', () => {

        cy.fillConsultancyForm(consultancyForm)
        cy.submitConsultancyForm()
        cy.validateConsultancymodal()

    })

    it('Deve verificar os campos obrigatórios', () => {

        cy.submitConsultancyForm()

        const requireFields = [
            {label: 'Nome Completo', message: 'Campo obrigatório'},
            {label: 'Email', message: 'Campo obrigatório'},
            {label: 'termos de uso', message: 'Você precisa aceitar os termos de uso'}
        ]

        requireFields.forEach(({label, message})  => {
            cy.contains('label', label)
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', message)
        })

    })
})
