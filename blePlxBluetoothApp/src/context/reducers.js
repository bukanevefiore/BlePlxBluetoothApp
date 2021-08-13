export default function (state, action) {
  switch (action.type) {
    case 'SET_DEVICE':
      const {device} = action.payload;
      return {...state, selectedDevice: device};

    default:
      return state;
  }
}
