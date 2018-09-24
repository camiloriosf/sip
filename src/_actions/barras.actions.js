//@flow

import { barrasConstants } from "../_constants";
import { barrasService } from "../_services";

const getBarras = () => {
  return async dispatch => {
    try {
      dispatch(request());
      const barras = await barrasService.getBarras();
      dispatch(success(barras));
    } catch (err) {
      dispatch(error(err));
    }
  };
  function request() {
    return { type: barrasConstants.GET_BARRAS_REQUEST };
  }
  function success(barras) {
    return {
      type: barrasConstants.GET_BARRAS_SUCCESS,
      payload: { barras }
    };
  }
  function error(error) {
    return { type: barrasConstants.GET_BARRAS_ERROR, payload: { error } };
  }
};

export const barrasActions = {
  getBarras
};
