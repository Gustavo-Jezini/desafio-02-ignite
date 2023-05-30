import { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  
  // Deve ser possivel criar usuário
  app.post('/', async (request, reply) => {
    const { 
      name,
      description,
      created_at,
      isOnDiet
     } = request.body
  })
}