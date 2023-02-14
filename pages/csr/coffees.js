import Head from "next/head";
import Link from "next/link";

import { useState, useEffect } from "react";

import Layout, { siteTitle } from "@/components/layout";

import { getCoffees, useCoffees } from "@/lib/coffee";

import utilStyles from "@/styles/utils.module.css";

export default function Coffees(props) {
  const { coffees, error, isLoading } = useCoffees();

  //   const [coffees, setCoffees] = useState(null);
  //   const [isLoading, setIsLoading] = useState(false);

  //   useEffect(async () => {
  //     setIsLoading(true);
  //     const coffees = await getCoffees();
  //     setCoffees(coffees);
  //     setIsLoading(false);
  //   }, []);

  if (error) {
    return <p>faild to load</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!coffees) {
    return <p>No Coffees</p>;
  }

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
              <Link href={`/csr/coffees/${coffeeItem.id}`}>
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
