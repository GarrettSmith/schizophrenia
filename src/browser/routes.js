import Crisis from './crisis/Page.react';
import Home from './home/Page.react';
import Journal from './journal/Page.react';
import JournalEntry from './journal/entry/Page.react';
import LogAgenda from './log/agenda/Page.react';
import LogAll from './log/all/Page.react';
import LogMonth from './log/month/Page.react';
import LogWeek from './log/week/Page.react';
import LogEntry from './log/entry/Page.react';
import Support from './support/Page.react';
import SupportEntry from './support/entry/Page.react';
import Tracking from './tracking/Page.react';
import GoalEntry from './goal/entry/Page.react';

export const ROUTES = {
  home: {
    icon: 'md-home',
    key: 'home',
    component: Home,
  },

  logAgenda: {
    icon: 'md-view-agenda',
    key: 'logAgenda',
    component: LogAgenda,
  },

  logWeek: {
    icon: 'md-view-week',
    key: 'logWeek',
    component: LogAgenda,
  },

  logMonth: {
    icon: 'md-view-module',
    key: 'logMonth',
    component: LogAgenda,
  },

  logAll: {
    icon: 'md-time',
    key: 'logAll',
    component: LogAgenda,
  },

  logEntry: {
    key: 'logEntry',
    component: LogEntry,
  },

  medication: {
    icon: 'md-hospital-alt',
    key: 'medication',
    component: null,
  },

  support: {
    icon: 'md-accounts',
    key: 'support',
    component: Support,
  },

  supportEntry: {
    icon: 'md-accounts',
    key: 'supportEntry',
    component: SupportEntry,
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

  journal: {
    icon: 'md-book',
    key: 'journal',
    component: Journal
  },

  journalEntry: {
    key: 'journalEntry',
    component: JournalEntry
  },

  crisis: {
    key: 'crisis',
    component: Crisis,
  },

  tracking: {
    key: 'tracking',
    component: Tracking,
  },

  goalEntry: {
    key: 'goalEntry',
    component: GoalEntry,
  }
};

export const INITIAL_ROUTE = ROUTES.home;

export function route(key) {
  return ROUTES[key];
}

