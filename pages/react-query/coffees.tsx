import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { dehydrate, QueryClient, useQuery, useQueryClient, DehydratedState, UseQueryResult, Query } from "@tanstack/react-query";

import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "@/components/layout";

import { getCoffees } from "@/lib/coffee";

import { Coffee } from "@/types/coffee";

import utilStyles from "@/styles/utils.module.css";

const Coffees = () => {

  const {data, isLoading}: UseQueryResult<Coffee[], Error> = useQuery({
    queryKey: ["coffees"], 
    queryFn: getCoffees, 
    onSettled: (data, err) => {},
    onSuccess: (data) => {},
    onError: (err) => {console.error(err);}
  });
  const coffees = data;

  if (isLoading) {
    return (<h1>하하하</h1>);
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
          {coffees?.map((coffeeItem, coffeeIndex) => (
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

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async (context) => {
  const queryClient = new QueryClient();
  // const queryClient = useQueryClient();

  queryClient.setQueryDefaults(["coffees"], {staleTime: 1000 * 5}); // coffees 키에 대해서만 staleTime 설정
  await queryClient.prefetchQuery({queryKey: ["coffees"], queryFn: getCoffees}); // prefetch 해놓기?

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
  };
};

export default Coffees;
