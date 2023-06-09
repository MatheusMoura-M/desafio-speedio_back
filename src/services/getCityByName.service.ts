import axios from "axios";
import { getWeatherSchema } from "../schemas";
import { AppError } from "../error";

export const getCityByNameService = async (city: string) => {
  const api = axios.create({
    baseURL: "http://api.weatherapi.com/v1",
  });

  const resp = await api
    .get(
      `/forecast.json?key=c3ecb89df3234a44869184438230206&q=${city}&days=5&lang=pt`
    )
    .then((res) => {
      if (!res.data.location.region) {
        res.data.location.region = "Indefinida";
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw new AppError(err.response.data.error, 404);
    });

  const respFormated = getWeatherSchema.validate(resp, {
    stripUnknown: true,
  });

  return respFormated;
};
