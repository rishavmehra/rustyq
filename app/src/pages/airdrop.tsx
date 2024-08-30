import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Airdrop: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>RustyQ</title>
        <meta
          name="description"
          content="RustyQ"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Airdrop;
