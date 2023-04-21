export const paginationHandler = (query: any) => {
  let page = query.page && +query.page > 0 ? +query.page : 1;
  let limit =
    query.count && +query.count > 1 && query.count < 200 ? +query.count : 50;

  const skip = (page - 1) * limit;

  return { limit, skip, page };
};
