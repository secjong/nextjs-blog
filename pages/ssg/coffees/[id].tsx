import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  InferGetStaticPropsType,
} from "next";

// next built-in components
import Head from "next/head";
import Image from "next/image";

// custom components
import Layout from "@/components/layout";

// utilities
import { getCoffee, getCoffees } from "@/lib/coffee";
import util from "@/util/util";

// types
import { Coffee } from "@/types/coffee";

// styles
import utilStyles from "@/styles/utils.module.css";

const Coffee = ({ item }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // item.image 가 이미지 url 형식이 아닐시 처리
  if (!util.isUrl(item.image)) {
    item.image =
      "https://openimage.interpark.com/tour-mobile/common/common/transparent.png";
  }

  return (
    <Layout basePath="/ssg/coffees">
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

export const getStaticProps: GetStaticProps<{ item: Coffee }> = async ({ params }) => {
  const id: number = Number(params?.id);
  const coffee = await getCoffee(id);

  return {
    props: {
      item: coffee,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const coffees = await getCoffees();
  const coffeesParams = coffees.map((coffee: Coffee) => {
    return {
      params: {
        id: coffee.id.toString(),
      },
    }; // params key로 꼭 감싸줘야 한다.
  });

  return {
    paths: coffeesParams,
    fallback: false, // 없는경우 대체페이지 보여주지 않음(404페이지 노출). blocking 이면 페이지가 없는 경우 요청이 올때 다시 렌더링 시도해본다.
  };
};

export default Coffee;
