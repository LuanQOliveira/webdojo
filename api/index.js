const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
let PrismaClient
try {
  // Attempt to load the generated Prisma client
  ({ PrismaClient } = require('@prisma/client'))
} catch (err) {
  console.error('\nPrisma Client not found. Attempting to generate the client automatically...')

  try {
    const { spawnSync } = require('child_process')
    // Try to run `npx prisma generate` to create the client
    const result = spawnSync('npx', ['prisma', 'generate'], { stdio: 'inherit', shell: true })

    if (result.error) {
      throw result.error
    }

    // Try requiring again
    ({ PrismaClient } = require('@prisma/client'))
    console.log('Prisma client generated successfully.')
  } catch (genErr) {
    console.error('\nAutomatic generation failed. Please run the following commands manually:')
    console.error('\n  cd api')
    console.error('  npm install')
    console.error('  npx prisma generate')
    console.error('\nIf you are using migrations for the first time you may also need:')
    console.error('  npx prisma migrate dev --name init')
    console.error('\nFull error from require/generation attempt:')
    console.error(genErr)
    process.exit(1)
  }
}

require('dotenv').config()

// Prisma v7 requires passing an adapter or accelerateUrl to the client.
// Provide a minimal direct adapter object with adapterName, provider and url.
// The `provider` expected by the runtime for PostgreSQL is `postgres`.
const prisma = new PrismaClient({
  adapter: {
    adapterName: 'direct',
    provider: 'postgres',
    url: process.env.DATABASE_URL
  }
})
const app = express()
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Ninja do cypress' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    return res.status(201).json({ message: 'User registered successfully', user })
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
