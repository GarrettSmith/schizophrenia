import moment from 'moment';

const NOTIFICATION_ID = 1;

export default function init(onClick) {
  // Break out if not running on cordova
  if (!window.cordova) return;
  notify();
  registerClick(onClick);
}

function notify() {
  cordova.plugins.notification.local.schedule([{
    id: NOTIFICATION_ID,
    text: "Log an Entry for Today.",
    every: 'day',
    //at: moment().hour(5),
  }]);
}

function registerClick(onClick) {
  cordova.plugins.notification.local.on('click', onClick);
}
