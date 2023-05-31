import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

const createUserSchema = z.object({
  name: z.string(),
})

export async function usersRoutes(app: FastifyInstance) {
  // Deve ser possivel criar usuário
  app.post('/', async (request, reply) => {
    const { name } = createUserSchema.parse(request.body)

    await knex('users').insert({
      name,
      id: randomUUID(),
    })

    reply.status(201).send()
  })

  app.get('/', async (request, reply) => {
    const users = await knex('users').select()

    reply.status(200).send({
      users,
    })
  })
}
