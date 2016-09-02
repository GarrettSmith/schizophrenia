import {merge} from 'ramda';

import Crisis from './crisis/Page.react';
import GoalEntry from './goal/entry/Page.react';
import Home from './home/Page.react';
import Journal from './journal/Page.react';
import JournalEntry from './journal/entry/Page.react';
import JournalView from './journal/View.react';
import LogAgenda from './log/agenda/Page.react';
import LogAll from './log/all/Page.react';
import LogEntry from './log/entry/Page.react';
import LogMonth from './log/month/Page.react';
import LogWeek from './log/week/Page.react';
import Settings from './settings/Page.react';
import Support from './support/Page.react';
import Tracking from './tracking/Page.react';

export const ROUTES = {
  home: {
    icon: 'md-home',
    key: 'home',
    name: 'Home',
    component: Home,
  },

  logAgenda: {
    icon: 'md-calendar',
    key: 'logAgenda',
    name: 'Logging',
    component: LogAgenda,
  },

  logWeek: {
    icon: 'md-view-week',
    key: 'logWeek',
    name: 'Week',
    component: LogAgenda,
  },

  logMonth: {
    icon: 'md-view-module',
    key: 'logMonth',
    name: 'Month',
    component: LogAgenda,
  },

  logEntry: {
    disableDrawer: true,
    icon: 'md-edit',
    key: 'logEntry',
    name: 'Track an Entry',
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
    name: 'Support',
    component: Support,
  },

  settings: {
    icon: 'md-settings',
    key: 'settings',
    name: 'Settings',
    component: Settings,
  },

  help: {
    icon: 'md-help',
    key: 'help',
    name: 'Help & Feedback',
    component: null,
  },

  journal: {
    icon: 'md-book',
    key: 'journal',
    name: 'Journal',
    component: Journal
  },

  journalEntry: {
    icon: 'md-book',
    key: 'journalEntry',
    name: 'Journal Entry',
    component: JournalEntry
  },

  journalView: {
    icon: 'md-book',
    key: 'journalView',
    name: 'Journal View',
    component: JournalView
  },

  crisis: {
    key: 'crisis',
    component: Crisis,
  },

  tracking: {
    key: 'tracking',
    icon: 'md-chart',
    name: 'Tracking',
    component: Tracking,
  },

  goalEntry: {
    key: 'goalEntry',
    component: GoalEntry,
  },

};

export const INITIAL_ROUTE = ROUTES.home;

export function route(key, props) {
  return merge(
    ROUTES[key],
    props,
  );
}

