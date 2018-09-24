//@flow

import axios from "axios";
import { apiConstants } from "../_constants";

const getBarras = async () => {
  const result = await axios.get(
    `${apiConstants.API_URL}${apiConstants.COSTOS_MARGINALES_REALES}`,
    {
      headers: {
        crossorigin: true,
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
  const { data = {} } = result;
  const { items = [] } = data;
  return items;
};

export const barrasService = {
  getBarras
};
