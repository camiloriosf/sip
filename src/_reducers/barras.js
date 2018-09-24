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
    default:
      return state;
  }
};

export default barrasReducer;
