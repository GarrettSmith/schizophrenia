export const TOGGLE_SWITCH = 'TOGGLE_SWITCH';

export function toggleSwitch(value) {
  return {
    type: TOGGLE_SWITCH,
    payload: {
      value,
    },
  };
}
