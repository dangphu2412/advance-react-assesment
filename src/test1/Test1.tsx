import {useState, useSyncExternalStore} from "react";
import {Header} from "../shared/header.tsx";
import {useCreaUserFormStore} from "./store.ts";

export default function Test1() {
    const [isOpenUsername, setIsOpenUsername] = useState(true);

    return <form className={'w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-12'}>
        <Header>
            This is test1
        </Header>
        {isOpenUsername && <Username/>}
        <Password />
        <ResetButton />
        <button onClick={(e) => {
            e.preventDefault();
            setIsOpenUsername(false)
        }}>Hide username</button>

        <button className={'border rounded col-span-2 cursor-pointer p-2'} onClick={(e) => {
            e.preventDefault()
        }}>
            Login
        </button>
    </form>
}

function Username() {
    console.log('render username');
    const form = useSyncExternalStore(useCreaUserFormStore.subscribe, useCreaUserFormStore.getSnapshot);

    return  <>
        <label htmlFor={'username'}>
            Username
        </label>
        <input
            className={'border border-solid'}
            id={'username'}
            name={'username'}
            placeholder={'Type username'}
            value={form.username}
            onChange={(e) => useCreaUserFormStore.setState({
                username: e.target.value
            })}
        />
    </>
}

function Password() {
    console.log('render password')

    const form = useSyncExternalStore(useCreaUserFormStore.subscribe, useCreaUserFormStore.getSnapshot);


    return <>
        <label htmlFor={'password'}>
            Password
        </label>
        <input
            className={'border border-solid'}
            id={'password'}
            name={'password'}
            placeholder={'Type password'}
            value={form.password}
            onChange={(e) => useCreaUserFormStore.setState({
                password: e.target.value
            })}
        />
    </>
}

function ResetButton() {
    // const reset = useCreaUserFormStore((state) => state.reset);
    console.log('re-render reset');

    return <button onClick={(e) => {
        e.preventDefault();
        // reset();
    }}>
        Reset
    </button>
}