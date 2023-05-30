import fastify from "fastify";
import { mealsRoutes } from "./routes/meal";
import { usersRoutes } from "./routes/users";

const app = fastify();

app.register(usersRoutes, {
  prefix: '/users'
})

app.register(mealsRoutes, {
  prefix: '/meals'
})

app.listen({
  port: 4444
}).then(() => console.log('HTTP running'))