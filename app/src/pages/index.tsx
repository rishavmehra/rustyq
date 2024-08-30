import type { NextPage } from "next";
import Head from "next/head";
import { QuizView } from "../views";

const Index: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>RustyQ</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <QuizView />
    </div>
  );
};

export default Index;
