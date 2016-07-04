export const ROUTES = {
  logAgenda: {
    name: 'logAgenda',
    component: null,
  },

  logWeek: {
    name: 'logWeek',
    component: null,
  },

  logMonth: {
    name: 'logMonth',
    component: null,
  },

  logAll: {
    name: 'logAll',
    component: null,
  },

  logEntry: {
    name: 'logEntry',
    component: null,
  },

  medication: {
    name: 'medication',
    component: null,
  },

  support: {
    name: 'support',
    component: null,
  },

  settings: {
    name: 'settings',
    component: null,
  },

  help: {
    name: 'help',
    component: null,
  },
};

export const INITIAL_ROUTE = ROUTES.log;

export function route(name) {
  return ROUTES[name];
}

