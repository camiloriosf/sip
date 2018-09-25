//@flow

import { costosConstants } from "../_constants";
import { costosService } from "../_services";

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
      let count = 0;
      const fromDate = from.clone().startOf("day");
      const toDate = to.clone().startOf("day");
      while (!fromDate.isSame(toDate) && count < costosConstants.SAFE_COUNT) {
        fromDate.add(1, "days");
        dates.push(fromDate.format("YYYY-MM-DD"));
        count++;
      }
      const fetch = costosService.checkFetchedData({
        mnemotecnicos,
        dates,
        fetched
      });
      for (const item of fetch) {
        const { mnemotecnico, date } = item;
        const url = `?barra_mnemotecnico__in=${mnemotecnico}&fecha__gte=${date}&fecha__lte=${date}`;
        const results = await costosService.fetchData(
          window.encodeURIComponent(url)
        );
        console.log(results);
        dispatch(success({ item }));
      }
    } catch (error) {
      console.log(error);
      dispatch(error());
    }
  };
  function request() {
    return { type: costosConstants.FETCH_COSTOS_MARGINALES_REALES_REQUEST };
  }
  function success({ item }) {
    return {
      type: costosConstants.FETCH_COSTOS_MARGINALES_REALES_SUCCESS,
      payload: { item }
    };
  }
  function error() {
    return { type: costosConstants.FETCH_COSTOS_MARGINALES_REALES_ERROR };
  }
};

export const costosActions = {
  setSelectedBarras,
  setTimeFilter,
  setMoneyFilter,
  setDateFilter,
  fetchCostosMarginalesReales
};
