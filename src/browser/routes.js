import LogAgenda from './log/agenda/Page.react';

export const ROUTES = {
  logAgenda: {
    icon: 'md-view-agenda',
    key: 'logAgenda',
    component: LogAgenda,
  },

  logWeek: {
    icon: 'md-view-week',
    key: 'logWeek',
    component: null,
  },

  logMonth: {
    icon: 'md-view-module',
    key: 'logMonth',
    component: null,
  },

  logAll: {
    icon: 'md-schedule',
    key: 'logAll',
    component: null,
  },

  logEntry: {
    key: 'logEntry',
    component: null,
  },

  medication: {
    icon: 'md-pharmacy',
    key: 'medication',
    component: null,
  },

  support: {
    icon: 'md-group',
    key: 'support',
    component: null,
  },

  settings: {
    icon: 'md-settings',
    key: 'settings',
    component: null,
  },

  help: {
    icon: 'md-help',
    key: 'help',
    component: null,
  },
};

export const INITIAL_ROUTE = ROUTES.logAgenda;

export function route(key) {
  return ROUTES[key];
}

