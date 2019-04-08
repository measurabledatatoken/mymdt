function convertToPath(url, paramsObj = {}) {
  Object.keys(paramsObj).map(param => {
    const urlParam = `:${param}`;
    if (url.includes(urlParam)) {
      url = url.replace(urlParam, paramsObj[param]);
    }
  });
  return url;
}

export { convertToPath };
