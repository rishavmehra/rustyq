import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {createContext, FC, ReactNode, useContext } from 'react';
import {PublicKey} from "@solana/web3.js";
import {Quiz} from "../models/quiz";
import idl from "../components/quiz.json";
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';

const idl_string = JSON.stringify(idl);
const idl_object = JSON.parse(idl_string);
const programID = new PublicKey(idl.metadata.address)

export interface ProgramConfigurationState {
    getAnchorProvider: () => AnchorProvider;
    program: Program<Quiz>;
}

export const ProgramConfigurationContext = createContext<ProgramConfigurationState>({} as ProgramConfigurationState);

export function useProgramConfiguration(): ProgramConfigurationState {
    return useContext(ProgramConfigurationContext);
}

export const ProgramConfigurationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const ourWallet = useWallet();
    const {connection} = useConnection();

    const getProvider = () : AnchorProvider => {
        const provider = new AnchorProvider(connection, ourWallet, AnchorProvider.defaultOptions());
        setProvider(provider);
        return provider;
    }

    const program = new Program<Quiz>(idl_object, programID, getProvider());

    return (
        <ProgramConfigurationContext.Provider value={{ program, getAnchorProvider: () => getProvider() }}>{children}</ProgramConfigurationContext.Provider>
    );
};
