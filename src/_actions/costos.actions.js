//@flow

import { costosConstants } from "../_constants";

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
      const { selected, results, from, to } = marginalReal;
      const mnemotecnicos = selected.map(e => e.mnemotecnico).join(",");
      console.log(
        mnemotecnicos,
        // results,
        from.format("YYYY-MM-DD"),
        to.format("YYYY-MM-DD")
      );
      // dispatch(success(items));
    } catch (err) {
      dispatch(error());
    }
  };
  function request() {
    return { type: costosConstants.FETCH_COSTOS_MARGINALES_REALES_REQUEST };
  }
  function success(items) {
    return {
      type: costosConstants.FETCH_COSTOS_MARGINALES_REALES_SUCCESS,
      payload: { items }
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
