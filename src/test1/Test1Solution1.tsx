import { useRef } from "react";
import { Header } from "../shared/header";

export default function Test1Solution1() {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className={
        "w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-12"
      }
    >
      <Header>This is test1 - solution 1</Header>

      <label htmlFor={"username"}>Username</label>
      <input
        className={"border border-solid"}
        id={"username"}
        name={"username"}
        placeholder={"Type username"}
        ref={nameRef}
      />

      <label htmlFor={"password"}>Password</label>
      <input
        className={"border border-solid"}
        id={"password"}
        name={"password"}
        type={"password"}
        ref={passwordRef}
      />

      <button className={"border rounded col-span-2 cursor-pointer p-2"}>
        Login
      </button>
    </form>
  );
}
