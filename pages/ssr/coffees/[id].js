// next built-in components
import Head from "next/head";
import Image from "next/image";

// custom components
import Layout from "@/components/layout";

// lib utilities
import { getCoffee } from "@/lib/coffee";

// styles
import utilStyles from "@/styles/utils.module.css";

export default function Coffee({ item }) {
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
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const coffee = await getCoffee(id);

  return {
    props: {
      item: coffee,
    },
  };
}
