import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function mealsRoutes(app: FastifyInstance) {
  // Deve ser possivel criar refeições
  app.post('/', async (request, reply) => {
    const createMealsSchema = z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      isOnDiet: z.boolean(),
    })

    const { title, description, date, isOnDiet } = createMealsSchema.parse(
      request.body,
    )

    await knex('meals').insert({
      id: randomUUID(),
      title,
      description,
      date,
      isOnDiet,
      user_id: 'c9bae7d7-5a62-4b5f-b4e8-2ffe53eb1423',
    })

    reply.status(201).send()
  })

  // Deve ser possível listar todas as refeições de um usuário
  app.get('/', async (request, reply) => {
    const meals = await knex('meals').select()

    reply.status(200).send({
      meals,
    })
  })

  // Deve ser possível visualizar uma única refeição
  app.get('/:id', async (request, reply) => {
    const getMealsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealsParamsSchema.parse(request.params)

    const meal = await knex('meals').where({ id }).select().first()

    reply.status(200).send({
      meal,
    })
  })

  // Deve ser possível apagar uma refeição
  app.delete('/:id', async (request, reply) => {
    const deleteMealsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = deleteMealsParamsSchema.parse(request.params)

    await knex('meals').where({ id }).del()

    reply.status(202).send()
  })

  // Deve ser possível editar uma refeição, podendo alterar todos os dados acima
  app.put('/:id', async (request, reply) => {
    const getMealsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealsParamsSchema.parse(request.params)

    const updateMealsSchema = z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      isOnDiet: z.boolean(),
    })

    const { title, description, date, isOnDiet } = updateMealsSchema.parse(
      request.body,
    )

    await knex('meals').where({ id }).update({
      title,
      description,
      date,
      isOnDiet,
    })

    reply.status(204).send()
  })

  // Deve ser possível recuperar as métricas de um usuário
  app.get('/summary', async (request, reply) => {})
}
