import { useState } from "react";
import { submit } from "./test1-api";

export default function Test2Solution1() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({ username, password });
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-12"
    >
      <label htmlFor="username">Username</label>
      <input
        className="border border-solid"
        id="username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        className="border border-solid"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="border rounded col-span-2 cursor-pointer p-2"
        type="submit"
      >
        Login
      </button>
    </form>
    <p>Giải thích: dùng e.preventDefault() để chặn behavior mặc định của form </p>
    </>
  );
}
