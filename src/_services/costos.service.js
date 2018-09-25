//@flow

import axios from "axios";
import { apiConstants } from "../_constants";

const checkFetchedData = ({ mnemotecnicos = [], dates = [], fetched = {} }) => {
  try {
    const result = [];
    for (const mnemotecnico of mnemotecnicos) {
      for (const date of dates) {
        if (fetched[mnemotecnico] && !fetched[mnemotecnico][date]) {
          result.push({ mnemotecnico, date });
        } else if (!fetched[mnemotecnico]) {
          result.push({ mnemotecnico, date });
        }
      }
    }
    return result;
  } catch (error) {
    return [];
  }
};

const fetchData = async (url: string) => {
  const result = await axios.get(
    `${apiConstants.API_URL}${apiConstants.COSTOS_MARGINALES_REALES}${url}`,
    {
      headers: {
        crossorigin: true,
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
  const { data = {} } = result;
  return data && data.data ? data.data.data : [];
};

export const costosService = {
  checkFetchedData,
  fetchData
};
