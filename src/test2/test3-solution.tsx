import React, { useState } from "react";

/**
 * Ví dụ: Sử dụng index làm key khi render list
 * Khi xoá/thêm phần tử, các component con có thể bị re-mount hoặc giữ state sai
 */
export function IndexKeyDemo() {
	const [items, setItems] = useState([
		{ id: 1, value: "A" },
		{ id: 2, value: "B" },
		{ id: 3, value: "C" },
	]);

	const handleRemove = (index: number) => {
		setItems((items) => items.filter((_, i) => i !== index));
	};

	return (
		<div className="space-y-4">
			<h3 className="font-bold">Demo: Sử dụng index làm key</h3>
			<ul>
				{items.map((item, index) => (
					<ListItemWithState key={index} value={item.value} onRemove={() => handleRemove(index)} />
				))}
			</ul>
		</div>
	);
}

function ListItemWithState({ value, onRemove }: { value: string; onRemove: () => void }) {
	const [text, setText] = useState("");
	return (
		<li className="flex items-center gap-2 mb-2">
			<span className="w-8 inline-block">{value}</span>
			<input
				className="border px-2 py-1 rounded"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Nhập gì đó"
			/>
			<button className="border rounded px-2" onClick={onRemove}>
				Xoá
			</button>
		</li>
	);
}

/**
 * Giải thích:
 * Khi dùng index làm key, nếu xoá phần tử ở giữa, React sẽ không thể nhận diện đúng các component con => giữ lại state cũ hoặc re-mount sai
 * React key giúp React xác định chính xác từng phần tử trong danh sách khi so sánh DOM ảo (Virtual DOM) với DOM thật => cập nhật DOM thật một cách tối ưu và đúng đắ
 */

export function IdKeyDemo() {
	const [items, setItems] = useState([
		{ id: 1, value: "A" },
		{ id: 2, value: "B" },
		{ id: 3, value: "C" },
	]);

	const handleRemove = (id: number) => {
		setItems((items) => items.filter((item) => item.id !== id));
	};

	return (
		<div className="space-y-4">
			<h3 className="font-bold">Demo: Sử dụng id làm key (chuẩn)</h3>
			<ul>
				{items.map((item) => (
					<ListItemWithState
						key={item.id}
						value={item.value}
						onRemove={() => handleRemove(item.id)}
					/>
				))}
			</ul>
			<p className="mt-2 text-sm text-gray-600">
				Khi dùng id làm key, state của các component con sẽ luôn đúng khi xoá/thêm phần tử.
			</p>
		</div>
	);
}

