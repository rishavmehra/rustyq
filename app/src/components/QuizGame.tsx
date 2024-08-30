import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {FC, useCallback, useEffect, useState} from 'react';

import {IQuiz} from "../models";
import {useProgramConfiguration} from "../contexts/ProgramConfigurationProvider";
import {DeleteQuiz} from "./Delete";
import {AnswerQuiz} from "./Answer";
import {CreateQuiz} from "./Create";
import {NoQuiz} from "./NoQuiz";

export const QuizGame: FC = () => {
    const ourWallet = useWallet();
    const {connection} = useConnection();
    const [quizzes, setQuizzes] = useState<IQuiz[]>([])
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [loading, setLoading] = useState(true);
    const {program} = useProgramConfiguration();

    const fetchQuiz = useCallback(async () => {
        await Promise.all((await connection.getParsedProgramAccounts(program.programId)).map(async (quiz) => ({
            ...(await program.account.quiz.fetch(quiz.pubkey)),
            pubKey: quiz.pubkey
        }))).then((responses) => {
            const quizList = responses.filter(q => !q.isAnswered).map((r, index) => {
                return {
                    index,
                    author: r.quizAuthor,
                    pubKey: r.pubKey,
                    question: r.question,
                    isAnswered: r.isAnswered,
                    answer1: r.a1,
                    answer2: r.a2,
                    answer3: r.a3,
                    answer4: r.a4,
                }
            })
            setQuizzes([...quizList]);
            setLoading(false)
        });
    }, [program])

    useEffect(() => {
        fetchQuiz()
        console.log("fetch quizzes...")
    }, []);

    useEffect(() => {
        const min = 0; // Lower bound
        const max = quizzes.length - 1; // Upper bound

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        setActiveQuestion(randomNumber);
        console.log("Random question index", randomNumber);
    }, [quizzes]);

    const updateActiveQuestion = () => {
        setQuizzes((prev) => {
            prev.splice(activeQuestion, 1);
            return [...prev];
        })
    }

    return (
        <div>
            {
                quizzes.length > 0 && ourWallet.publicKey
                && <>
                    <p>Total quiz: {quizzes.length}</p>

                    <AnswerQuiz quiz={quizzes[activeQuestion]} answerSuccess={updateActiveQuestion}/>
                    <DeleteQuiz quiz={quizzes[activeQuestion]} deleteSuccess={updateActiveQuestion}/>
                </>
            }

            {!loading && quizzes.length === 0 && ourWallet.publicKey && <NoQuiz />}

            <div className="flex flex-row justify-center">
                <div className="relative group items-center">
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-gray-500 to-gray-700
                rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                    <CreateQuiz createSuccess={fetchQuiz}></CreateQuiz>
                </div>
            </div>
        </div>
    );
};
