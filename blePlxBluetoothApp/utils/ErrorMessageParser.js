export default function (errorCode) {
  switch (errorCode) {
    case '5':
      return 'There was a problem try again..';
    case '205':
      return 'Device is not connected! Check your device connection !';
    case '203':
      return 'Device is already connected !';
    case '201':
      return 'Device was disconnected ! There was a problem try again.';
    case '2':
      return 'Operation was cancelled ! There was a problem try again.';
    case 'ERR00':
      return 'Unlock operation canceled.';
    case 'ERR01':
      return 'Unable to change settings.';
    case 'ERR02':
      return 'Unlock operation canceled.';
    case 'ERR03':
      return 'Internal error.';

    default:
      return 'There was a problem try again..';
  }
}
