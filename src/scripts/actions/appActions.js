import { APP_START } from '../lib/constants';

export default function appStart() {
  return (dispatch) => {
    const appPromise = new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    return appPromise.then(() => {
      dispatch({
        type: APP_START,
      });
    });
  };
}
