import { useRef, useState } from "react";
import { Header } from "../shared/header";
import { submit } from "./test1-api";

export default function Test2Solution() {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = nameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    setLoading(true);
    try {
      const response = await submit({ username, password });
      setResult(response);
    } finally {
      setLoading(false);
    }
  };
  console.log(result, "result");
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-12"
    >
      <Header>This is test2 - solution</Header>

      <label htmlFor="username">Username</label>
      <input
        className="border border-solid"
        id="username"
        name="username"
        placeholder="Type username"
        ref={nameRef}
      />

      <label htmlFor="password">Password</label>
      <input
        className="border border-solid"
        id="password"
        name="password"
        type="password"
        ref={passwordRef}
      />

      <button
        type="submit"
        className="border rounded col-span-2 cursor-pointer p-2"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
      {result && <div className="">Logged user: {result.username}</div>}

      <p>
        Hành vi mặc định của trình duyệt là sẽ gửi request HTTP GET hoặc POST
        đến action của form, nếu không có action thì gửi đến URL hiện tại. Do đó
        trang sẽ reload lại, và trên URL có thể xuất hiện query string.
        e.preventDefault(), giúp ngăn hành vi mặc định của form
      </p>
    </form>
  );
}
