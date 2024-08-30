import {FC, useCallback, useEffect, useState} from "react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {useProgramConfiguration} from "../../contexts/ProgramConfigurationProvider";
import {IQuiz} from "../../models";
import {Card} from "../../components/Card";
import {DeleteQuiz} from "../../components/Delete";
import {notify} from "../../utils/notifications";
import {NoQuiz} from "../../components/NoQuiz";

export const MyQuizView: FC = ({}) => {
    const ourWallet = useWallet();
    const {connection} = useConnection();
    const {program} = useProgramConfiguration();
    const [quizzes, setQuizzes] = useState<IQuiz[]>([])
    const [loading, setLoading] = useState(true)

    const fetchQuiz = useCallback(async () => {
        await Promise.all((await connection.getParsedProgramAccounts(program.programId)).map(async (quiz) => ({
            ...(await program.account.quiz.fetch(quiz.pubkey)),
            pubKey: quiz.pubkey
        }))).then((responses) => {
            const quizList = responses.filter(q => q.quizAuthor?.toBase58() === ourWallet.publicKey?.toBase58()).map((r, index) => {
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
            setLoading(false);
        });
    }, [program])

    const removeItem = (item) => {
        setQuizzes((prev) => {
            return prev.filter((q) => q.pubKey.toBase58() != item.pubKey.toBase58());
        })
    }

    useEffect(() => {
        fetchQuiz()
    }, [ourWallet]);

    return (
        <div className="md:hero mx-auto p-4">
            <div className="md:hero-content flex flex-col">
            <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-500 mb-4">
          RustyQ
        </h1>
                {!loading && quizzes.length === 0 && <NoQuiz />}
                <div className="grid grid-cols-3 gap-4 text-center">
                    {
                        quizzes.map((quiz) =>
                            <div key={quiz.pubKey.toBase58()}>
                                <Card quiz={quiz} answerQuiz={
                                    () => notify({
                                    type: 'warning',
                                    message: `Address Invalid!`,
                                    description: "Address that created the quiz cannot answer it"})
                                }/>

                                <DeleteQuiz quiz={quiz} deleteSuccess={removeItem}/>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};
