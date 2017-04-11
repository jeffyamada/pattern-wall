import { APP_START } from '../lib/constants';

function getInitialState() {
  return {
    appReady: false,
  };
}

function appReady() {
  return {
    appReady: true,
  };
}

export default function appReducer(state = getInitialState(), { type }) {
  switch (type) {
    case APP_START:
      return appReady();

    default:
      return state;
  }
}
