import { useRouter } from "next/router";

const Comment = () => {
  const router = useRouter();
  const { pid, comment } = router.query;

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
      <p>Comment: {comment}</p>
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

export default Comment;
