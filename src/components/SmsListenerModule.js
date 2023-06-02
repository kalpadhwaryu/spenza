import {NativeModules, NativeEventEmitter, LogBox} from 'react-native';
const {SmsListenerModule} = NativeModules;

LogBox.ignoreLogs(['new NativeEventEmitter']);

export const startSmsListener = () => {
  SmsListenerModule.startSmsListener();
};

const smsReceivedEventEmitter = new NativeEventEmitter(SmsListenerModule);

export const addSmsReceivedListener = callback => {
  const subscription = smsReceivedEventEmitter.addListener(
    'smsReceived',
    callback,
  );

  return subscription;
};
