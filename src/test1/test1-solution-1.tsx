import { useState, memo } from "react";

const UsernameInput = memo(function UsernameInput({ value, onChange }: { value: string, onChange: (v: string) => void }) {
    console.log("Render UsernameInput");
    return (
        <>
            <label htmlFor="username">Username</label>
            <input
                className="border border-solid"
                id="username"
                name="username"
                placeholder="Type username"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </>
    );
});

const PasswordInput = memo(function PasswordInput({ value, onChange }: { value: string, onChange: (v: string) => void }) {
    console.log("Render PasswordInput");
    return (
        <>
            <label htmlFor="password">Password</label>
            <input
                className="border border-solid"
                id="password"
                name="password"
                type="password"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </>
    );
});

export function FormLogin1() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Username: ${username}, Password: ${password}`);
    }
    return (
        <form className="w-[600px] border border-gray-300 p-4 mx-auto mt-12" onSubmit={handleSubmit}>
            <h2 className="text-center text-xl mb-4">Solution 1 - Wrap Inputs with React.memo</h2>
            <div className="grid grid-cols-2 gap-4">
                <UsernameInput value={username} onChange={setUsername} />
                <PasswordInput value={password} onChange={setPassword} />
                <button className="border rounded col-span-2 cursor-pointer p-2">Login</button>
            </div>
        </form>
    );
}