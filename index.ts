import Fastify from "fastify";
import { registerWeatherMethods } from "./controllers";
import { cache } from "./plugin/cache";


/* Enviroment config */
require('dotenv').config({ path: `.env` });

const fastify = Fastify({
  logger: false
})

//Start methods and router
registerWeatherMethods(fastify);


//Register cache plugin
fastify.register(cache)


// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log("Server listening on " + address)
})