import {useState} from "react";
import {Header} from "../shared/header.tsx";
import { AddCardModal } from "./test1-solution.tsx";

export type Card = {
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

export default function Test2Solution() {
    const [cards, setCards] = useState<Card[]>(data);
    const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
    const tagToColor = {
        'red': 'border-red-500',
        'blue': 'border-blue-500',
        'green': 'border-green-500',
        'yellow': 'border-yellow-500',
    }

    return <div className={'w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-4'}>
        <Header>
            This is test2
        </Header>

        <div className={'col-span-2 grid grid-cols-2 gap-2'}>
            {cards.map((card, index) => {
                return <div className={'border border-black rounded p-4 flex flex-col gap-2'} key={index}>
                    <div className={'flex justify-between'}>
                        {card.name}
                        <span onClick={() => setCards(cards.filter((c) => c.id !== card.id))} className={'border rounded w-8 text-center cursor-pointer'}>
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

            <AddCard isAddCardModalOpen={isAddCardModalOpen} setCards={setCards} cards={cards} setIsAddCardModalOpen={setIsAddCardModalOpen} />
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
            Cách thức làm bài: tạo ra 1 component trong thư mục test2/test3-solution.tsx.
        </q>
    </div>
}

function AddCard({ isAddCardModalOpen, setCards, cards, setIsAddCardModalOpen }: { isAddCardModalOpen: boolean, setCards: (cards: Card[]) => void, cards: Card[], setIsAddCardModalOpen: (isAddCardModalOpen: boolean) => void }) {
    return <>
    <div onClick={() => setIsAddCardModalOpen(true)} className={'border border-black rounded p-4 flex flex-col gap-2 hover:bg-gray-500'}>
        <span className={'text-2xl cursor-pointer w-full h-full flex justify-center items-center'}>+</span>
    </div>
    {isAddCardModalOpen && <AddCardModal setCards={setCards} cards={cards} setIsAddCardModalOpen={setIsAddCardModalOpen} />}
    </>
}
