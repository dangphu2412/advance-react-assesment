import {useState} from "react";
import {Header} from "../shared/header.tsx";

export default function Test1() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // do not thing
    }

    return <form className={'w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-12'} onSubmit={handleSubmit}>
        <Header>
            This is test1
        </Header>

        <label htmlFor={'username'}>
            Username
        </label>
        <input className={'border border-solid'} id={'username'} name={'username'} placeholder={'Type username'} value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor={'password'}>
            Password
        </label>
        <input className={'border border-solid'} id={'password'} name={'password'} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className={'border rounded col-span-2 cursor-pointer p-2'}>
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

            React Form tự động chạy action của form khi nhấn vào một button - gửi một request đến server.
            Khi ta truyền vào sự kiện onClick của button một function, function đó sẽ được gọi khi button được click.
            Trong function đó, ta có thể ngăn chặn hành vi mặc định của form bằng cách gọi e.preventDefault().
        </q>
    </form>
}
