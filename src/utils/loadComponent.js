import store from '@/store';
import { SET_IS_LOADING, OPEN_ERROR_PROMPT } from '@/store/modules/common';

const importModule = name => {
  switch (name) {
    case 'HomeTutorial': {
      return import(/* webpackChunkName: "home-tutorial" */ '@/components/tutorial/HomeTutorial');
    }
    default: {
      throw new Error('Invalid component name');
    }
  }
};

/**
 * load module asynchronously with loading and error behaviour
 * @param {string} name custom module name
 */
const loadComponent = name => async () => {
  try {
    const timeoutId = setTimeout(() => store.commit(SET_IS_LOADING, true), 200);
    const module = await importModule(name);
    clearTimeout(timeoutId); // do not show loading animation if the module can be imported in short time
    store.commit(SET_IS_LOADING, false);
    return module;
  } catch (error) {
    store.commit(SET_IS_LOADING, false);
    store.dispatch(OPEN_ERROR_PROMPT, {
      message: {
        messageId: 'message.common.unknow_error',
      },
      title: {
        messageId: 'message.common.error_title',
      },
    });
  }
};

export default loadComponent;
