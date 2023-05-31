import {NativeModules, NativeEventEmitter} from 'react-native';
const {SmsListenerModule} = NativeModules;

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
