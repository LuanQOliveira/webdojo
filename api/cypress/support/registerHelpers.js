// Helper functions for user registration tests
export const API_URL = 'http://localhost:3333'
export const REGISTER_ENDPOINT = '/api/users/register'

export const generateRandomEmail = (prefix = 'teste') => {
  const random = Math.floor(Math.random() * 100000)
  return `${prefix}.${random}@teste.com`
}

export const registerUser = (userData, shouldFail = false) => {
  const requestOptions = {
    method: 'POST',
    url: `${API_URL}${REGISTER_ENDPOINT}`,
    body: userData
  }

  if (shouldFail) {
    requestOptions.failOnStatusCode = false
  }

  return cy.request(requestOptions)
}

export const expectSuccessResponse = (response, expectedEmail) => {
  expect(response.status).to.eq(201)
  expect(response.body).to.deep.include({
    message: 'User registered successfully'
  })
  expect(response.body.user).to.include.keys('id', 'name', 'email', 'createdAt')
  expect(response.body.user.email).to.eq(expectedEmail)
  expect(response.body.user).not.to.have.property('password')
}

export const expectErrorResponse = (response, expectedStatus, expectedError) => {
  expect(response.status).to.eq(expectedStatus)
  expect(response.body).to.deep.include({ error: expectedError })
}
