//@flow

import axios from "axios";
import moment from "moment";
import { apiConstants } from "../_constants";
// import myWorker from "../_workers/test.worker";

// const code = myWorker.toString();
// const blob = new Blob(["(" + code + ")()"]);
// const worker = new Worker(URL.createObjectURL(blob));
// worker.addEventListener("message", event => {
//   console.log("event: ", event.data);
// });
// worker.postMessage({ id: 123, name: "asd" });

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

const createBlocks = ({ fetch }) => {
  try {
    const blocks = [];
    const MAX_COUNTS = 30;
    let current = "";
    let start = "";
    let end = "";
    let count = 0;
    for (const item of fetch) {
      const { mnemotecnico, date } = item;
      if (current === "") {
        current = mnemotecnico;
        start = end = date;
        count = 1;
      } else if (
        current !== "" &&
        !moment(end)
          .add(1, "days")
          .isSame(moment(date))
      ) {
        blocks.push({ mnemotecnico: current, start, end });
        current = mnemotecnico;
        start = end = date;
        count = 1;
      } else if (current !== "" && count === MAX_COUNTS) {
        blocks.push({ mnemotecnico: current, start, end });
        current = mnemotecnico;
        start = end = date;
        count = 1;
      } else if (current !== mnemotecnico) {
        blocks.push({ mnemotecnico: current, start, end });
        current = mnemotecnico;
        start = end = date;
        count = 1;
      } else {
        count++;
        end = date;
        // console.log(current);
      }
    }
    if (count !== 0) blocks.push({ mnemotecnico: current, start, end });
    return blocks;
  } catch (error) {
    return [];
  }
};

const fetchData = (url: string) => {
  // worker.postMessage({
  //   uri: `${apiConstants.API_URL}${apiConstants.COSTOS_MARGINALES_REALES}${url}`
  // });
  return axios
    .get(
      `${apiConstants.API_URL}${apiConstants.COSTOS_MARGINALES_REALES}${url}`,
      {
        headers: {
          crossorigin: true,
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
    .then(result => {
      const { data = {} } = result;
      return data && data.data ? data.data.data : [];
    });
};

export const costosService = {
  checkFetchedData,
  createBlocks,
  fetchData
};
