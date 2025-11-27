// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { getTodayFormatteDate } from "./util"

Cypress.Commands.add('comecar', () => {
  cy.visit('/')
})  

Cypress.Commands.add('goToSignup', () => {
    cy.comecar()
    cy.get('a[href="/register"]').click()
    cy.contains('h2', 'Crie sua conta').should('be.visible')
})

Cypress.Commands.add('submitLogin', (email, password) => {
  cy.get('#email').type(email)
  cy.get('#password').type(password)

  cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
    cy.contains('button', buttonName)
        .should('be.visible')
        .click()

   cy.contains('h1', pageTitle)
        .should('be.visible')

})


Cypress.Commands.add('login', (ui = false) => {
    if (ui === true) {
        cy.comecar()
        cy.submitLogin('papito@webdojo.com', 'katana123')
    } else {
        const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
        const loginDate = getTodayFormatteDate()

        cy.setCookie('login_date', loginDate)

        cy.visit('/dashboard', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', token)
            }

        })
    }
})

Cypress.Commands.add('fillConsultancyForm', (consultancyForm) => {
        cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name)
        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
        cy.contains('label', 'Telefone').type(consultancyForm.phone)
        cy.get('#consultancyType').select(consultancyForm.consultancyType)

        if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('not.be.checked')
        }

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .check()

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('not.be.checked')
        }

        cy.contains('label', 'CPF').type(consultancyForm.document)

        consultancyForm.channels.forEach((channel) => {
            cy.contains('label', channel )
                .find('input')
                .check() 
                .should('be.checked')
        })


        cy.get('input[type="file"]')
            .selectFile(consultancyForm.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type( consultancyForm.details)


        consultancyForm.technologies.forEach(tech => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(`${tech}{enter}`)

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')

        })

        if (consultancyForm.acceptTerms === true) {
            
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
                .should('be.checked')
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
  cy.contains('button', 'Enviar formulário').click()
})

Cypress.Commands.add('validateConsultancymodal', () => {
  cy.get('.modal', { timeout: 7000 })
    .should('be.visible')
    .find('.modal-content')
    .should('be.visible')
    .should('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})