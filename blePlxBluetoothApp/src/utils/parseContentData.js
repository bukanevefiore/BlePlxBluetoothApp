export default function (data) {
  return Object.keys(data).map(key => {
    return {
      title: key.serviceUUID,
      ...data[key],
    };
  });
}
