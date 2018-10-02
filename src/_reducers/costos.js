// @flow

import update from "immutability-helper";
import moment from "moment";
import { costosConstants } from "../_constants";

// type MarginalRealResults = {
//   hourly: Object,
//   daily: Object,
//   monthly: Object,
//   yearly: Object
// };

// type MarginalRealItem = {
//   name
// }

type loader = {
  loading: boolean,
  total: number,
  current: number
};

type MarginalReal = {
  results: Object,
  selected: Array<Object>,
  fetched: Object,
  timeFilter: string,
  timeMap: Object,
  moneyFilter: string,
  from: string,
  to: string,
  loader: loader
};

export type CostosState = {
  marginalReal: MarginalReal
};

const defaultState = {
  marginalReal: {
    results: {},
    selected: [],
    fetched: {},
    timeFilter: "hourly",
    timeMap: { hourly: "h", daily: "d", monthly: "M", yearly: "y" },
    moneyFilter: "clp",
    from: moment().add(-1, "day"),
    to: moment().add(-1, "day"),
    loader: {
      loading: false,
      total: 0,
      current: 0
    }
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
    case costosConstants.FETCH_COSTOS_MARGINALES_REALES_REQUEST:
      return update(state, {
        marginalReal: {
          loader: {
            loading: { $set: true }
          }
        }
      });
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
    case costosConstants.FETCH_COSTOS_MARGINALES_REALES_SUCCESS:
      return update(state, {
        marginalReal: {
          loader: {
            $apply: b => {
              const { fetchCount } = payload;
              if (fetchCount === 0)
                return { total: 0, current: 0, loading: false };
              if (fetchCount === b.current + 1)
                return { total: 0, current: 0, loading: false };
              return {
                total: fetchCount,
                current: b.current + 1,
                loading: true
              };
            }
          },
          fetched: {
            $apply: b => {
              const { item } = payload;
              const { mnemotecnico, start, end } = item;
              const dates = {};
              dates[mnemotecnico] = { ...b[mnemotecnico], [start]: true };
              const startMoment = moment(start).startOf("day");
              const endMoment = moment(end).startOf("day");
              while (!startMoment.isSame(endMoment)) {
                startMoment.add(1, "days").startOf("day");
                dates[mnemotecnico][startMoment.format("YYYY-MM-DD")] = true;
              }
              return { ...b, ...dates };
            }
          },
          results: {
            $apply: b => {
              try {
                const { item, results } = payload;
                if (results.length === 0) return b;
                const { mnemotecnico } = item;
                for (const o of results) {
                  const month = moment(o.fecha).format("YYYY-MM");
                  const year = moment(o.fecha).format("YYYY");
                  const length =
                    b[mnemotecnico] && b[mnemotecnico].items
                      ? b[mnemotecnico].items
                      : 0;
                  b[mnemotecnico] = {
                    items: length + 1,
                    hourly: {
                      ...(b[mnemotecnico] && b[mnemotecnico].hourly),
                      [`${o.fecha} ${o.hora < 10 ? "0" : ""}${o.hora}:00`]: {
                        usd: Math.round(o.costo_en_dolares * 100) / 100,
                        clp: Math.round(o.costo_en_pesos * 100) / 100
                      }
                    },
                    daily: {
                      ...(b[mnemotecnico] && b[mnemotecnico].daily),
                      [o.fecha]: {
                        usd:
                          b[mnemotecnico] &&
                          b[mnemotecnico].daily &&
                          b[mnemotecnico] &&
                          b[mnemotecnico].daily[o.fecha] &&
                          b[mnemotecnico].daily[o.fecha].usd
                            ? Math.round(
                                ((b[mnemotecnico].daily[o.fecha].usd * length +
                                  o.costo_en_dolares) /
                                  (length + 1)) *
                                  100
                              ) / 100
                            : Math.round(o.costo_en_dolares * 100) / 100,
                        clp:
                          b[mnemotecnico] &&
                          b[mnemotecnico].daily &&
                          b[mnemotecnico] &&
                          b[mnemotecnico].daily[o.fecha] &&
                          b[mnemotecnico].daily[o.fecha].clp
                            ? Math.round(
                                ((b[mnemotecnico].daily[o.fecha].clp * length +
                                  o.costo_en_pesos) /
                                  (length + 1)) *
                                  100
                              ) / 100
                            : Math.round(o.costo_en_pesos * 100) / 100
                      }
                    },
                    monthly: {
                      ...(b[mnemotecnico] && b[mnemotecnico].monthly),
                      [month]: {
                        usd:
                          b[mnemotecnico] &&
                          b[mnemotecnico].monthly &&
                          b[mnemotecnico] &&
                          b[mnemotecnico].monthly[month] &&
                          b[mnemotecnico].monthly[month].usd
                            ? Math.round(
                                ((b[mnemotecnico].monthly[month].usd * length +
                                  o.costo_en_dolares) /
                                  (length + 1)) *
                                  100
                              ) / 100
                            : Math.round(o.costo_en_dolares * 100) / 100,
                        clp:
                          b[mnemotecnico] &&
                          b[mnemotecnico].monthly &&
                          b[mnemotecnico] &&
                          b[mnemotecnico].monthly[month] &&
                          b[mnemotecnico].monthly[month].clp
                            ? Math.round(
                                ((b[mnemotecnico].monthly[month].clp * length +
                                  o.costo_en_pesos) /
                                  (length + 1)) *
                                  100
                              ) / 100
                            : Math.round(o.costo_en_pesos * 100) / 100
                      }
                    },
                    yearly: {
                      ...(b[mnemotecnico] && b[mnemotecnico].yearly),
                      [year]: {
                        usd:
                          b[mnemotecnico] &&
                          b[mnemotecnico].yearly &&
                          b[mnemotecnico] &&
                          b[mnemotecnico].yearly[year] &&
                          b[mnemotecnico].yearly[year].usd
                            ? Math.round(
                                ((b[mnemotecnico].yearly[year].usd * length +
                                  o.costo_en_dolares) /
                                  (length + 1)) *
                                  100
                              ) / 100
                            : Math.round(o.costo_en_dolares * 100) / 100,
                        clp:
                          b[mnemotecnico] &&
                          b[mnemotecnico].yearly &&
                          b[mnemotecnico] &&
                          b[mnemotecnico].yearly[year] &&
                          b[mnemotecnico].yearly[year].clp
                            ? Math.round(
                                ((b[mnemotecnico].yearly[year].clp * length +
                                  o.costo_en_pesos) /
                                  (length + 1)) *
                                  100
                              ) / 100
                            : Math.round(o.costo_en_pesos * 100) / 100
                      }
                    }
                  };
                }
                return b;
              } catch (err) {
                console.log(err);
                return b;
              }
            }
          }
        }
      });
    case costosConstants.FETCH_COSTOS_MARGINALES_REALES_ERROR:
      return update(state, {
        marginalReal: {
          loader: {
            $apply: b => {
              const { fetchCount } = payload;
              if (fetchCount === b.current + 1)
                return { total: 0, current: 0, loading: false };
              return {
                total: fetchCount,
                current: b.current + 1,
                loading: true
              };
            }
          }
        }
      });
    default:
      return state;
  }
};

export default costosReducer;
