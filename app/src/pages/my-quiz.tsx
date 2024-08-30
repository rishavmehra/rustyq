import type { NextPage } from "next";
import Head from "next/head";
import {MyQuizView} from "../views";

const MyQuiz: NextPage = (props) => {
    return (
        <div>
            <Head>
                <title>RustyQ</title>
                <meta
                    name="description"
                    content="RustyQ"
                />
            </Head>
            <MyQuizView />
        </div>
    );
};

export default MyQuiz;
