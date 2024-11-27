const itinitial = {
  makeOrder: [],
};

export default (state = itinitial, action) => {
  switch (action.type) {
    case "MAKE__ADD":
      return { ...state, makeOrder: [...state.makeOrder, action.payload] };
    default:
      return state;
  }
};

export const MakeAdd = (makeOrder, payload) => {
  return (dispath) => {
    return dispath({ type: "MAKE__ADD", makeOrder, payload });
  };
};
