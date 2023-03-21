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
import { getCoffees } from "@/lib/coffee";
import { useCoffee } from "@/lib/apiHook";
import util from "@/util/util";

// types
import { Coffee } from "@/types/coffee";

// styles
import utilStyles from "@/styles/utils.module.css";

const Coffee = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, error, isLoading } = useCoffee(id);
  const item = data;

  if (error) {
    return <p>faild to load</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>No Coffee</p>;
  }

  // item.image 가 이미지 url 형식이 아닐시 처리
  if (!util.isUrl(item.image)) {
    item.image =
      "https://openimage.interpark.com/tour-mobile/common/common/transparent.png";
  }

  return (
    <Layout basePath="/csr/coffees">
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
            {item.ingredients.map(
              (ingredientItem: string, ingredientIndex: number) => (
                <li key={ingredientIndex}>{ingredientItem}</li>
              )
            )}
          </ul>
        </div>
        <div>{item.description}</div>
      </article>
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   const id = context.params.id;

//   return {
//     props: {
//       id: id,
//     },
//   };
// }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  return {
    props: {
      id: id,
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
    fallback: false, // 없는경우 대체페이지 보여주지 않음(404페이지 노출)
  };
};

export default Coffee;
