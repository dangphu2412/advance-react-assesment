import { useRef } from "react";

export default function LoginForm() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  return (
    <form
      className={
        "w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-12"
      }
    >
      <label htmlFor="username">Username</label>
      <input
        className={"border border-solid"}
        id={"username"}
        name={"username"}
        placeholder="Username"
        onChange={(e) => {
          usernameRef.current = e.target.value;
          console.log(usernameRef.current);
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        placeholder="Password"
        type="password"
        className={"border border-solid"}
        id={"password"}
        name={"password"}
        onChange={(e) => {
          passwordRef.current = e.target.value;
          console.log(passwordRef.current);
        }}
      />
      <button className={"border rounded col-span-2 cursor-pointer p-2"}>
        Login
      </button>
    </form>
  );
}
