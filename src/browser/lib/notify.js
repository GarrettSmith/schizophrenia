import moment from 'moment';

const NOTIFICATION_ID = 1;

export default function init(enabled, time, onClick) {
  // Break out if not running on cordova
  if (!window.cordova) return;
  notify(enabled, time);
  registerClick(onClick);
}

function notify(enabled, time) {
  if (enabled) {
    cordova.plugins.notification.local.schedule({
      id: NOTIFICATION_ID,
      text: "Log an Entry for Today.",
      every: 'day',
      firstAt: moment().millisecond(time),
    });
  } else {
    cordova.plugins.notification.cancel([NOTIFICATION_ID]);
  }
}

function registerClick(onClick) {
  cordova.plugins.notification.local.on('click', onClick);
}
