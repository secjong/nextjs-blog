import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

// next built-in components
import Head from "next/head";
import Image from "next/image";

// custom components
import Layout from "@/components/layout";

// lib utilities
import { getCoffee, getCoffees } from "@/lib/coffee";

// styles
import utilStyles from "@/styles/utils.module.css";

const Coffee = ({ item }) => {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id;
  const coffee = await getCoffee(id);

  return {
    props: {
      item: coffee,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const coffees = await getCoffees();
  const coffeesParams = coffees.map((coffee) => {
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
