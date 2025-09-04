import { useState } from "react";
import { Header } from "../shared/header.tsx";
import { createPortal } from "react-dom";

type Card = {
  id: number;
  name: string;
  description: string;
  tags: string[];
};
const data: Card[] = [
  {
    id: 1,
    name: "Top 1",
    description: "This is short",
    tags: ["red", "blue", "green", "yellow"],
  },
  {
    id: 2,
    name: "Delimiter",
    description: "Represent for minus characters",
    tags: ["red", "yellow"],
  },
  {
    id: 3,
    name: "Facilitator",
    description: "Is the person who contribute to the most of discussion",
    tags: ["blue", "red"],
  },
];

 khi dùng index làm key thì khi xóa 1 phần tử trong mảng thì các phần tử sau nó sẽ bị thay đổi vị trí, dẫn đến việc React không thể theo dõi đúng các phần tử trong danh sách


Nếu bạn nhập vào input thứ 2, sau đó xóa phần tử đầu tiên, input thứ 2 sẽ giữ lại giá trị bạn vừa nhập, nhưng thực tế nó đã trở thành input của phần tử khác. Điều này xảy ra vì React dựa vào key (ở đây là index) để xác định component nào giữ lại state.

Cơ chế hoạt động của key trong React
React key: Key giúp React xác định từng phần tử trong danh sách là duy nhất. Khi danh sách thay đổi, React dùng key để so sánh giữa Virtual DOM (DOM ảo) và DOM thật, từ đó xác định phần tử nào cần cập nhật, thêm mới, hoặc xóa.
Virtual DOM: React tạo ra một bản sao DOM (Virtual DOM) để so sánh với DOM thật. Khi có thay đổi, React sẽ tính toán sự khác biệt (diffing) dựa trên key để cập nhật DOM thật một cách tối ưu.
Liên quan giữa key, Virtual DOM và DOM thật: Nếu key không ổn định (ví dụ dùng index), React có thể nhầm lẫn giữa các phần tử, dẫn đến cập nhật sai hoặc không tối ưu.


export default function Test2SolutionBai2() {
  const [cards, setCards] = useState<Card[]>(data);
  const tagToColor = {
    red: "border-red-500",
    blue: "border-blue-500",
    green: "border-green-500",
    yellow: "border-yellow-500",
  };
  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div
      className={
        "w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-4"
      }
    >
      <Header>This is test2</Header>

      <div className={"col-span-2 grid grid-cols-2 gap-2"}>
        {cards.map((card, index) => {
          return (
            <div
              className={"border border-black rounded p-4 flex flex-col gap-2"}
              key={card.id}
            >
              <div
                className={"flex justify-between"}
                onClick={() => handleDelete(card.id)}
              >
                {card.name}
                <span
                  className={"border rounded w-8 text-center cursor-pointer"}
                >
                  -
                </span>
              </div>

              <div>{card.description}</div>

              <div className={"flex gap-2"}>
                {card.tags.map((tag) => {
                  return (
                    <span
                      className={`border px-2 py-1 rounded ${
                        tagToColor[tag as keyof typeof tagToColor] ??
                        "border-black"
                      }`}
                      key={tag}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}

        <AddCard setCards={setCards} />
      </div>

      <q className={"col-span-2"}>
        Test 2 - bài 1: tạo 1 form dưới dạng modal sử dụng react portal khởi tạo
        nằm ngay dưới thẻ body. Bao gồm các fields theo Card model và hiển thị
        ra màn hình sau khi tạo xong. Sau khi đóng form và mở lên lại, không nên
        thấy các giá trị củ.
      </q>

      <q className={"col-span-2"}>
        Cách thức làm bài: tạo ra 1 component trong thư mục
        test2/test1-solution.tsx.
      </q>

      <q className={"col-span-2"}>Test 2 - bài 2: Triển khai tính năng xoá</q>

      <q className={"col-span-2"}>
        Cách thức làm bài: tạo ra 1 component trong thư mục
        test2/test2-solution.tsx.
      </q>

      <q className={"col-span-2"}>
        Test 2 - bài 3: Anh đang xử dụng index làm key của children khi render
        list các phần tử của mảng. Vậy thì có vấn đề gì xảy ra khi xử dụng index
        làm key? Hãy triển khai ví dụ cụ thể và giải thích cỡ chế hoạt động key
        trong react, sự liên quan giữa react key, DOM ảo, DOM thật?
      </q>

      <q className={"col-span-2"}>
        Cách thức làm bài: tạo ra 1 component trong thư mục
        test2/test3-solution.tsx.
      </q>
    </div>
  );
}

function AddCard({
  setCards,
}: {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}) {
  const [isModalShow, setIsModalShow] = useState(false);
  return (
    <>
      <div
        className={
          "border border-black rounded p-4 flex flex-col gap-2 hover:bg-gray-500"
        }
        onClick={() => setIsModalShow(true)}
      >
        <span
          className={
            "text-2xl cursor-pointer w-full h-full flex justify-center items-center"
          }
        >
          +
        </span>
      </div>
      {isModalShow &&
        createPortal(
          <Modal onClose={() => setIsModalShow(false)} setCards={setCards} />,
          document.body
        )}
    </>
  );
}

function Modal({
  onClose,
  setCards,
}: {
  onClose: () => void;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}) {
  const [card, setCard] = useState<Card>({
    id: 0,
    name: "",
    description: "",
    tags: [],
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCards((prev) => [
      ...prev,
      {
        ...card,
        id: prev.length > 0 ? Math.max(...prev.map((c) => c.id)) + 1 : 1,
      },
    ]);
    onClose();
    setCard({ id: 0, name: "", description: "", tags: [] });
  }

  return (
    <div className="fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-black bg-white p-4 z-50">
      <div>I'm a modal dialog</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={card.name}
          onChange={(e) => setCard({ ...card, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={card.description}
          onChange={(e) => setCard({ ...card, description: e.target.value })}
        />
        <select
          value={card.tags[0] || ""}
          onChange={(e) => setCard({ ...card, tags: [e.target.value] })}
        >
          <option value="">Select a tag</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </select>
        <button type="submit">Add Card</button>
      </form>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

