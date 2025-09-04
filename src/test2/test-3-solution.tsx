import { useState } from "react";
import { Header } from "../shared/header.tsx";
import { createPortal } from "react-dom";

type Card = {
    id: number;
    name: string;
    description: string;
    tags: string[];
}
const data: Card[] = [
    {
        id: 1,
        name: 'Top 1',
        description: 'This is short',
        tags: ['red', 'blue', 'green', 'yellow'],
    },
    {
        id: 2,
        name: 'Delimiter',
        description: 'Represent for minus characters',
        tags: ['red', 'yellow'],
    },
    {
        id: 3,
        name: 'Facilitator',
        description: 'Is the person who contribute to the most of discussion',
        tags: ['blue', 'red'],
    }
]

export default function Test2() {
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [cards, setCards] = useState<Card[]>(data);
    const tagToColor = {
        'red': 'border-red-500',
        'blue': 'border-blue-500',
        'green': 'border-green-500',
        'yellow': 'border-yellow-500',
    }

    function handleCreate(data: { id: number; name: string; description: string; tags: string[] }) {
        setCards([...cards, { ...data }]);
    }

    function handleDelete(id: number) {
        setCards(cards.filter((card) => card.id !== id));
    }

    return <div className={'w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-4'}>
        <Header>
            This is test2
        </Header>

        {isShowPopup && createPortal(
            <Popup onClose={() => { setIsShowPopup(false); }} onCreate={handleCreate} />,
            document.body
        )}

        <div className={'col-span-2 grid grid-cols-2 gap-2'}>
            {cards.map((card) => {
                return <div className={'border border-black rounded p-4 flex flex-col gap-2'} key={card.id}>
                    <div className={'flex justify-between'}>
                        {card.name}
                        <span className={'border rounded w-8 text-center cursor-pointer'} onClick={() => handleDelete(card.id)}>
                            -
                        </span>
                    </div>

                    <div>
                        {card.description}
                    </div>

                    <div className={'flex gap-2'}>
                        {card.tags.map((tag) => {
                            return <span className={`border px-2 py-1 rounded ${tagToColor[tag as (keyof typeof tagToColor)] ?? 'border-black'}`} key={tag}>{tag}</span>;
                        })}
                    </div>
                </div>
            })}

            <AddCard onClick={() => { setIsShowPopup(true); }} />
        </div>

        <q className={'col-span-2'}>
            Test 2 - bài 1: tạo 1 form dưới dạng modal sử dụng react portal khởi tạo nằm ngay dưới thẻ body.
            Bao gồm các fields theo Card model và hiển thị ra màn hình sau khi tạo xong.
            Sau khi đóng form và mở lên lại, không nên thấy các giá trị củ.
        </q>

        <q className={'col-span-2'}>
            Cách thức làm bài: tạo ra 1 component trong thư mục test2/test1-solution.tsx.
        </q>

        <q className={'col-span-2'}>
            Test 2 - bài 2: Triển khai tính năng xoá
        </q>

        <q className={'col-span-2'}>
            Cách thức làm bài: tạo ra 1 component trong thư mục test2/test2-solution.tsx.
        </q>

        <q className={'col-span-2'}>
            Test 2 - bài 3: Anh đang xử dụng index làm key của children khi render list các phần tử của mảng.
            Vậy thì có vấn đề gì xảy ra khi xử dụng index làm key? Hãy triển khai ví dụ cụ thể và giải thích cỡ chế hoạt động key trong react, sự liên quan giữa react key, DOM ảo, DOM thật?
        </q>

        <q className={'col-span-2'}>
            Vấn đề xảy ra khi sử dụng index làm key là khi có sự thay đổi trong danh sách (thêm, xóa, sắp xếp), React sẽ không thể xác định được phần tử nào đã thay đổi, dẫn đến việc cập nhật không chính xác và có thể gây ra lỗi trong giao diện người dùng.
        </q>

        <q className={'col-span-2'}>
            Cách thức làm bài: tạo ra 1 component trong thư mục test2/test3-solution.tsx.
        </q>
    </div>
}

function AddCard({ onClick }: { onClick: () => void }) {
    return <div className={'border border-black rounded p-4 flex flex-col gap-2 hover:bg-gray-500'} onClick={onClick}>
        <span className={'text-2xl cursor-pointer w-full h-full flex justify-center items-center'}>+</span>
    </div>
}

function Popup({
    onClose,
    onCreate,
}: {
    onClose: () => void;
    onCreate: (data: { id: number; name: string; description: string; tags: string[] }) => void;
}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onCreate({
            id: (new Date()).getTime(),
            name,
            description,
            tags
        });
        setName('');
        setDescription('');
        setTags([]);
        onClose();
    };

    return <>
            <form className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center'} onClick={onClose}>
            <div className={'bg-white p-4 rounded w-[400px] grid grid-cols-2 gap-4'} onClick={(e) => e.stopPropagation()}>
                <label htmlFor={'name'}>Name</label>
                <input className={'border border-solid'} id={'name'} name={'name'} placeholder={'Type name'} value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor={'description'}>Description</label>
                <input className={'border border-solid'} id={'description'} name={'description'} placeholder={'Type description'} value={description} onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor={'tags'}>Tags</label>
                <input className={'border border-solid'} id={'tags'} name={'tags'} placeholder={'Type tags (comma separated)'} value={tags.join(', ')} onChange={(e) => setTags(e.target.value.split(', ').map(tag => tag.trim()))} />

                <button className={'border rounded col-span-2 cursor-pointer p-2'} type="submit" onClick={handleCreate}>
                    Create
                </button>
            </div>
        </form>
    </>;
}