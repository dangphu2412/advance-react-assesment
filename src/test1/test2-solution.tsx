import { useRef } from "react";
import { submit } from './test1-api'
function UsernameInput({ inputRef }: { inputRef: React.RefObject<HTMLInputElement | null> }) {
    console.log("Render UsernameInput");
    return (
        <>
            <label htmlFor="username">Username</label>
            <input
                className="border border-solid"
                id="username"
                name="username"
                placeholder="Type username"
                ref={inputRef}
            />
        </>
    );
}

function PasswordInput({ inputRef }: { inputRef: React.RefObject<HTMLInputElement | null> }) {
    console.log("Render PasswordInput");
    return (
        <>
            <label htmlFor="password">Password</label>
            <input
                className="border border-solid"
                id="password"
                name="password"
                type="password"
                ref={inputRef}
            />
        </>
    );
}

export function FormLogin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submit({
            username: usernameRef.current?.value || '',
            password: passwordRef.current?.value || ''
        });
        alert('Submitted!');
    };

    return (
        <form className="w-[600px] border border-gray-300 p-4 mx-auto mt-12" onSubmit={handleSubmit}>
            <h2 className="text-center text-xl mb-4">Solution - Prevent Default Behavior</h2>
            <div className="grid grid-cols-2 gap-4">
                <UsernameInput inputRef={usernameRef} />
                <PasswordInput inputRef={passwordRef} />
                <button className="border rounded col-span-2 cursor-pointer p-2">Login</button>
            </div>
        </form>
    );
}