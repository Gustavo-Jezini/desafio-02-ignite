import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { mealsRoutes } from './routes/meals'
import { usersRoutes } from './routes/users'

const app = fastify()

app.register(cookie)

app.register(usersRoutes, { prefix: '/users' })

app.register(mealsRoutes, { prefix: '/users/:user_id/meals' })

app
  .listen({
    port: 4444,
  })
  .then(() => console.log('HTTP Server Running on Port: 4444'))
