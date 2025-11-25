# Webdojo - Testes E2E com Cypress

Resumo
- Repositório contendo testes automatizados em Cypress para a aplicação Webdojo.
- Cypress usado na versão especificada em package.json (devDependencies).

Pré-requisitos
- Node.js (recomenda-se 16+)
- npm ou yarn
- A aplicação Webdojo (front-end) está no mesmo repositório e precisa estar servida para os testes E2E apontarem para ela.

Instalação
1. Instalar dependências:
   - npm: `npm install`
   - yarn: `yarn install`

Executar a aplicação (ambiente local)
- A aplicação é servida localmente com o script:
  - `npm run dev`
- Esse comando usa `serve -s dist -p 3000` e expõe a aplicação em http://localhost:3000 (por padrão).

Executar os testes
- Testes headless com viewport padrão:
  - `npm run test`
    - executa: `npx cypress run --config viewportWidth=1440,viewportHeight=900`
- Executar apenas o teste de login em modo mobile:
  - `npm run test-login:mobile`
    - executa: `npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=414,viewportHeight=896`
- Executar uma spec específica (exemplo):
  - `npx cypress run --spec cypress/e2e/cep.cy.js`
- Modo interativo:
  - `npx cypress open` (abre o Test Runner para depuração e execução interativa)

Estrutura relevante do Cypress
- cypress/
  - e2e/ (especificações)
    - alerts.cy.js
    - cep.cy.js
    - consultancy.cy.js
    - github.cy.js
    - hover.cy.js
    - iframe.cy.js
    - Kanban.cy.js
    - links.cy.js
    - login.cy.js
  - fixtures/
    - 2.jpg
    - address.json
    - consultancyForm.json
  - support/
    - commands.js
    - e2e.js
    - util.js

Boas práticas e dicas
- Garanta que a aplicação esteja rodando (`npm run dev`) antes de executar os testes E2E.
- Use fixtures (cypress/fixtures) para dados estáticos; os testes já carregam fixtures (por exemplo consultancyForm.json e address.json).
- Para reproduzir falhas localmente, prefira `npx cypress open` e execute a spec a partir do Test Runner.
- Para testes que abrem links externos, remova o atributo `target` via `invoke('removeAttr', 'target')` antes do `.click()` para evitar abrir novas abas.
- Se precisar ajustar viewport/screen size, passe via `--config viewportWidth=...,viewportHeight=...`.

Integração contínua (exemplo rápido)
- No CI, execute:
  1. Instalar dependências
  2. `npm run dev` (em background) ou garantir que a aplicação esteja disponível
  3. `npm run test`

Contato
- Use este README como referência rápida. Para ajustes específicos nos testes, consulte os arquivos em cypress/e2e e cypress/support.
