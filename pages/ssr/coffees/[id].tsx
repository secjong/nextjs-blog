import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

// next built-in components
import Head from "next/head";
import Image from "next/image";

// custom components
import Layout from "@/components/layout";

// utilities
import { getCoffee } from "@/lib/coffee";
import util from "@/util/util";

// styles
import utilStyles from "@/styles/utils.module.css";

const Coffee = ({ item }) => {
  // item.image 가 이미지 url 형식이 아닐시 처리
  if (!util.isUrl(item.image)) {
    item.image =
      "https://openimage.interpark.com/tour-mobile/common/common/transparent.png";
  }

  return (
    <Layout basePath="/ssr/coffees">
      <Head>
        <title>{item.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{item.title}</h1>
        <div className={utilStyles.lightText}>
          <Image
            priority
            src={item.image}
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt={item.title}
          />
        </div>
        <div className={utilStyles.lightText}>
          <h2>Ingredients</h2>
          <ul>
            {item.ingredients.map((ingredientItem, ingredientIndex) => (
              <li key={ingredientIndex}>{ingredientItem}</li>
            ))}
          </ul>
        </div>
        <div>{item.description}</div>
      </article>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id;
  const coffee = await getCoffee(id);

  return {
    props: {
      item: coffee,
    },
    // notFound: true,
    // redirect: {
    //   destination: "/",
    // permanent: false, // true면 308으로, 검색엔진에서 영원히 주소가 바뀐것으로 캐싱하게 되고, false이면 307으로, 잠시 바뀐 것으로 인식하여 검색엔진에 캐시되지 않는다.
    // statusCode: 308, // 리다이렉트 시 직접 status code 입력하는방법
    // },
  };
};

export default Coffee;
