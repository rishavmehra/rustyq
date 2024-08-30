import {FC} from 'react';
import {notify} from "../utils/notifications";
import {useProgramConfiguration} from "../contexts/ProgramConfigurationProvider";
import {Card} from "./Card";

export interface Props {
    quiz,
    answerSuccess
}

export const AnswerQuiz: FC<Props> = ({ quiz, answerSuccess }) => {
    const { program } = useProgramConfiguration();

    const answerQuiz = async (response: string) => {
        try {
            const txId = await program.methods
                .answer(response).accounts({
                    quiz: quiz.pubKey
                }).rpc()
            answerSuccess()
            notify({
                type: 'Success',
                message: `Answer quiz`,
                description: "Congratulation!!",
                txid: txId
            });

        } catch (error: any) {
            if(error?.message.includes("IncorrectAnswer")) {
                notify({
                    type: 'error',
                    message: `Answer incorrect!`,
                    description: "The provided answer is incorrect"
                });
                return;
            }

            if(error?.message.includes("AddressNotValid")) {
                notify({
                    type: 'error',
                    message: `Address Invalid!`,
                    description: "Address that created the quiz cannot answer it"
                });
                return;
            }
            notify({
                type: 'error',
                message: `Sign Message failed!`,
                description: error?.message
            });
        }
    };

    return (
        <Card quiz={quiz} answerQuiz={answerQuiz}></Card>
    )
}
