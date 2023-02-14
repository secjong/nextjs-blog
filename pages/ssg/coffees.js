import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "@/components/layout";

import { getCoffees } from "@/lib/coffee";

import utilStyles from "@/styles/utils.module.css";

export default function Coffees({ coffees }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Your Self Introduction</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLd}>Blog</h2>
        <ul className={utilStyles.list}>
          {coffees.map((coffeeItem, coffeeIndex) => (
            <li className={utilStyles.listItem} key={coffeeItem.id}>
              <Link href={`/ssg/coffees/${coffeeItem.id}`}>
                {coffeeItem.title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {coffeeItem.description}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
    const coffees = await getCoffees();
    return {
      props: {
        coffees: coffees,
      },
    };
}

