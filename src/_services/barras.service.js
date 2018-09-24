//@flow

import axios from "axios";
import { apiConstants } from "../_constants";

const getBarras = async () => {
  const result = await axios.get(
    `${apiConstants.API_URL}${apiConstants.BARRAS_COSTOS}`,
    {
      headers: {
        crossorigin: true,
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
  const { data = {} } = result;
  const { aggs } = data.data || {};
  return aggs;
};

export const barrasService = {
  getBarras
};
