const DEFAULT_SORT = 'id';
const DEFAULT_LIMIT = 20;
const DEFAULT_PAGE = 1;

function getQueryOptions({ sort = DEFAULT_SORT, limit = DEFAULT_LIMIT, page = DEFAULT_PAGE }) {
  return { sort, limit, page };
}

module.exports = getQueryOptions;
