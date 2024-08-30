import {useWallet} from "@solana/wallet-adapter-react";

export function Card({quiz, answerQuiz}) {
    const {question, answer1, answer2, answer3, answer4, author, isAnswered} = quiz;
    const ourWallet = useWallet();

    return (
        <div className="card w-98 bg-primary text-primary-content">
            <div className="card-body">
                <h2 className="card-title">{question}
                    {
                        author.toString() === ourWallet.publicKey?.toString() &&
                        <div className="badge badge-primary ml-2 bg-success">Owner</div>
                    }
                    {
                        isAnswered && <div className="badge badge-primary ml-2 bg-warning">Answered</div>
                    }
                </h2>
                <button
                    className="group mb-2 btn bg-gradient-to-br from-indigo-500 to-fuchsia-400 hover:from-white hover:to-gray-300 text-black"
                    onClick={() => answerQuiz(answer1)}>{answer1}</button>
                <button
                    onClick={() => answerQuiz(answer2)}
                    className="group mb-2 btn bg-gradient-to-br from-indigo-400 to-fuchsia-500 hover:from-white hover:to-gray-300 text-black">{answer2}</button>
                <button
                    onClick={() => answerQuiz(answer3)}
                    className="group mb-2 btn bg-gradient-to-br from-indigo-500 to-fuchsia-400 hover:from-white hover:to-gray-300 text-black">{answer3}</button>
                <button
                    onClick={() => answerQuiz(answer4)}
                    className="group mb-2 btn bg-gradient-to-br from-indigo-400 to-fuchsia-500 hover:from-white hover:to-gray-300 text-black">{answer4}</button>
            </div>
        </div>
    )
}
