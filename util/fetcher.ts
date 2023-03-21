const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());
export default fetcher;
