//@flow

import update from "immutability-helper";
import { barrasConstants } from "../_constants";

export type BarrasState = {
  items: Array<Object>
};

const defaultState = {
  items: []
};

type Action = {
  type: string,
  payload: Object
};

const barrasReducer = (
  state: BarrasState = defaultState,
  { type, payload }: Action
) => {
  switch (type) {
    case barrasConstants.GET_BARRAS_SUCCESS:
      return update(state, {
        items: {
          $apply: b =>
            payload.barras.map(barra => ({
              ...barra,
              label: barra.nombre,
              value: barra.id_infotecnica
            }))
        }
      });
    default:
      return state;
  }
};

export default barrasReducer;
