import { GetStaticProps, GetStaticPaths, GetServerSideProps, InferGetServerSidePropsType } from "next";

import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "@/components/layout";

import { getCoffees } from "@/lib/coffee";

import { Coffee } from "@/types/coffee";

import utilStyles from "@/styles/utils.module.css";

const Coffees = ({ 
  coffees,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
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
};

export const getStaticProps: GetStaticProps<{ coffees: Coffee[] }> = async (context) => {
  const coffees = await getCoffees();
  return {
    props: {
      coffees: coffees,
      // ISR 사용법. 빌드타임에 1회, 이전 요청 대비 10초가 경과하고 요청이 오면 또 serverless function 으로 호출된다.
      // revalidate: 10, // In seconds
    },
  };
};

export default Coffees;
