// @flow

import update from "immutability-helper";
import moment from "moment";
import { costosConstants } from "../_constants";

type MarginalReal = {
  results: Array<Object>,
  selected: Array<Object>,
  fetched: Object,
  timeFilter: string,
  moneyFilter: string,
  from: string,
  to: string
};

export type CostosState = {
  marginalReal: MarginalReal
};

const defaultState = {
  marginalReal: {
    results: [],
    selected: [],
    fetched: {},
    timeFilter: "hour",
    moneyFilter: "clp",
    from: moment(),
    to: moment()
  }
};

type Action = {
  type: string,
  payload: Object
};

const costosReducer = (
  state: CostosState = defaultState,
  { type, payload }: Action
) => {
  switch (type) {
    case costosConstants.SET_SELECTED_BARRAS_SUCCESS:
      return update(state, {
        marginalReal: {
          selected: { $set: payload.selected }
        }
      });
    case costosConstants.SET_TIME_FILTER_SUCCESS:
      return update(state, {
        marginalReal: {
          timeFilter: { $set: payload.value }
        }
      });
    case costosConstants.SET_MONEY_FILTER_SUCCESS:
      return update(state, {
        marginalReal: {
          moneyFilter: { $set: payload.value }
        }
      });
    case costosConstants.SET_DATE_FILTER_SUCCESS:
      return update(state, {
        marginalReal: {
          [payload.name]: { $set: payload.value }
        }
      });
    default:
      return state;
  }
};

export default costosReducer;
