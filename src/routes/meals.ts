import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { UserIdValidation } from '../middlewares/userId'

export async function mealsRoutes(app: FastifyInstance) {
  // Deve ser possivel criar refeições
  app.post(
    '/',

    {
      preHandler: [UserIdValidation],
    },

    async (request, reply) => {
      const { userId } = request.cookies

      const createMealsSchema = z.object({
        title: z.string(),
        description: z.string(),
        isOnDiet: z.number(),
      })

      const { title, description, isOnDiet } = createMealsSchema.parse(
        request.body,
      )

      await knex('meals').insert({
        id: randomUUID(),
        title,
        description,
        isOnDiet,
        user_id: userId,
      })

      return reply.status(201).send()
    },
  )

  // Deve ser possível listar todas as refeições de um usuário
  app.get(
    '/',
    {
      preHandler: [UserIdValidation],
    },
    async (request, reply) => {
      const { userId } = request.cookies

      const meals = await knex('meals').where({ user_id: userId }).select()

      reply.status(200).send({
        meals,
      })
    },
  )

  // Deve ser possível visualizar uma única refeição
  app.get(
    '/:id',
    { preHandler: [UserIdValidation] },
    async (request, reply) => {
      const getMealsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealsParamsSchema.parse(request.params)

      const meal = await knex('meals').where({ id }).select().first()

      return reply.status(200).send({
        meal,
      })
    },
  )

  // Deve ser possível apagar uma refeição
  app.delete(
    '/:id',
    { preHandler: [UserIdValidation] },
    async (request, reply) => {
      const deleteMealsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = deleteMealsParamsSchema.parse(request.params)

      await knex('meals').where({ id }).del()

      return reply.status(202).send()
    },
  )

  // Deve ser possível editar uma refeição, podendo alterar todos os dados acima
  app.put(
    '/:id',

    { preHandler: [UserIdValidation] },

    async (request, reply) => {
      const getMealsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealsParamsSchema.parse(request.params)

      const updateMealsSchema = z.object({
        title: z.string(),
        description: z.string(),
        isOnDiet: z.number(),
      })

      const { title, description, isOnDiet } = updateMealsSchema.parse(
        request.body,
      )

      await knex('meals').where({ id }).update({
        title,
        description,
        isOnDiet,
      })

      return reply.status(204).send()
    },
  )

  // Deve ser possível recuperar as métricas de um usuário
  app.get('/summary', async (request, reply) => {
    const { userId } = request.cookies

    const meals = await knex('meals').where({ user_id: userId }).select()

    let biggestSequency = 0
    let sequency = 0
    let dataAtual: string = ''

    meals.forEach((meal) => {
      const dataRefeicao = new Date(meal.date).toLocaleDateString()

      if (dataAtual !== dataRefeicao) {
        sequency = 0
        dataAtual = dataRefeicao
      }

      if (meal.isOnDiet === 1) {
        sequency++
        biggestSequency = Math.max(biggestSequency, sequency)
      } else {
        sequency = 0
      }
    })

    const summary = {
      totalMeals: meals.length,
      mealsOnDiet: meals.filter((meal) => meal.isOnDiet === 1).length,
      mealsOutDiet: meals.filter((meal) => meal.isOnDiet === 0).length,
      biggestSequency,
    }

    return reply.status(200).send({
      summary,
    })
  })
}
