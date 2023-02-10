import { useRouter } from "next/router";

const Params = () => {
  const router = useRouter();
  const { pid, comment, params } = router.query;

  console.log(router.query);

  const arr = Object.entries(router.query).map((item, index, thisArr) => {
    const k = item[0];
    const v = item[1];
    return {
      key: k,
      value: v,
    };
  });

  return (
    <div>
      <p>Params: {params}</p>
      <ul>
        {arr.map((item) => (
          <li key={item.key}>
            {item.key} : {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Params;
