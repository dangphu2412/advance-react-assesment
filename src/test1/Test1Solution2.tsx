import { useState, memo } from "react";
import { Header } from "../shared/header";

const InputField = memo(({ value, onChange }: any) => {
  return (
    <div>
      <input
        className="border border-solid"
        id={value}
        name={value}
        type={value}
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

export default function Test1Solution2() {
  const [form, setForm] = useState({ username: "", password: "" });

  return (
    <form
      className={
        "w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-12"
      }
    >
      <Header>This is test1 - solution 2</Header>

      <label htmlFor={"username"}>Username</label>
      <InputField
        value={form.username}
        onChange={(e: any) => setForm({ ...form, username: e.target.value })}
      />

      <label htmlFor={"password"}>Password</label>
      <InputField
        value={form.password}
        onChange={(e: any) => setForm({ ...form, password: e.target.value })}
      />

      <button className={"border rounded col-span-2 cursor-pointer p-2"}>
        Login
      </button>
    </form>
  );
}
