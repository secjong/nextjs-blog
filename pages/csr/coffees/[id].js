// next built-in components
import Head from "next/head";
import Image from "next/image";

// custom components
import Layout from "@/components/layout";

// lib utilities
import { getCoffees, useCoffee } from "@/lib/coffee";

// styles
import utilStyles from "@/styles/utils.module.css";

export default function Coffee(props) {
  const id = props.id;
  const { coffee, error, isLoading } = useCoffee(id);
  const item = coffee;

  if (error) {
    return <p>faild to load</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>No Coffee</p>;
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
            {item.ingredients.map((ingredientItem, ingredientIndex) => (
              <li key={ingredientIndex}>{ingredientItem}</li>
            ))}
          </ul>
        </div>
        <div>{item.description}</div>
      </article>
    </Layout>
  );
}

// export async function getServerSideProps(context) {
//   const id = context.params.id;

//   return {
//     props: {
//       id: id,
//     },
//   };
// }

export async function getStaticProps({ params }) {
  const id = params.id;

  return {
    props: {
      id: id,
    },
  };
}

export async function getStaticPaths(context) {
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
}
