import {
  generateRandomEmail,
  registerUser,
  expectSuccessResponse,
  expectErrorResponse
} from '../support/registerHelpers'

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário com sucesso', () => {
    const email = generateRandomEmail('luan')
    const userData = {
      name: 'Luan Teste',
      email,
      password: 'teste123'
    }

    registerUser(userData).then((response) => {
      expectSuccessResponse(response, email)
    })
  })

  it('Deve rejeitar cadastro com email duplicado', () => {
    const email = generateRandomEmail('duplicado')
    const userData = {
      name: 'Primeiro Usuario',
      email,
      password: 'teste123'
    }

    // Primeiro cadastro deve suceder
    registerUser(userData).then((response) => {
      expectSuccessResponse(response, email)
    })

    // Segundo cadastro deve falhar
    registerUser(userData, true).then((response) => {
      expectErrorResponse(response, 409, 'Email already registered')
    })
  })

  it('Deve rejeitar cadastro com campos faltando', () => {
    const userData = { name: 'Luan Teste' } // falta email e password

    registerUser(userData, true).then((response) => {
      expectErrorResponse(response, 400, 'Missing required fields')
    })
  })

  it('Deve rejeitar cadastro com email inválido', () => {
    const userData = {
      name: 'Luan Teste',
      email: 'email-invalido-sem-arroba',
      password: 'teste123'
    }

    registerUser(userData, true).then((response) => {
      expectErrorResponse(response, 400, 'Invalid email format')
    })
  })

  it('Deve rejeitar cadastro com senha muito curta', () => {
    const userData = {
      name: 'Luan Teste',
      email: generateRandomEmail('senhafraca'),
      password: '123' // menos de 6 caracteres
    }

    registerUser(userData, true).then((response) => {
      expectErrorResponse(response, 400, 'Password must be at least 6 characters')
    })
  })
})