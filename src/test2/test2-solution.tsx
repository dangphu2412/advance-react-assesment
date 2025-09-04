export const ButtonDelete = ({ onDelete }: { onDelete: () => void }) => {
	return (
		<button onClick={onDelete} className={"border rounded w-8 text-center cursor-pointer"}>
			-
		</button>
	);
};
