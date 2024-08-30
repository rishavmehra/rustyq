import {FC} from 'react';
import {notify} from "../utils/notifications";
import {useProgramConfiguration} from "../contexts/ProgramConfigurationProvider";
import {useWallet} from "@solana/wallet-adapter-react";

export interface Props {
    quiz
    deleteSuccess
}

export const DeleteQuiz: FC<Props> = ({ quiz, deleteSuccess }) => {
    const { program } = useProgramConfiguration();
    const ourWallet = useWallet();

    const remove = async () => {
        try {
            const txId = await program.methods
                .delete(quiz.question).accounts({
                    quiz: quiz.pubKey
                }).rpc()

            deleteSuccess(quiz)
            notify({
                type: 'Success',
                message: `Delete quiz`,
                description: "The quiz was successfully deleted",
                txid: txId
            });

        } catch (error) {
            if(error?.message.includes("AddressNotValid")) {
                notify({type: 'error', message: `Address Invalid!`, description: "Address that created the quiz cannot answer it"});
                return;
            }

            if(error?.message.includes("A seeds constraint was violated")) {
                notify({type: 'error', message: `Invalid Operation!`, description: "Only the owner of a quiz can delete it"});
                return;
            }
            notify({type: 'error', message: `Sign Message failed!`, description: error?.message});
            console.log("Something went wrong", error?.message)
        }
    };

    return (
        <div>
            {
                quiz.author?.toBase58() === ourWallet.publicKey?.toBase58() ? <button className="btn btn-md btn-outline btn-error btn-wide" onClick={() => remove()}>Delete Quiz</button> : <></>
            }
        </div>
    )
}
