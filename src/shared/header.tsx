import {NextButton, PreviousButton} from "./navigator.tsx";
import type {PropsWithChildren} from "react";

export function Header({ children }: PropsWithChildren) {
    return <div className={'col-span-2 flex justify-between'}>
        <PreviousButton />

        <h3 className={'font-bold'}>{children}</h3>

        <NextButton />
    </div>
}