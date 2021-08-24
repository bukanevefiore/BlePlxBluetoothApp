import {Buffer} from 'buffer';

export default function (selectedFormat) {
  switch (selectedFormat) {
    case 0:
      return 'writeUInt8';
    case 1:
      return 'writeUInt16LE';
    case 2:
      return 'writeUInt32LE';
    case 3:
      return 'writeInt8';
    case 4:
      return 'writeInt16LE';
    case 5:
      return 'writeInt32LE';
    case 6:
      return 'TextLE';
    case 7:
      return 'ByteArrayLE';

    default:
      return 'writeUInt16LE';
  }
}

/*
const = {
  name= "a",
  uint8: => {
    const heightBuffer = Buffer.alloc(2);
    heightBuffer[clickedFormat](value, 0);
  }
}
*/
