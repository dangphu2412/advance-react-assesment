import {useState} from "react";

export default function Test1() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <form className={'w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4'}>
        <h3 className={'font-bold col-span-2'}>This is test1</h3>
        <label htmlFor={'username'}>
            Username
        </label>
        <input className={'border border-solid'} id={'username'} name={'username'} placeholder={'Type username'} value={username} onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor={'password'}>
            Password
        </label>
        <input className={'border border-solid'} id={'password'} name={'password'} type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />

        <q className={'col-span-2'}>
            Test 1 - bài 1: mỗi lần thay đổi value của username hoặc password đều làm component này re-render.
            Vậy bạn có những cách nào để mỗi thành phần của form thay đổi 1 cách độc lập và không làm ảnh hưởng đến việc render của nhau?
        </q>

        <q className={'col-span-2'}>
            Cách thức làm bài: mỗi giải pháp tạo ra 1 component trong thư mục test1/test1-solution-[số thứ tự].tsx.
            Commit và tạo Pull request vào nhánh main dưới format: assessment/[your-name]
        </q>
    </form>
}
