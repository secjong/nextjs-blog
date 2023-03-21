import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextApiRequest,
  NextApiResponse,
} from "next";

import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "@/components/layout";

import { getCoffees } from "@/lib/coffee";

import { Coffee } from "@/types/coffee";

import utilStyles from "@/styles/utils.module.css";

type Data = {
  coffees: [];
};

const Coffees = ({
  coffees,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
              <Link href={`/ssr/coffees/${coffeeItem.id}`}>
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

// export const config = {
//   runtime: 'edge', // nodejs
// };

export const getServerSideProps: GetServerSideProps<{ coffees: Array<Coffee> }> = async (
  context
) => {
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59"
  // );

  const coffees = await getCoffees();
  console.log(coffees);
  return {
    props: {
      coffees: coffees,
    },
    // notFound: true,
    // redirect: {
    //   destination: "/",
    // permanent: false, // true면 308으로, 검색엔진에서 영원히 주소가 바뀐것으로 캐싱하게 되고, false이면 307으로, 잠시 바뀐 것으로 인식하여 검색엔진에 캐시되지 않는다.
    // statusCode: 308, // 리다이렉트 시 직접 status code 입력하는방법
    // },
  };
};

export default Coffees;
