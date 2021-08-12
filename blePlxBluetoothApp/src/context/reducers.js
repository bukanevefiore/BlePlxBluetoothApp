export default function (state, action) {
  switch (action.type) {
    case 'ADD_FEATURE':
      const {deviceFeature} = action.payload;
      const newList = [...state.list, deviceFeature];
      return {...state, list: newList};

    default:
      return state;
  }
}
