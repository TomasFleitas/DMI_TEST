import { FastifyInstance } from "fastify";
import { weatherController } from "./weather/weather.controller";


// All wheater controllers
const registerWeatherMethods = (fastify: FastifyInstance) => {
  //Routes and methods definition
  fastify.get("/", weatherController);

  //add other methods here relation to the routes and methods
  // ...
}

// Add other controllers here
// ...


export { registerWeatherMethods }