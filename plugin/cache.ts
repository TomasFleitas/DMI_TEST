import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import NodeCache from "node-cache";
import fastifyPlugin from "fastify-plugin";

const cache = fastifyPlugin(async (fastify: FastifyInstance, opts: any) => {
  const cache = new NodeCache();
  const CACHE_TTL = process.env.CACHE_TTL!; // Time to Live in seconds

  // Event triggered when a key is expired after the TTL
  cache.on("expired", (key: string) => {
    console.log("Cache expired: ", key);
  })

  // Listener when a new request is received
  fastify.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
    if ("GET" === request.method) {
      const key = getKey(request);
      const cached = cache.get(key);
      if (cached) {
        console.log("Cache hit: ", key);
        reply.send(cached);
      }
    }
  });


  // Listener when a response is sent
  fastify.addHook("onSend", async (request: FastifyRequest, reply: FastifyReply, payload: any, done: Function) => {
    if ("GET" === request.method) {
      const key = getKey(request);
      const cached = cache.get(key);
      if (!cached) {
        console.log("Cache miss: ", key);
        cache.set(key, payload, CACHE_TTL);
      }
    }
  })
});

// Generate the key to use in the cache
const getKey = (request: FastifyRequest) => {
  const key = request.url
  return `${key}`;
}

export { cache };