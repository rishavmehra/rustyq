import {PublicKey} from "@solana/web3.js";

export interface IQuiz {
    index: number,
    author: PublicKey;
    pubKey: PublicKey;
    isAnswered: boolean;
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
}
