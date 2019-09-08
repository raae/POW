export const MENSTRUATION_SETTINGS_KEY = "menstruation"
export const INIT_STATUS_KEY = "init"

export const DEFAULT_STATE = {
  auth: {
    isPending: true,
    user: null,
  },
  entriesByDate: {},
  settings: {
    [MENSTRUATION_SETTINGS_KEY]: {
      tag: "",
    },
  },
  cycle: {
    startDates: [],
    currentStartDate: null,
    nextStartDate: null,
    averageLength: null,
    tagsForCurrentCycle: {},
    tagsForFutureCycles: {},
  },
  status: {
    [INIT_STATUS_KEY]: false,
  },
}
