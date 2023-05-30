import fastify from "fastify";

const app = fastify();

app.listen({
  port: 4444
}).then(() => console.log('HTTP running'))