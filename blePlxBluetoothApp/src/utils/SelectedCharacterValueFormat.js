export default function (selectedFormat) {
  switch (selectedFormat) {
    case 0:
      return 'UInt8';
    case 1:
      return 'UInt16LE';
    case 2:
      return 'UInt32LE';
    case 3:
      return 'Int8';
    case 4:
      return 'Int16LE';
    case 5:
      return 'Int32LE';
    case 6:
      return 'TextLE';
    case 7:
      return 'ByteArrayLE';

    default:
      return 'UInt16LE';
  }
}
