// @flow

type MarginalReal = {
  results: Array<Object>
};

export type CostosState = {
  marginalReal: MarginalReal,
  barras: Array<Object>
};

const defaultState = {
  marginalReal: {
    results: []
  },
  barras: []
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
    default:
      return state;
  }
};

export default costosReducer;
