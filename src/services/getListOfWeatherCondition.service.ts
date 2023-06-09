import axios from "axios";
import { getListOfWeatherConditionSchema } from "../schemas";

export const getListOfWeatherConditionService = async () => {
  const api = axios.create({
    baseURL: "http://api.weatherapi.com/v1",
  });

  const resp = await api
    .get("https://www.weatherapi.com/docs/conditions.json")
    .then((res) => {
      const respFiltered = res.data.map((elem) => {
        elem.languages.map((language, i) => {
          if (i == 20) {
            elem.weather_condition_day = language.day_text;
            elem.weather_condition_night = language.night_text;
            delete elem.languages;
            return language;
          }
        });
        return elem;
      });

      return respFiltered;
    })
    .catch((err) => console.log(err));

  const respFormated = getListOfWeatherConditionSchema.validate(resp, {
    stripUnknown: true,
  });

  return respFormated;
};
