
import { getWheatherTemp } from "../../api/weatherApi";

type props = {
  checkFor: string;
  innerToCheck: number;
  lat: string;
  lon: string;
}

/**
 * Get and check the temperature data
 * 
 * @param param
 * @returns 
 */
const getAndCheckWeather = async ({ checkFor, innerToCheck, lat, lon }: props): Promise<boolean> => {
  try {
    // get the temperature from the api
    const temp = await getWheatherTemp({ lat, lon });
    // Response true or false depending on the checkFor and toCheck
    return checkFor === "greater" ? temp > innerToCheck : temp < innerToCheck;
  } catch (error: any) {
    throw error;
  }
}


export { getAndCheckWeather };