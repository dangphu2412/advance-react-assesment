import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ButtonDelete } from "./test2-solution";

type Card = {
	id: number;
	name: string;
	description: string;
	tags: string[];
};

type ModalProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (card: Omit<Card, "id">) => void;
};

const initData: Card[] = [
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
const tagOptions = ["red", "blue", "green", "yellow"];

function Modal({ open, onClose, onSubmit }: ModalProps) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [tags, setTags] = useState<string[]>([]);

	// Reset form when modal opens
	React.useEffect(() => {
		if (open) {
			setName("");
			setDescription("");
			setTags([]);
		}
	}, [open]);

	if (!open) return null;

	return ReactDOM.createPortal(
		<div className="fixed bg-black/30 backdrop-blur-2xl inset-0 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded shadow-lg min-w-[300px] relative">
				<button className="absolute top-2 right-2 text-xl" onClick={onClose} aria-label="Close">
					×
				</button>
				<h2 className="mb-4 text-lg font-bold">Add Card</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit({ name, description, tags });
						onClose();
					}}
					className="flex flex-col gap-3"
				>
					<input
						className="border p-2 rounded"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<textarea
						className="border p-2 rounded"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
					<div>
						<label className="block mb-1">Tags:</label>
						<div className="flex gap-2 flex-wrap">
							{tagOptions.map((tag) => (
								<label key={tag} className="flex items-center gap-1">
									<input
										type="checkbox"
										checked={tags.includes(tag)}
										onChange={(e) => {
											if (e.target.checked) {
												setTags([...tags, tag]);
											} else {
												setTags(tags.filter((t) => t !== tag));
											}
										}}
									/>
									{tag}
								</label>
							))}
						</div>
					</div>
					<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
						Add
					</button>
				</form>
			</div>
		</div>,
		document.body
	);
}

export function AddCardModal({ onAdd }: { onAdd: (card: Omit<Card, "id">) => void }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div
				className="border border-black rounded p-4 flex flex-col gap-2 hover:bg-gray-500 cursor-pointer"
				onClick={() => setOpen(true)}
				data-testid="add-card-btn"
			>
				<span className="text-2xl w-full h-full flex justify-center items-center">+</span>
			</div>
			<Modal open={open} onClose={() => setOpen(false)} onSubmit={(card) => onAdd(card)} />
		</>
	);
}

export function CardList() {
	const [cards, setCards] = useState<Card[]>(initData);
	const tagToColor = {
		red: "border-red-500",
		blue: "border-blue-500",
		green: "border-green-500",
		yellow: "border-yellow-500",
	};

	const handleAdd = (card: Omit<Card, "id">) => {
		setCards((prev) => [
			...prev,
			{
				...card,
				id: prev.length ? prev[prev.length - 1].id + 1 : 1,
			},
		]);
	};

	return (
		<div className="grid grid-cols-2 gap-2">
			{cards.map((card) => (
				<div className="border border-black rounded p-4 flex flex-col gap-2" key={card.id}>
					<div className="flex justify-between">
						{card.name}
						<ButtonDelete
							onDelete={() => setCards((prev) => prev.filter((c) => c.id !== card.id))}
						/>
					</div>
					<div>{card.description}</div>
					<div className="flex gap-2">
						{card.tags.map((tag) => (
							<span
								className={`border px-2 py-1 rounded ${
									tagToColor[tag as keyof typeof tagToColor] ?? "border-black"
								}`}
								key={tag}
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			))}
			<AddCardModal onAdd={handleAdd} />
		</div>
	);
}
