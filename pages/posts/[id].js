// next built-in components
import Head from "next/head";

// custom components
import Layout from "../../components/layout";
import Date from "../../components/date";

// lib utilities
import { getAllPostIds, getPostData } from "../../lib/posts";

// styles
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData: postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths: paths,
    fallback: false, // 없는경우 대체페이지 보여주지 않음(404페이지 노출)
  };
}
