import { Header } from "../shared/header.tsx";
import { CardList } from "./test1-solution.tsx";
import { IdKeyDemo, IndexKeyDemo } from "./test3-solution.tsx";

export default function Test2() {
	return (
		<div className={"w-[600px] grid grid-cols-2 gap-4 border border-gray-300 p-4 mx-auto mt-4"}>
			<Header>This is test2</Header>

			<div className={"col-span-2 grid gap-2"}>
				<CardList />
			</div>

			<q className={"col-span-2"}>
				Test 2 - bài 1: tạo 1 form dưới dạng modal sử dụng react portal khởi tạo nằm ngay dưới thẻ
				body. Bao gồm các fields theo Card model và hiển thị ra màn hình sau khi tạo xong. Sau khi
				đóng form và mở lên lại, không nên thấy các giá trị củ.
			</q>

			<q className={"col-span-2"}>
				Cách thức làm bài: tạo ra 1 component trong thư mục test2/test1-solution.tsx.
			</q>

			<q className={"col-span-2"}>Test 2 - bài 2: Triển khai tính năng xoá</q>

			<q className={"col-span-2"}>
				Cách thức làm bài: tạo ra 1 component trong thư mục test2/test2-solution.tsx.
			</q>

			<q className={"col-span-2"}>
				Test 2 - bài 3: Anh đang xử dụng index làm key của children khi render list các phần tử của
				mảng. Vậy thì có vấn đề gì xảy ra khi xử dụng index làm key? Hãy triển khai ví dụ cụ thể và
				giải thích cỡ chế hoạt động key trong react, sự liên quan giữa react key, DOM ảo, DOM thật?
			</q>

			<q className={"col-span-2"}>
				Cách thức làm bài: tạo ra 1 component trong thư mục test2/test3-solution.tsx.
			</q>
            <IndexKeyDemo />
            <IdKeyDemo />
		</div>
	);
}