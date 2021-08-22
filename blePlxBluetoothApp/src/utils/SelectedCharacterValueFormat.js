export default function (selectedFormat) {
  switch (selectedFormat) {
    case 0:
      return 'writeUInt8';
    case 1:
      return 'writeUInt16LE';
    case 2:
      return 'writeUInt32LE';
    case 3:
      return 'writeSint8LE';
    case 4:
      return 'writeSint16LE';
    case 5:
      return 'writeSint32LE';
    case 6:
      return 'writeTextLE';
    case 7:
      return 'writeByteArrayLE';

    default:
      return 'writeUInt16LE'; // default değer dönmüyor
  }
}
