import { FastifyInstance } from "fastify"

export async function mealsRoutes(app: FastifyInstance) {
  
  // Deve ser possivel criar refeições
  app.post('/', async (request, reply) => {
    
  })
  
  // Deve ser possível apagar uma refeição
  app.delete('/', async (request, reply) => {
  
  })
    
  // Deve ser possível editar uma refeição, podendo alterar todos os dados acima
  app.put('/', async (request, reply) => {
    
  })
  
  // Deve ser possível listar todas as refeições de um usuário
  app.get('/', async (request, reply) => {
  
  })
  
  // Deve ser possível visualizar uma única refeição
  app.get('/:id', async (request, reply) => {

  })

  // Deve ser possível recuperar as métricas de um usuário
  app.get('/summary', async (request, reply) => {
  
  })
}