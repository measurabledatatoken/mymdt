import { ErrorCode } from '@/enum';

import { SET_IS_LOADING, OPEN_ERROR_PROMPT } from '@/store/modules/common';

import { forcePromiseToRunForAtLeast } from '@/utils';
import { LoadingPopupDelayInMillisecond } from '@/constants';

export const REQUEST = 'api/REQUEST';
export const HANDLE_ERROR_CODE = 'api/HANDLE_ERROR_CODE';

const actions = {
  async [REQUEST]({ commit, dispatch }, payload) {
    const {
      api,
      args,
      setLoading = false,
      persistLoading = false,
      runForAtLeast = 0,
      ...errorOptions
    } = payload;
    if (typeof api !== 'function') {
      throw new Error('api should be a function');
    }

    let timeoutId = null;
    if (setLoading) {
      timeoutId = setTimeout(
        () => commit(SET_IS_LOADING, true),
        LoadingPopupDelayInMillisecond,
      ); // do not show loading animation if the request is completed in short time
    }

    try {
      const apiArguments = Array.isArray(args) ? args : [args];
      const response = await forcePromiseToRunForAtLeast(
        api(...apiArguments),
        runForAtLeast,
      );

      if (setLoading) {
        if (timeoutId) clearTimeout(timeoutId);
        if (!persistLoading) {
          commit(SET_IS_LOADING, false);
        }
      }
      return response;
    } catch (error) {
      if (setLoading) {
        if (timeoutId) clearTimeout(timeoutId);
        commit(SET_IS_LOADING, false);
      }

      dispatch(HANDLE_ERROR_CODE, {
        error,
        ...errorOptions,
      });

      throw error;
    }
  },
  [HANDLE_ERROR_CODE]({ dispatch }, payload) {
    /**
     * You can define general error prompt behaviour by setting `openErrorPrompt` as one of
     * false | true | 'default'
     *
     * If value is `false`, the error prompt is not showed. This is the default;
     * If value is `true`, the error prompt is showed with message and title defined in `ErrorCode` enum
     * for any regconized `error_code`. If cannot find in `ErrorCode` enum, follow `default`.
     * If value is `default`, the error prompt will show for all errors with message beings
     * `defaultErrorPromptMessage` and title beings `defaultErrorPromptTitle`.
     *
     * Define `openErrorPromptForErrorCodes` to specify error prompt behavior for specific `error_code`.
     * It is expected to be an object of signature
     * {
     *    [error_code]: false | true | string | 'default'
     * }
     */
    const {
      error,
      openErrorPrompt = false,
      defaultErrorPromptMessage = {
        messageId: 'message.common.unknow_error',
      },
      defaultErrorPromptTitle = {
        messageId: 'message.common.error_title',
      },
    } = payload;

    let { openErrorPromptForErrorCodes } = payload;
    openErrorPromptForErrorCodes = {
      [ErrorCode.UnAuthorizedAccess]: true,
      ...openErrorPromptForErrorCodes,
    };

    if (openErrorPrompt || openErrorPromptForErrorCodes) {
      let shouldOpen = !!openErrorPrompt;
      let errorPromptBehaviour = openErrorPrompt;

      let message = defaultErrorPromptMessage;
      let title = defaultErrorPromptTitle;
      let redirectUrl = null;

      if (error.response.data && error.response.data.error_code) {
        const errorCode = error.response.data.error_code;
        errorPromptBehaviour =
          openErrorPromptForErrorCodes &&
          openErrorPromptForErrorCodes[errorCode];

        if (errorPromptBehaviour === undefined) {
          errorPromptBehaviour = openErrorPrompt;
        }

        switch (errorPromptBehaviour) {
          case true: {
            if (ErrorCode.properties[errorCode]) {
              if (ErrorCode.properties[errorCode].messageId) {
                message = {
                  messageId: ErrorCode.properties[errorCode].messageId,
                };
              }

              if (ErrorCode.properties[errorCode].titleId) {
                title = {
                  messageId: ErrorCode.properties[errorCode].titleId,
                };
              }

              if (ErrorCode.properties[errorCode].redirectUrl) {
                redirectUrl = ErrorCode.properties[errorCode].redirectUrl;
              }
            }
            shouldOpen = true;
            break;
          }
          case false: {
            shouldOpen = false;
            break;
          }
          default: {
            if (
              typeof errorPromptBehaviour === 'string' &&
              errorPromptBehaviour != 'default'
            ) {
              title = {
                messageId: errorPromptBehaviour,
              };
              shouldOpen = true;
            } else {
              shouldOpen = !!openErrorPrompt;
            }
            break;
          }
        }
      }

      if (shouldOpen) {
        dispatch(OPEN_ERROR_PROMPT, {
          message,
          title,
          redirectUrl,
        });
      }
    }
  },
};

export default {
  actions,
};
