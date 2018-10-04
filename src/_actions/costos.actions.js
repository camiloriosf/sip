//@flow

import { costosConstants } from "../_constants";
import { costosService } from "../_services";
import myWorker from "../_workers/test.worker";

const code = myWorker.toString();
const blob = new Blob(["(" + code + ")()"]);
const worker = new Worker(URL.createObjectURL(blob));
// worker.addEventListener("message", event => {
//   console.log("event: ", event.data);
//   test(event.data);
// });

// const test = data => {
//   console.log("test: ", data);
// };

const setSelectedBarras = selected => {
  return async dispatch => {
    try {
      dispatch(request());
      dispatch(success(selected));
    } catch (err) {
      dispatch(error());
    }
  };
  function request() {
    return { type: costosConstants.SET_SELECTED_BARRAS_REQUEST };
  }
  function success(selected) {
    return {
      type: costosConstants.SET_SELECTED_BARRAS_SUCCESS,
      payload: { selected }
    };
  }
  function error() {
    return { type: costosConstants.SET_SELECTED_BARRAS_ERROR };
  }
};

const setTimeFilter = value => {
  return async dispatch => {
    try {
      dispatch(request());
      dispatch(success(value));
    } catch (err) {
      dispatch(error());
    }
  };
  function request() {
    return { type: costosConstants.SET_TIME_FILTER_REQUEST };
  }
  function success(value) {
    return {
      type: costosConstants.SET_TIME_FILTER_SUCCESS,
      payload: { value }
    };
  }
  function error() {
    return { type: costosConstants.SET_TIME_FILTER_ERROR };
  }
};

const setMoneyFilter = value => {
  return async dispatch => {
    try {
      dispatch(request());
      dispatch(success(value));
    } catch (err) {
      dispatch(error());
    }
  };
  function request() {
    return { type: costosConstants.SET_MONEY_FILTER_REQUEST };
  }
  function success(value) {
    return {
      type: costosConstants.SET_MONEY_FILTER_SUCCESS,
      payload: { value }
    };
  }
  function error() {
    return { type: costosConstants.SET_MONEY_FILTER_ERROR };
  }
};

const setDateFilter = ({ name, value }) => {
  return async dispatch => {
    try {
      dispatch(request());
      dispatch(success({ name, value }));
    } catch (err) {
      dispatch(error());
    }
  };
  function request() {
    return { type: costosConstants.SET_DATE_FILTER_REQUEST };
  }
  function success({ name, value }) {
    return {
      type: costosConstants.SET_DATE_FILTER_SUCCESS,
      payload: { name, value }
    };
  }
  function error() {
    return { type: costosConstants.SET_DATE_FILTER_ERROR };
  }
};

const fetchCostosMarginalesReales = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(request());
      const { costos } = getState();
      const { marginalReal } = costos;
      const { selected, from, to, fetched } = marginalReal;
      const mnemotecnicos = selected.map(e => e.mnemotecnico);
      const dates = [from.format("YYYY-MM-DD")];
      // let count = 0;
      const fromDate = from.clone().startOf("day");
      const toDate = to.clone().startOf("day");
      // while (!fromDate.isSame(toDate) && count < costosConstants.SAFE_COUNT) {
      while (!fromDate.isSame(toDate)) {
        fromDate.add(1, "days").startOf("day");
        dates.push(fromDate.format("YYYY-MM-DD"));
        // count++;
      }
      const fetch = costosService.checkFetchedData({
        mnemotecnicos,
        dates,
        fetched
      });
      const blocks = costosService.createBlocks({ fetch });
      const fetchCount = blocks.length;
      const compiledResults = [];
      for (const item of blocks) {
        const { mnemotecnico, start, end } = item;
        const url = `?barra_mnemotecnico__in=${mnemotecnico}&fecha__gte=${start}&fecha__lte=${end}`;
        // costosService
        //   .fetchData(window.encodeURIComponent(url))
        //   .then(results => {
        //     dispatch(success({ item, results, fetchCount }));
        //   })
        //   .catch(() => {
        //     dispatch(error({ fetchCount }));
        //   });
        const results = await costosService.fetchData(
          window.encodeURIComponent(url)
        );
        compiledResults.push(...results);
      }
      // console.log(compiledResults);
      // worker.postMessage({ compiledResults });
      if (blocks.length === 0)
        dispatch(success({ item: {}, results: [], fetchCount: 0 }));
    } catch (err) {
      dispatch(error({ fetchCount: 0 }));
    }
  };
  function request() {
    return { type: costosConstants.FETCH_COSTOS_MARGINALES_REALES_REQUEST };
  }
  function success({ item, results, fetchCount }) {
    return {
      type: costosConstants.FETCH_COSTOS_MARGINALES_REALES_SUCCESS,
      payload: { item, results, fetchCount }
    };
  }
  function error({ fetchCount }) {
    return {
      type: costosConstants.FETCH_COSTOS_MARGINALES_REALES_ERROR,
      payload: { fetchCount }
    };
  }
};

export const costosActions = {
  setSelectedBarras,
  setTimeFilter,
  setMoneyFilter,
  setDateFilter,
  fetchCostosMarginalesReales
};
