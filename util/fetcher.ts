const fetcher = (resource, init) =>
  fetch(resource, init).then((res) => res.json());
export default fetcher;
