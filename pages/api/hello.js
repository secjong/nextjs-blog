export default async function handler(req, res) {
  // 여기서 백엔드 api를 직접 쏜다?
  const response = await fetch("https://api.sampleapis.com/beers/ale");
  const data = await response.json();
  res.status(200).json(data);
  // .then((data) => {
  //   res.status(200).json(data);
  // })
  // .catch((e) => {
  //   res.status(500).json(e);
  // });
}
