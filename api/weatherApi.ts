import axios from "axios";

type WeatherQuery = {
  lat: string;
  lon: string;
}

const getWheatherTemp = async (query: WeatherQuery) => {
  try {
    const { data } = await axios.get(process.env.URL_API + "", { params: { ...query, units: "metric", appid: process.env.WHEATHER_API } })
    // check if the result is not empty
    if (!data?.current?.temp) {
      throw new Error("No data found");
    }
    return data.current.temp;
  } catch (error: any) {
    throw new Error(error.message || "Error getting the temperature");
  }
};

export { getWheatherTemp }