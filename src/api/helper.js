
function handleGeneralResponse(promise, emptyDataMsg) {
  return promise
    .then((response) => {
      const requiredData = !!emptyDataMsg;
      const data = response.data && response.data.data;

      if (requiredData && !data) {
        throw new Error(emptyDataMsg);
      }

      return data;
    });
}


export default handleGeneralResponse;

