import {FC, useCallback, useEffect} from 'react';
import {notify} from "../utils/notifications";
import {useProgramConfiguration} from "../contexts/ProgramConfigurationProvider";
import {getQuizAddress} from "../utils/helpers";
import {useWallet} from "@solana/wallet-adapter-react";
import {getQuestions, QuestionTypes, Session, Question} from "open-trivia-db";

export interface Props {
    createSuccess
}

export const CreateQuiz: FC<Props> = ({ createSuccess }) => {
    const ourWallet = useWallet();
    const { program, getAnchorProvider } = useProgramConfiguration();

    useEffect(() => {
        // Ensure that the same question is not generated twice during the same session
        const startSession = async () => {
            try {
                const mySession = new Session();
                await mySession.start()
            }catch (error) {
                notify({
                    type: 'error',
                    message: `Session error!`,
                    description: `Couldn't start a session for service questions`
                });
            }
        }
        startSession();
        console.log("Start new session...")
    }, [])

    const createQuiz = useCallback(async () => {
        try {
            const question: Question =( await getQuestions({
                amount: 1,
                type: QuestionTypes.Multiple,
            }))[0]

            const [quiz_pkey] = getQuizAddress(question.value, getAnchorProvider().publicKey, program.programId);
            const txId = await program.methods
                .initialize(question.value, question.correctAnswer, question.allAnswers[0], question.allAnswers[1], question.allAnswers[2], question.allAnswers[3]).accounts({
                    quizAuthority: getAnchorProvider().publicKey,
                    quiz: quiz_pkey
                }).rpc({ commitment: "confirmed" })

            createSuccess();
            notify({
                type: 'Success',
                message: `Create quiz`,
                description: "Quiz was successfully created!!",
                txid: txId
            });
        } catch (error: any) {
            notify({
                type: 'error',
                message: `Sign Message failed!`,
                description: error?.message
            });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }, [program]);

    return (
        <button
    className="group m-2 btn-wide btn animate-pulse bg-gradient-to-br from-gray-600 to-gray-800 hover:bg-gray-900 text-white"
    onClick={createQuiz}
    disabled={!ourWallet.publicKey}
>
    <div className="hidden group-disabled:block text-gray-400">
        Wallet not connected
    </div>
    <span className="block group-disabled:hidden">
        Generate Quiz
    </span>
</button>

    )
}
