import { useRef } from "react";
import { Header } from "../shared/header.tsx";
import { submit } from "./test1-api.ts";

export default function Test1() {
    const userInput = useRef<HTMLInputElement>(null);
    const passInput = useRef<HTMLInputElement>(null);

    return <form className={'w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-12'}>
        <Header>
            This is test1
        </Header>

        <label htmlFor={'username'}>
            Username
        </label>
        <input className={'border border-solid'} id={'username'} name={'username'} placeholder={'Type username'} ref={userInput} />

        <label htmlFor={'password'}>
            Password
        </label>
        <input className={'border border-solid'} id={'password'} name={'password'} type={'password'} ref={passInput} />

        <button className={'border rounded col-span-2 cursor-pointer p-2'} onClick={(e) => {
            e.preventDefault();
            const username = userInput.current?.value || '';
            const password = passInput.current?.value || '';
            submit({ username, password });
        }}>
            Login
        </button>

        <q className={'col-span-2'}>
            Test 1 - bài 1: mỗi lần thay đổi value của username hoặc password đều làm component này re-render.
            Vậy bạn có những cách nào để mỗi thành phần của form thay đổi 1 cách độc lập và không làm ảnh hưởng đến việc render của nhau?
        </q>

        <q className={'col-span-2'}>
            Cách thức làm bài: mỗi giải pháp tạo ra 1 component trong thư mục test1/test1-solution-[số thứ tự].tsx.
            Commit và tạo Pull request vào nhánh main dưới format: assessment/[your-name]
        </q>

        <hr className={'col-span-2'} />

        <q className={'col-span-2'}>
            Test 1 - bài 2: hiện tại khi bấm nút login thì trang có bị reload lại và trên URL xuất hiện search params như: http://localhost:5173/test1?username=&password=.
            Vậy bây giờ mình muốn chặn hành vi này để dùng dữ liệu và gửi thông qua API thì phải làm sao?
            Có 1 hàm giả lập việc gọi API submit ở src/test1/test1-api.ts, hãy tích hợp với nó nào?
        </q>

        <q className={'col-span-2'}>
            Cách thức làm bài: tạo ra 1 component trong thư mục test1/test2-solution.tsx.
        </q>

        <q className={'col-span-2'}>
            Hãy giải thích về nguyên lý vì sao bạn chặn được hành vy load lại trang, dựa trên nguyên lý gì?
            {/*Hãy comment ở đây*/}
        </q>
    </form>
}
