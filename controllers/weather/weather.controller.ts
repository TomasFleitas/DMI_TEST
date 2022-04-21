import { FastifyReply, FastifyRequest } from "fastify"
import { getAndCheckWeather } from "./weather.dto"

// type of the query
type WeatherQuery = {
  toCheck: number;
  checkFor: string;
  lat?: string;
  lon?: string;
}

/**
 * Control all parameters and return the response
 */
export const weatherController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { toCheck, checkFor, lat, lon, ...rest } = request.query as WeatherQuery;

    // check if chekFor is valid
    if (!checkFor || (checkFor !== "greater" && checkFor !== "less")) {
      throw new Error("checkFor must be either 'greater' or 'less'");
    }

    //If for Check is empty, get default 15 or whatever you set in DEFAULT TEMP
    const innerToCheck = toCheck ?? process.env.DEFAULT_TEMP!;

    //chekf if a variable is a number
    if (isNaN(innerToCheck)) {
      throw new Error("toCheck must be a number");
    }

    //If lat or lon are empty, get by default Rio Cuarto or whatever you set to DEFAULT_<LAT||LON>
    const innerLat: string = lat ?? process.env.DEFAULT_LAT!;
    const innerLon: string = lon ?? process.env.DEFAULT_LON!;

    const resp = await getAndCheckWeather({ lat: innerLat, lon: innerLon, innerToCheck, checkFor, ...rest });

    reply.status(200).send(resp);
  } catch (error) {
    throw error;
  }
}


