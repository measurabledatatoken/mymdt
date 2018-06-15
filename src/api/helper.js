import { normalize } from 'normalizr';

function handleGeneralResponse(promise, options) {
  let emptyDataMsg = null;
  if (options) {
    if (typeof options === 'string') {
      emptyDataMsg = options;
      // eslint-disable-next-line
      options = {};
    } else {
      emptyDataMsg = options.emptyDataMsg;
    }
  }

  // eslint-disable-next-line
  options = {
    schema: null,
    ...options,
  };

  return promise
    .then((response) => {
      const requiredData = !!emptyDataMsg;
      let data = response.data && response.data.data;

      if (requiredData && !data && !options.allowEmptyData) {
        throw new Error(emptyDataMsg);
      }

      if (options.schema) {
        data = normalize(data, options.schema);
      }

      return data;
    });
}


export default handleGeneralResponse;

