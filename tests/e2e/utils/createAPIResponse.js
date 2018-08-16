/**
 * backend api response should be always
 * {
 *   data: ...,
 *   meta: ...
 * }
 * Use this util to generate such response from entity
 *
 * @param {*} data
 * @param {*} options
 */
export default function(data, options) {
  options = Object.assign(
    {},
    {
      status: 200,
    },
    options,
  );

  const meta = {
    status: options.status,
  };

  if (options.paging) {
    meta.paging = {
      cursors: { before: 'xxx', after: 'xxx' },
    };
  }

  if (Array.isArray(data)) {
    meta.record_count = data.length;
  }

  return {
    data,
    meta,
  };
}
