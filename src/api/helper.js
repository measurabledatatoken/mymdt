
function handleGeneralResponse(promise, emptyDataMsg) {
  return promise
    .then((response) => {
      if (response.data && response.data.data) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(Error(emptyDataMsg));
    })
    .catch(error => Promise.reject(error));
}


export default handleGeneralResponse;

