import {PublicKey} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import crypto from "crypto";

export const QUESTION_LENGTH = 300;
export const ANSWER_LENGTH = 50;
export const ID_LENGTH = 32;

export const QUIZ_SEED= "QUIZ_SEED";
export const STATISTIC_SEED = "STATISTIC_SEED";

export function stringToUtf8ByteArray(inputString: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(inputString);
}

export function utf8ByteArrayToString(input: Uint8Array): string {
    const encoder = new TextDecoder();
    return encoder.decode(input);
}

export function trimTrailingZeros(bytes: Uint8Array): string {
    let i = bytes.length - 1;
    while (i >= 0 && bytes[i] === 0) {
        i--; 
    }
    return utf8ByteArrayToString(new Uint8Array(bytes.slice(0, i + 1)));
}


export function getContentSeed(question: string): Uint8Array {
    let hexString = crypto.createHash('sha256').update(question, 'utf-8').digest('hex');
    return Uint8Array.from(Buffer.from(hexString, 'hex'));
}

export function getQuizAddress(question: string, author: PublicKey, programID: PublicKey) {
    const content_seed = getContentSeed(question);
    return PublicKey.findProgramAddressSync(
        [
            content_seed,
            anchor.utils.bytes.utf8.encode(QUIZ_SEED),
            author.toBuffer()
        ], programID);
}
